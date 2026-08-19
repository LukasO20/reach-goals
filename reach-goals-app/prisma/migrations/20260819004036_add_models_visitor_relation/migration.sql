/*
  Warnings:

  - Added the required column `visitorId` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visitorId` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visitorId` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "visitorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "visitorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "visitorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "DemoVisitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "DemoVisitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "DemoVisitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
