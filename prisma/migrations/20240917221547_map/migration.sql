/*
  Warnings:

  - You are about to drop the `webohook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "webohook";

-- CreateTable
CREATE TABLE "webhook" (
    "id" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "meeting" JSONB,
    "reason" TEXT NOT NULL,

    CONSTRAINT "webhook_pkey" PRIMARY KEY ("id")
);
