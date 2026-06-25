import { Router } from "express";
import { createHash } from "node:crypto";
import { prisma } from "./db";

export const redirectRouter = Router();

function hashIp(ip: string | undefined) {
  if (!ip) return null;
  // Hash so we can count uniques without storing raw IPs.
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

// /r/:slug — record an outbound click, then 302 to the external URL.
redirectRouter.get("/:slug", async (req, res) => {
  const resource = await prisma.resource.findUnique({
    where: { slug: req.params.slug },
    select: { id: true, url: true, status: true },
  });

  if (!resource || resource.status !== "published") {
    return res.redirect(302, "/resources");
  }

  // Fire-and-forget: never block the redirect on the analytics write.
  prisma.click
    .create({
      data: {
        resourceId: resource.id,
        referrer: req.header("referer") ?? null,
        ipHash: hashIp(req.ip),
      },
    })
    .catch((err) => console.error("click log failed", err));

  res.redirect(302, resource.url);
});
