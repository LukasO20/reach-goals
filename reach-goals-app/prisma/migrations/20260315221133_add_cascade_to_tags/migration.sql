-- DropForeignKey
ALTER TABLE "TagOnAssignment" DROP CONSTRAINT "TagOnAssignment_tagID_fkey";

-- DropForeignKey
ALTER TABLE "TagOnGoal" DROP CONSTRAINT "TagOnGoal_tagID_fkey";

-- AddForeignKey
ALTER TABLE "TagOnGoal" ADD CONSTRAINT "TagOnGoal_tagID_fkey" FOREIGN KEY ("tagID") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnAssignment" ADD CONSTRAINT "TagOnAssignment_tagID_fkey" FOREIGN KEY ("tagID") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
