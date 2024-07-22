/*
  Warnings:

  - You are about to drop the `participans` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "participans" DROP CONSTRAINT "participans_meeting_id_fkey";

-- DropForeignKey
ALTER TABLE "participans" DROP CONSTRAINT "participans_user_id_fkey";

-- DropTable
DROP TABLE "participans";

-- CreateTable
CREATE TABLE "participants" (
    "id" TEXT NOT NULL,
    "role_call" TEXT NOT NULL DEFAULT 'group_call_host',
    "user_token" TEXT NOT NULL DEFAULT '',
    "in_room" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    "meeting_id" TEXT NOT NULL,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_meeting_id_fkey" FOREIGN KEY ("meeting_id") REFERENCES "meetings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
