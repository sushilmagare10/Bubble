/*
  Warnings:

  - You are about to drop the column `description` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `desc` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "description",
ADD COLUMN     "desc" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "img" TEXT;
