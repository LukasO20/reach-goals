-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_metaID_fkey";

-- AlterTable
ALTER TABLE "Assignment" ALTER COLUMN "metaID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_metaID_fkey" FOREIGN KEY ("metaID") REFERENCES "Meta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
