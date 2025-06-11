/*
  Warnings:

  - You are about to drop the column `watered` on the `Reminder` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ReminderType" AS ENUM ('WATERING', 'FERTILIZING', 'REPOTTING');

-- AlterTable
ALTER TABLE "Reminder" DROP COLUMN "watered",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" "ReminderType" NOT NULL DEFAULT 'WATERING';
