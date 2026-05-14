/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Person" ADD COLUMN "fatherId" INTEGER;
ALTER TABLE "Person" ADD COLUMN "motherId" INTEGER;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;
