/*
  Warnings:

  - Added the required column `metaID` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "end" TIMESTAMP(3),
ADD COLUMN     "metaID" INTEGER NOT NULL,
ADD COLUMN     "remember" TIMESTAMP(3),
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "Meta" ADD COLUMN     "end" TIMESTAMP(3),
ADD COLUMN     "remember" TIMESTAMP(3),
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" TEXT;

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "color" TEXT,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagOnMeta" (
    "id" SERIAL NOT NULL,
    "metaID" INTEGER NOT NULL,
    "tagID" INTEGER NOT NULL,

    CONSTRAINT "TagOnMeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagOnAssignment" (
    "id" SERIAL NOT NULL,
    "assignmentID" INTEGER NOT NULL,
    "tagID" INTEGER NOT NULL,

    CONSTRAINT "TagOnAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TagOnMeta_metaID_tagID_key" ON "TagOnMeta"("metaID", "tagID");

-- CreateIndex
CREATE UNIQUE INDEX "TagOnAssignment_assignmentID_tagID_key" ON "TagOnAssignment"("assignmentID", "tagID");

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_metaID_fkey" FOREIGN KEY ("metaID") REFERENCES "Meta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnMeta" ADD CONSTRAINT "TagOnMeta_metaID_fkey" FOREIGN KEY ("metaID") REFERENCES "Meta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnMeta" ADD CONSTRAINT "TagOnMeta_tagID_fkey" FOREIGN KEY ("tagID") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnAssignment" ADD CONSTRAINT "TagOnAssignment_assignmentID_fkey" FOREIGN KEY ("assignmentID") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnAssignment" ADD CONSTRAINT "TagOnAssignment_tagID_fkey" FOREIGN KEY ("tagID") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
