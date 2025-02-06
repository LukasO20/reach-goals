/*
  Warnings:

  - You are about to drop the column `metaID` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the `Meta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagOnMeta` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_metaID_fkey";

-- DropForeignKey
ALTER TABLE "TagOnMeta" DROP CONSTRAINT "TagOnMeta_metaID_fkey";

-- DropForeignKey
ALTER TABLE "TagOnMeta" DROP CONSTRAINT "TagOnMeta_tagID_fkey";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "metaID",
ADD COLUMN     "goalID" INTEGER;

-- DropTable
DROP TABLE "Meta";

-- DropTable
DROP TABLE "TagOnMeta";

-- CreateTable
CREATE TABLE "Goal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end" TIMESTAMP(3),
    "remember" TIMESTAMP(3),
    "status" TEXT,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagOnGoal" (
    "id" SERIAL NOT NULL,
    "goalID" INTEGER NOT NULL,
    "tagID" INTEGER NOT NULL,

    CONSTRAINT "TagOnGoal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TagOnGoal_goalID_tagID_key" ON "TagOnGoal"("goalID", "tagID");

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_goalID_fkey" FOREIGN KEY ("goalID") REFERENCES "Goal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnGoal" ADD CONSTRAINT "TagOnGoal_goalID_fkey" FOREIGN KEY ("goalID") REFERENCES "Goal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnGoal" ADD CONSTRAINT "TagOnGoal_tagID_fkey" FOREIGN KEY ("tagID") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
