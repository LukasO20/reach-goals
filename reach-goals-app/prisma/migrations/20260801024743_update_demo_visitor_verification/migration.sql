/*
  Warnings:

  - The primary key for the `DemoVisitorVerification` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "DemoVisitorVerification" DROP CONSTRAINT "DemoVisitorVerification_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "DemoVisitorVerification_pkey" PRIMARY KEY ("id");
