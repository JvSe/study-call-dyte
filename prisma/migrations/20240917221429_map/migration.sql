/*
  Warnings:

  - You are about to drop the `WebhookEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "WebhookEvent";

-- CreateTable
CREATE TABLE "webohook" (
    "id" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "meeting" JSONB,
    "reason" TEXT NOT NULL,

    CONSTRAINT "webohook_pkey" PRIMARY KEY ("id")
);
