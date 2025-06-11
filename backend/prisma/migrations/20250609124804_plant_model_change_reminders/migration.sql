-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "fertilizingInterval" INTEGER NOT NULL DEFAULT 30,
ADD COLUMN     "repottingInterval" INTEGER NOT NULL DEFAULT 365,
ADD COLUMN     "wateringInterval" INTEGER NOT NULL DEFAULT 7;
