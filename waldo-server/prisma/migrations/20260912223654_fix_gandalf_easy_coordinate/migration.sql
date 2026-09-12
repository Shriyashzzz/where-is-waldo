/*
  Warnings:

  - A unique constraint covering the columns `[level]` on the table `Game` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Game_level_key" ON "Game"("level");
