import type { ContentType as DbContentType, Difficulty, Prisma } from "@prisma/client";

// The DB enum can't contain spaces, so map to/from the display labels the UI uses.
export const dbTypeToLabel: Record<DbContentType, string> = {
  Article: "Article",
  Guide: "Guide",
  Checklist: "Checklist",
  Template: "Template",
  Framework: "Framework",
  CaseStudy: "Case Study",
  Course: "Course",
  Video: "Video",
  Resource: "Resource",
  ToolCollection: "Tool Collection",
};

export const labelToDbType: Record<string, DbContentType> = Object.fromEntries(
  Object.entries(dbTypeToLabel).map(([db, label]) => [label, db as DbContentType]),
) as Record<string, DbContentType>;

export const difficulties: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];

// A resource with the relations we serialize.
export type ResourceWithRelations = Prisma.ResourceGetPayload<{
  include: { subPhases: true };
}>;

// Shape a DB resource into the `ContentItem` the frontend already understands,
// plus the external `url` the link directory needs.
export function serializeResource(resource: ResourceWithRelations) {
  // Group connected sub-phases back into per-phase classifications.
  const byPhase = new Map<string, string[]>();
  for (const sub of resource.subPhases) {
    const list = byPhase.get(sub.phaseId) ?? [];
    list.push(sub.id);
    byPhase.set(sub.phaseId, list);
  }

  return {
    id: resource.id,
    slug: resource.slug,
    title: resource.title,
    description: resource.description,
    url: resource.url,
    sourceDomain: resource.sourceDomain,
    type: dbTypeToLabel[resource.type],
    primaryPhase: resource.primaryPhaseId,
    classifications: Array.from(byPhase.entries()).map(([phase, subPhases]) => ({
      phase,
      subPhases,
    })),
    difficulty: resource.difficulty,
    estimatedMinutes: resource.estimatedMinutes,
    tags: resource.tags,
    featured: resource.featured,
    status: resource.status,
  };
}

export function domainFromUrl(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}
