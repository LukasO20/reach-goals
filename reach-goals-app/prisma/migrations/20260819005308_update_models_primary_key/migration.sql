/*
  Warnings:

  - The primary key for the `Assignment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DemoVisitor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DemoVisitorSession` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DemoVisitorVerification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Goal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TagOnAssignment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TagOnGoal` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_goalID_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_visitorId_fkey";

-- DropForeignKey
ALTER TABLE "DemoVisitorSession" DROP CONSTRAINT "DemoVisitorSession_demoVisitorId_fkey";

-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_visitorId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_visitorId_fkey";

-- DropForeignKey
ALTER TABLE "TagOnAssignment" DROP CONSTRAINT "TagOnAssignment_assignmentID_fkey";

-- DropForeignKey
ALTER TABLE "TagOnAssignment" DROP CONSTRAINT "TagOnAssignment_tagID_fkey";

-- DropForeignKey
ALTER TABLE "TagOnGoal" DROP CONSTRAINT "TagOnGoal_goalID_fkey";

-- DropForeignKey
ALTER TABLE "TagOnGoal" DROP CONSTRAINT "TagOnGoal_tagID_fkey";

-- AlterTable
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "goalID" SET DATA TYPE TEXT,
ALTER COLUMN "visitorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Assignment_id_seq";

-- AlterTable
ALTER TABLE "DemoVisitor" DROP CONSTRAINT "DemoVisitor_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "DemoVisitor_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DemoVisitor_id_seq";

-- AlterTable
ALTER TABLE "DemoVisitorSession" DROP CONSTRAINT "DemoVisitorSession_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "demoVisitorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "DemoVisitorSession_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DemoVisitorSession_id_seq";

-- AlterTable
ALTER TABLE "DemoVisitorVerification" DROP CONSTRAINT "DemoVisitorVerification_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "DemoVisitorVerification_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DemoVisitorVerification_id_seq";

-- AlterTable
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "visitorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Goal_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Goal_id_seq";

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "visitorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Tag_id_seq";

-- AlterTable
ALTER TABLE "TagOnAssignment" DROP CONSTRAINT "TagOnAssignment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "assignmentID" SET DATA TYPE TEXT,
ALTER COLUMN "tagID" SET DATA TYPE TEXT,
ADD CONSTRAINT "TagOnAssignment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TagOnAssignment_id_seq";

-- AlterTable
ALTER TABLE "TagOnGoal" DROP CONSTRAINT "TagOnGoal_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "goalID" SET DATA TYPE TEXT,
ALTER COLUMN "tagID" SET DATA TYPE TEXT,
ADD CONSTRAINT "TagOnGoal_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TagOnGoal_id_seq";

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "DemoVisitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "DemoVisitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_goalID_fkey" FOREIGN KEY ("goalID") REFERENCES "Goal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "DemoVisitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnGoal" ADD CONSTRAINT "TagOnGoal_goalID_fkey" FOREIGN KEY ("goalID") REFERENCES "Goal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnGoal" ADD CONSTRAINT "TagOnGoal_tagID_fkey" FOREIGN KEY ("tagID") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnAssignment" ADD CONSTRAINT "TagOnAssignment_assignmentID_fkey" FOREIGN KEY ("assignmentID") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnAssignment" ADD CONSTRAINT "TagOnAssignment_tagID_fkey" FOREIGN KEY ("tagID") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DemoVisitorSession" ADD CONSTRAINT "DemoVisitorSession_demoVisitorId_fkey" FOREIGN KEY ("demoVisitorId") REFERENCES "DemoVisitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
