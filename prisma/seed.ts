import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { lifecyclePhases } from "../src/data/lifecycle";
import { contentItems } from "../src/data/content";
import { labelToDbType, domainFromUrl } from "../src/server/serialize";

const prisma = new PrismaClient();

// The existing static items have no external URL yet. Seed a functional
// placeholder (a search for the title) so every link works; replace real
// destinations later via the /admin UI.
function placeholderUrl(title: string) {
  return `https://www.google.com/search?q=${encodeURIComponent(title)}`;
}

async function main() {
  console.log("Seeding phases & sub-phases...");
  for (const [phaseIndex, phase] of lifecyclePhases.entries()) {
    await prisma.phase.upsert({
      where: { id: phase.id },
      update: {
        number: phase.number,
        title: phase.title,
        shortTitle: phase.shortTitle,
        eyebrow: phase.eyebrow,
        goal: phase.goal,
        description: phase.description,
        outcome: phase.outcome,
        accent: phase.accent,
        position: phaseIndex,
      },
      create: {
        id: phase.id,
        number: phase.number,
        title: phase.title,
        shortTitle: phase.shortTitle,
        eyebrow: phase.eyebrow,
        goal: phase.goal,
        description: phase.description,
        outcome: phase.outcome,
        accent: phase.accent,
        position: phaseIndex,
      },
    });

    for (const [subIndex, sub] of phase.subPhases.entries()) {
      await prisma.subPhase.upsert({
        where: { id: sub.id },
        update: {
          phaseId: phase.id,
          title: sub.title,
          description: sub.description,
          topics: sub.topics ?? [],
          position: subIndex,
        },
        create: {
          id: sub.id,
          phaseId: phase.id,
          title: sub.title,
          description: sub.description,
          topics: sub.topics ?? [],
          position: subIndex,
        },
      });
    }
  }

  console.log(`Seeding ${contentItems.length} resources...`);
  for (const item of contentItems) {
    const subPhaseIds = Array.from(
      new Set(item.classifications.flatMap((c) => c.subPhases)),
    );
    const url = placeholderUrl(item.title);

    await prisma.resource.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        description: item.description,
        type: labelToDbType[item.type],
        difficulty: item.difficulty,
        estimatedMinutes: item.estimatedMinutes,
        featured: item.featured ?? false,
        tags: item.tags,
        primaryPhaseId: item.primaryPhase,
        subPhases: { set: subPhaseIds.map((id) => ({ id })) },
      },
      create: {
        slug: item.slug,
        title: item.title,
        description: item.description,
        url,
        sourceDomain: domainFromUrl(url),
        type: labelToDbType[item.type],
        difficulty: item.difficulty,
        estimatedMinutes: item.estimatedMinutes,
        featured: item.featured ?? false,
        tags: item.tags,
        status: "published",
        primaryPhaseId: item.primaryPhase,
        subPhases: { connect: subPhaseIds.map((id) => ({ id })) },
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
