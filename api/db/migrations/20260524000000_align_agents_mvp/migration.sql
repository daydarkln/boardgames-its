-- Align enum values and GameSession fields with AGENTS.md.

BEGIN;
CREATE TYPE "ExperienceLevel_new" AS ENUM ('ANY', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED');
ALTER TABLE "GameSession" ALTER COLUMN "experienceLevel" DROP DEFAULT;
ALTER TABLE "PlayerPost" ALTER COLUMN "experienceLevel" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "experienceLevel" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "experienceLevel" TYPE "ExperienceLevel_new" USING (
  CASE "experienceLevel"::text
    WHEN 'CASUAL' THEN 'INTERMEDIATE'
    WHEN 'EXPERIENCED' THEN 'INTERMEDIATE'
    WHEN 'EXPERT' THEN 'ADVANCED'
    ELSE "experienceLevel"::text
  END::"ExperienceLevel_new"
);
ALTER TABLE "GameSession" ALTER COLUMN "experienceLevel" TYPE "ExperienceLevel_new" USING (
  CASE "experienceLevel"::text
    WHEN 'CASUAL' THEN 'INTERMEDIATE'
    WHEN 'EXPERIENCED' THEN 'INTERMEDIATE'
    WHEN 'EXPERT' THEN 'ADVANCED'
    ELSE "experienceLevel"::text
  END::"ExperienceLevel_new"
);
ALTER TABLE "PlayerPost" ALTER COLUMN "experienceLevel" TYPE "ExperienceLevel_new" USING (
  CASE "experienceLevel"::text
    WHEN 'CASUAL' THEN 'INTERMEDIATE'
    WHEN 'EXPERIENCED' THEN 'INTERMEDIATE'
    WHEN 'EXPERT' THEN 'ADVANCED'
    ELSE "experienceLevel"::text
  END::"ExperienceLevel_new"
);
ALTER TYPE "ExperienceLevel" RENAME TO "ExperienceLevel_old";
ALTER TYPE "ExperienceLevel_new" RENAME TO "ExperienceLevel";
DROP TYPE "ExperienceLevel_old";
ALTER TABLE "GameSession" ALTER COLUMN "experienceLevel" SET DEFAULT 'ANY';
ALTER TABLE "PlayerPost" ALTER COLUMN "experienceLevel" SET DEFAULT 'ANY';
ALTER TABLE "User" ALTER COLUMN "experienceLevel" SET DEFAULT 'ANY';
COMMIT;

BEGIN;
CREATE TYPE "GameSessionStatus_new" AS ENUM ('DRAFT', 'PUBLISHED', 'CANCELLED', 'FINISHED');
ALTER TABLE "GameSession" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "GameSession" ALTER COLUMN "status" TYPE "GameSessionStatus_new" USING (
  CASE "status"::text
    WHEN 'OPEN' THEN 'PUBLISHED'
    WHEN 'FULL' THEN 'PUBLISHED'
    WHEN 'COMPLETED' THEN 'FINISHED'
    WHEN 'HIDDEN' THEN 'CANCELLED'
    ELSE "status"::text
  END::"GameSessionStatus_new"
);
ALTER TYPE "GameSessionStatus" RENAME TO "GameSessionStatus_old";
ALTER TYPE "GameSessionStatus_new" RENAME TO "GameSessionStatus";
DROP TYPE "GameSessionStatus_old";
ALTER TABLE "GameSession" ALTER COLUMN "status" SET DEFAULT 'PUBLISHED';
COMMIT;

BEGIN;
CREATE TYPE "PlayerPostStatus_new" AS ENUM ('ACTIVE', 'CLOSED', 'HIDDEN');
ALTER TABLE "PlayerPost" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "PlayerPost" ALTER COLUMN "status" TYPE "PlayerPostStatus_new" USING (
  CASE "status"::text
    WHEN 'OPEN' THEN 'ACTIVE'
    ELSE "status"::text
  END::"PlayerPostStatus_new"
);
ALTER TYPE "PlayerPostStatus" RENAME TO "PlayerPostStatus_old";
ALTER TYPE "PlayerPostStatus_new" RENAME TO "PlayerPostStatus";
DROP TYPE "PlayerPostStatus_old";
ALTER TABLE "PlayerPost" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

ALTER TABLE "GameSession"
ADD COLUMN "connectionInfo" TEXT,
ADD COLUMN "isOnline" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "locationDetails" TEXT;
