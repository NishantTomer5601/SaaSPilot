import { Router, type Request, type Response, type NextFunction } from "express";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { prisma } from "./db";
import {
  serializeResource,
  labelToDbType,
  dbTypeToLabel,
  domainFromUrl,
} from "./serialize";

export const apiRouter = Router();
apiRouter.use((_, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// ---- Public read endpoints -------------------------------------------------

apiRouter.get("/phases", async (_req, res) => {
  const phases = await prisma.phase.findMany({
    orderBy: { position: "asc" },
    include: { subPhases: { orderBy: { position: "asc" } } },
  });
  res.json(phases);
});

apiRouter.get("/resources", async (_req, res) => {
  const resources = await prisma.resource.findMany({
    where: { status: "published" },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    include: { subPhases: true },
  });
  res.json(resources.map(serializeResource));
});

apiRouter.get("/resources/:slug", async (req, res) => {
  const resource = await prisma.resource.findUnique({
    where: { slug: req.params.slug },
    include: { subPhases: true },
  });
  if (!resource || resource.status !== "published") {
    return res.status(404).json({ error: "Not found" });
  }
  res.json(serializeResource(resource));
});

// Supporting data for the admin form (types, difficulties, phases).
apiRouter.get("/meta", async (_req, res) => {
  const phases = await prisma.phase.findMany({
    orderBy: { position: "asc" },
    include: { subPhases: { orderBy: { position: "asc" } } },
  });
  res.json({
    types: Object.values(dbTypeToLabel),
    difficulties: ["Beginner", "Intermediate", "Advanced"],
    phases,
  });
});

// ---- Admin (token-protected) ----------------------------------------------

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return res.status(500).json({ error: "ADMIN_TOKEN not configured" });
  const header = req.header("authorization") ?? "";
  const provided = header.replace(/^Bearer\s+/i, "");
  if (provided !== token) return res.status(401).json({ error: "Unauthorized" });
  next();
}

const resourceInput = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  url: z.string().url(),
  type: z.string().refine((t) => t in labelToDbType, "Invalid type"),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  estimatedMinutes: z.coerce.number().int().min(1).max(600).default(10),
  featured: z.boolean().default(false),
  status: z.enum(["draft", "published"]).default("published"),
  tags: z.array(z.string()).default([]),
  primaryPhaseId: z.string().min(1),
  subPhaseIds: z.array(z.string()).default([]),
  slug: z.string().optional(),
});

// Verify a check token is valid (used by the admin UI to gate access).
apiRouter.get("/admin/check", requireAdmin, (_req, res) => res.json({ ok: true }));

apiRouter.get("/admin/resources", requireAdmin, async (_req, res) => {
  const resources = await prisma.resource.findMany({
    orderBy: { updatedAt: "desc" },
    include: { subPhases: true, _count: { select: { clicks: true } } },
  });
  res.json(
    resources.map((r) => ({ ...serializeResource(r), clicks: r._count.clicks })),
  );
});

apiRouter.post("/admin/resources", requireAdmin, async (req, res) => {
  const parsed = resourceInput.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const data = parsed.data;
  const slug = (data.slug && slugify(data.slug)) || slugify(data.title);

  try {
    const created = await prisma.resource.create({
      data: {
        slug,
        title: data.title,
        description: data.description,
        url: data.url,
        sourceDomain: domainFromUrl(data.url),
        type: labelToDbType[data.type],
        difficulty: data.difficulty,
        estimatedMinutes: data.estimatedMinutes,
        featured: data.featured,
        status: data.status,
        tags: data.tags,
        primaryPhaseId: data.primaryPhaseId,
        subPhases: { connect: data.subPhaseIds.map((id) => ({ id })) },
      },
      include: { subPhases: true },
    });
    res.status(201).json(serializeResource(created));
  } catch (err: unknown) {
    const e = err as { code?: string };
    if (e.code === "P2002") return res.status(409).json({ error: "Slug already exists" });
    if (e.code === "P2025" || e.code === "P2003")
      return res.status(400).json({ error: "Unknown phase or sub-phase id" });
    console.error(err);
    res.status(500).json({ error: "Failed to create resource" });
  }
});

apiRouter.patch("/admin/resources/:id", requireAdmin, async (req, res) => {
  const parsed = resourceInput.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const d = parsed.data;
  const data: Prisma.ResourceUpdateInput = {};
  if (d.title !== undefined) data.title = d.title;
  if (d.description !== undefined) data.description = d.description;
  if (d.url !== undefined) {
    data.url = d.url;
    data.sourceDomain = domainFromUrl(d.url);
  }
  if (d.type !== undefined) data.type = labelToDbType[d.type];
  if (d.difficulty !== undefined) data.difficulty = d.difficulty;
  if (d.estimatedMinutes !== undefined) data.estimatedMinutes = d.estimatedMinutes;
  if (d.featured !== undefined) data.featured = d.featured;
  if (d.status !== undefined) data.status = d.status;
  if (d.tags !== undefined) data.tags = d.tags;
  if (d.primaryPhaseId !== undefined) {
    data.primaryPhase = { connect: { id: d.primaryPhaseId } };
  }
  if (d.subPhaseIds !== undefined) {
    data.subPhases = { set: d.subPhaseIds.map((id) => ({ id })) };
  }
  try {
    const updated = await prisma.resource.update({
      where: { id: String(req.params.id) },
      data,
      include: { subPhases: true },
    });
    res.json(serializeResource(updated));
  } catch (err: unknown) {
    const e = err as { code?: string };
    if (e.code === "P2025") return res.status(404).json({ error: "Resource not found" });
    console.error(err);
    res.status(500).json({ error: "Failed to update resource" });
  }
});

apiRouter.delete("/admin/resources/:id", requireAdmin, async (req, res) => {
  try {
    await prisma.resource.delete({ where: { id: String(req.params.id) } });
    res.status(204).end();
  } catch {
    res.status(404).json({ error: "Resource not found" });
  }
});
