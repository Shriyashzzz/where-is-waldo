/*
  Warnings:

  - Added the required column `level` to the `LeaderBoard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `LeaderBoard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LeaderBoard" ADD COLUMN     "level" "Level" NOT NULL,
ADD COLUMN     "time" DOUBLE PRECISION NOT NULL;
