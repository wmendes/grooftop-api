-- AlterTable
ALTER TABLE "Rooftop" ADD COLUMN     "cancellationPolicyId" TEXT;

-- CreateTable
CREATE TABLE "RooftopActivity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RooftopActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RentalType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessibilityInfra" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccessibilityInfra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RooftopFeature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RooftopFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RooftopFacility" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RooftopFacility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RooftopViewType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RooftopViewType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RooftopGuideline" (
    "id" TEXT NOT NULL,
    "guideline" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RooftopGuideline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CancellationPolicy" (
    "id" TEXT NOT NULL,
    "policyName" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CancellationPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RooftopToActivity" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RooftopToFeature" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RooftopToFacility" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RooftopToViewType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RooftopToGuideline" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RooftopToRentalType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RooftopToAccessibility" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RooftopToActivity_AB_unique" ON "_RooftopToActivity"("A", "B");

-- CreateIndex
CREATE INDEX "_RooftopToActivity_B_index" ON "_RooftopToActivity"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RooftopToFeature_AB_unique" ON "_RooftopToFeature"("A", "B");

-- CreateIndex
CREATE INDEX "_RooftopToFeature_B_index" ON "_RooftopToFeature"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RooftopToFacility_AB_unique" ON "_RooftopToFacility"("A", "B");

-- CreateIndex
CREATE INDEX "_RooftopToFacility_B_index" ON "_RooftopToFacility"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RooftopToViewType_AB_unique" ON "_RooftopToViewType"("A", "B");

-- CreateIndex
CREATE INDEX "_RooftopToViewType_B_index" ON "_RooftopToViewType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RooftopToGuideline_AB_unique" ON "_RooftopToGuideline"("A", "B");

-- CreateIndex
CREATE INDEX "_RooftopToGuideline_B_index" ON "_RooftopToGuideline"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RooftopToRentalType_AB_unique" ON "_RooftopToRentalType"("A", "B");

-- CreateIndex
CREATE INDEX "_RooftopToRentalType_B_index" ON "_RooftopToRentalType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RooftopToAccessibility_AB_unique" ON "_RooftopToAccessibility"("A", "B");

-- CreateIndex
CREATE INDEX "_RooftopToAccessibility_B_index" ON "_RooftopToAccessibility"("B");

-- AddForeignKey
ALTER TABLE "Rooftop" ADD CONSTRAINT "Rooftop_cancellationPolicyId_fkey" FOREIGN KEY ("cancellationPolicyId") REFERENCES "CancellationPolicy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RooftopToActivity" ADD CONSTRAINT "_RooftopToActivity_A_fkey" FOREIGN KEY ("A") REFERENCES "Rooftop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RooftopToActivity" ADD CONSTRAINT "_RooftopToActivity_B_fkey" FOREIGN KEY ("B") REFERENCES "RooftopActivity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RooftopToFeature" ADD CONSTRAINT "_RooftopToFeature_A_fkey" FOREIGN KEY ("A") REFERENCES "Rooftop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RooftopToFeature" ADD CONSTRAINT "_RooftopToFeature_B_fkey" FOREIGN KEY ("B") REFERENCES "RooftopFeature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RooftopToFacility" ADD CONSTRAINT "_RooftopToFacility_A_fkey" FOREIGN KEY ("A") REFERENCES "Rooftop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RooftopToFacility" ADD CONSTRAINT "_RooftopToFacility_B_fkey" FOREIGN KEY ("B") REFERENCES "RooftopFacility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RooftopToViewType" ADD CONSTRAINT "_RooftopToViewType_A_fkey" FOREIGN KEY ("A") REFERENCES "Rooftop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RooftopToViewType" ADD CONSTRAINT "_RooftopToViewType_B_fkey" FOREIGN KEY ("B") REFERENCES "RooftopViewType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RooftopToGuideline" ADD CONSTRAINT "_RooftopToGuideline_A_fkey" FOREIGN KEY ("A") REFERENCES "Rooftop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RooftopToGuideline" ADD CONSTRAINT "_RooftopToGuideline_B_fkey" FOREIGN KEY ("B") REFERENCES "RooftopGuideline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RooftopToRentalType" ADD CONSTRAINT "_RooftopToRentalType_A_fkey" FOREIGN KEY ("A") REFERENCES "RentalType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RooftopToRentalType" ADD CONSTRAINT "_RooftopToRentalType_B_fkey" FOREIGN KEY ("B") REFERENCES "Rooftop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RooftopToAccessibility" ADD CONSTRAINT "_RooftopToAccessibility_A_fkey" FOREIGN KEY ("A") REFERENCES "AccessibilityInfra"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RooftopToAccessibility" ADD CONSTRAINT "_RooftopToAccessibility_B_fkey" FOREIGN KEY ("B") REFERENCES "Rooftop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
