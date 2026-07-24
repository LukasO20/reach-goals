/*
  Warnings:

  - You are about to drop the column `remember` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `remember` on the `Goal` table. All the data in the column will be lost.
  - Made the column `name` on table `Tag` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `Tag` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "DemoVisitorSessionStatus" AS ENUM ('ACTIVE', 'EXPIRED');

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "remember";

-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "remember";

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "color" SET NOT NULL;

-- CreateTable
CREATE TABLE "DemoVisitor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DemoVisitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DemoVisitorSession" (
    "id" SERIAL NOT NULL,
    "demoVisitorId" INTEGER NOT NULL,
    "status" "DemoVisitorSessionStatus" NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DemoVisitorSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DemoVisitor_email_key" ON "DemoVisitor"("email");

-- AddForeignKey
ALTER TABLE "DemoVisitorSession" ADD CONSTRAINT "DemoVisitorSession_demoVisitorId_fkey" FOREIGN KEY ("demoVisitorId") REFERENCES "DemoVisitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
