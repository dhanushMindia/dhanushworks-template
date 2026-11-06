-- Align the historical migration chain with the current portfolio Prisma schema.
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "theme" TEXT NOT NULL DEFAULT 'editorial';

ALTER TABLE "Attachment" ADD COLUMN IF NOT EXISTS "fileUrl" TEXT;
UPDATE "Attachment" SET "fileUrl" = "url" WHERE "fileUrl" IS NULL;
ALTER TABLE "Attachment" ALTER COLUMN "fileUrl" SET NOT NULL;
ALTER TABLE "Attachment" DROP COLUMN IF EXISTS "url";
ALTER TABLE "Attachment" DROP COLUMN IF EXISTS "size";

ALTER TABLE "Folder" ALTER COLUMN "icon" SET DEFAULT 'Folder';
ALTER TABLE "Folder" ALTER COLUMN "color" SET DEFAULT 'default';
ALTER TABLE "Note" ALTER COLUMN "title" SET DEFAULT 'Untitled';
