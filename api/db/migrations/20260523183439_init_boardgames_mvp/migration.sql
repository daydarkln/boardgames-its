-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "GameCategory" AS ENUM ('BOARD_GAMES', 'TTRPG', 'MAFIA');

-- CreateEnum
CREATE TYPE "GameSessionStatus" AS ENUM ('DRAFT', 'OPEN', 'FULL', 'CANCELLED', 'COMPLETED', 'HIDDEN');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('PENDING', 'APPROVED', 'DECLINED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('BEGINNER', 'CASUAL', 'EXPERIENCED', 'EXPERT', 'ANY');

-- CreateEnum
CREATE TYPE "PlayerPostStatus" AS ENUM ('OPEN', 'CLOSED', 'HIDDEN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" TIMESTAMP(3),
    "name" TEXT,
    "avatarUrl" TEXT,
    "city" TEXT NOT NULL DEFAULT 'Москва',
    "district" TEXT,
    "bio" TEXT,
    "favoriteDirections" "GameCategory"[],
    "favoriteGamesText" TEXT,
    "experienceLevel" "ExperienceLevel" NOT NULL DEFAULT 'ANY',
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venue" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "detailedDescription" TEXT,
    "address" TEXT NOT NULL,
    "district" TEXT,
    "city" TEXT NOT NULL DEFAULT 'Москва',
    "websiteUrl" TEXT,
    "phone" TEXT,
    "imageUrl" TEXT,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "amenities" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameSession" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "GameCategory" NOT NULL,
    "gameSystem" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT,
    "maxPlayers" INTEGER NOT NULL,
    "minPlayers" INTEGER NOT NULL DEFAULT 1,
    "status" "GameSessionStatus" NOT NULL DEFAULT 'OPEN',
    "experienceLevel" "ExperienceLevel" NOT NULL DEFAULT 'ANY',
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "requiresApproval" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organizerId" INTEGER NOT NULL,
    "venueId" INTEGER,

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameRegistration" (
    "id" SERIAL NOT NULL,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'APPROVED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "gameSessionId" INTEGER NOT NULL,

    CONSTRAINT "GameRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerPost" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "GameCategory" NOT NULL,
    "city" TEXT NOT NULL DEFAULT 'Москва',
    "district" TEXT,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "experienceLevel" "ExperienceLevel" NOT NULL DEFAULT 'ANY',
    "neededPlayers" INTEGER NOT NULL DEFAULT 1,
    "currentPlayers" INTEGER NOT NULL DEFAULT 1,
    "tags" TEXT[],
    "status" "PlayerPostStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "PlayerPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteGameSession" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "gameSessionId" INTEGER NOT NULL,

    CONSTRAINT "FavoriteGameSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "GameSession_category_idx" ON "GameSession"("category");

-- CreateIndex
CREATE INDEX "GameSession_date_idx" ON "GameSession"("date");

-- CreateIndex
CREATE INDEX "GameSession_status_idx" ON "GameSession"("status");

-- CreateIndex
CREATE INDEX "GameSession_organizerId_idx" ON "GameSession"("organizerId");

-- CreateIndex
CREATE INDEX "GameSession_venueId_idx" ON "GameSession"("venueId");

-- CreateIndex
CREATE INDEX "GameRegistration_gameSessionId_idx" ON "GameRegistration"("gameSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "GameRegistration_userId_gameSessionId_key" ON "GameRegistration"("userId", "gameSessionId");

-- CreateIndex
CREATE INDEX "PlayerPost_category_idx" ON "PlayerPost"("category");

-- CreateIndex
CREATE INDEX "PlayerPost_status_idx" ON "PlayerPost"("status");

-- CreateIndex
CREATE INDEX "PlayerPost_authorId_idx" ON "PlayerPost"("authorId");

-- CreateIndex
CREATE INDEX "FavoriteGameSession_gameSessionId_idx" ON "FavoriteGameSession"("gameSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteGameSession_userId_gameSessionId_key" ON "FavoriteGameSession"("userId", "gameSessionId");

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRegistration" ADD CONSTRAINT "GameRegistration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRegistration" ADD CONSTRAINT "GameRegistration_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerPost" ADD CONSTRAINT "PlayerPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteGameSession" ADD CONSTRAINT "FavoriteGameSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteGameSession" ADD CONSTRAINT "FavoriteGameSession_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
