-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "lecturer" DROP NOT NULL,
ALTER COLUMN "credits" DROP NOT NULL,
ALTER COLUMN "course_fee" DROP NOT NULL;
