/*
  Warnings:

  - You are about to drop the column `course_fee` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `courses` table. All the data in the column will be lost.
  - The `credits` column on the `courses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `creator_id` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_creatorId_fkey";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "course_fee",
DROP COLUMN "creatorId",
ADD COLUMN     "fee" INTEGER,
ADD COLUMN     "creator_id" INTEGER NOT NULL,
DROP COLUMN "credits",
ADD COLUMN     "credits" INTEGER;

-- AddForeignKey
ALTER TABLE "courses" ADD FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
