-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('Article', 'Guide', 'Checklist', 'Template', 'Framework', 'CaseStudy', 'Course', 'Video', 'Resource', 'ToolCollection');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('Beginner', 'Intermediate', 'Advanced');

-- CreateEnum
CREATE TYPE "ResourceStatus" AS ENUM ('draft', 'published');

-- CreateTable
CREATE TABLE "phases" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortTitle" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "accent" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "phases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_phases" (
    "id" TEXT NOT NULL,
    "phaseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "topics" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "position" INTEGER NOT NULL,

    CONSTRAINT "sub_phases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sourceDomain" TEXT,
    "type" "ContentType" NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "estimatedMinutes" INTEGER NOT NULL DEFAULT 10,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "ResourceStatus" NOT NULL DEFAULT 'published',
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "primaryPhaseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_clicks" (
    "id" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "referrer" TEXT,
    "ipHash" TEXT,
    "country" TEXT,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resource_clicks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ResourceSubPhases" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ResourceSubPhases_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "sub_phases_phaseId_idx" ON "sub_phases"("phaseId");

-- CreateIndex
CREATE UNIQUE INDEX "resources_slug_key" ON "resources"("slug");

-- CreateIndex
CREATE INDEX "resources_primaryPhaseId_idx" ON "resources"("primaryPhaseId");

-- CreateIndex
CREATE INDEX "resources_status_idx" ON "resources"("status");

-- CreateIndex
CREATE INDEX "resource_clicks_resourceId_idx" ON "resource_clicks"("resourceId");

-- CreateIndex
CREATE INDEX "_ResourceSubPhases_B_index" ON "_ResourceSubPhases"("B");

-- AddForeignKey
ALTER TABLE "sub_phases" ADD CONSTRAINT "sub_phases_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "phases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resources" ADD CONSTRAINT "resources_primaryPhaseId_fkey" FOREIGN KEY ("primaryPhaseId") REFERENCES "phases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_clicks" ADD CONSTRAINT "resource_clicks_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResourceSubPhases" ADD CONSTRAINT "_ResourceSubPhases_A_fkey" FOREIGN KEY ("A") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResourceSubPhases" ADD CONSTRAINT "_ResourceSubPhases_B_fkey" FOREIGN KEY ("B") REFERENCES "sub_phases"("id") ON DELETE CASCADE ON UPDATE CASCADE;
