/*
  Warnings:

  - Added the required column `valueField` to the `RentalType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `RooftopFeature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueField` to the `RooftopFeature` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RentalType" ADD COLUMN     "valueField" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Rooftop" ADD COLUMN     "privacyPolicyId" TEXT;

-- AlterTable
ALTER TABLE "RooftopFeature" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "valueField" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "PrivacyPolicy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrivacyPolicy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rooftop" ADD CONSTRAINT "Rooftop_privacyPolicyId_fkey" FOREIGN KEY ("privacyPolicyId") REFERENCES "PrivacyPolicy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
