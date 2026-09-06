/*
  Warnings:

  - The values [Cat,StickWaldo] on the enum `Character` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Character_new" AS ENUM ('YellowWaldo', 'Dog', 'GirlWaldo', 'Waldo', 'GandalfWaldo');
ALTER TABLE "CharacterCoordinate" ALTER COLUMN "character" TYPE "Character_new" USING ("character"::text::"Character_new");
ALTER TYPE "Character" RENAME TO "Character_old";
ALTER TYPE "Character_new" RENAME TO "Character";
DROP TYPE "public"."Character_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "CharacterCoordinate" DROP CONSTRAINT "CharacterCoordinate_gameId_fkey";

-- DropForeignKey
ALTER TABLE "LeaderBoard" DROP CONSTRAINT "LeaderBoard_gameId_fkey";

-- DropForeignKey
ALTER TABLE "LeaderBoard" DROP CONSTRAINT "LeaderBoard_userId_fkey";

-- AddForeignKey
ALTER TABLE "CharacterCoordinate" ADD CONSTRAINT "CharacterCoordinate_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderBoard" ADD CONSTRAINT "LeaderBoard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderBoard" ADD CONSTRAINT "LeaderBoard_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
