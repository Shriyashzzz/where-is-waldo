-- CreateEnum
CREATE TYPE "Level" AS ENUM ('Easy', 'Medium', 'Hard', 'God');

-- CreateEnum
CREATE TYPE "Character" AS ENUM ('YellowWaldo', 'Cat', 'GirlWaldo', 'StickWaldo', 'GandalfWaldo');

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "level" "Level" NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterCoordinate" (
    "id" SERIAL NOT NULL,
    "character" "Character" NOT NULL,
    "gameId" INTEGER NOT NULL,
    "xCord" DOUBLE PRECISION NOT NULL,
    "yCord" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CharacterCoordinate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT DEFAULT 'Anonymous',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaderBoard" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "LeaderBoard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CharacterCoordinate_gameId_character_key" ON "CharacterCoordinate"("gameId", "character");

-- AddForeignKey
ALTER TABLE "CharacterCoordinate" ADD CONSTRAINT "CharacterCoordinate_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderBoard" ADD CONSTRAINT "LeaderBoard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderBoard" ADD CONSTRAINT "LeaderBoard_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
