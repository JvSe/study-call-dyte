-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "online" BOOLEAN DEFAULT true
);

-- CreateTable
CREATE TABLE "mettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "preferred_region" TEXT,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "record_on_start" BOOLEAN NOT NULL,
    "live_stream_on_start" BOOLEAN NOT NULL,
    "persist_chat" BOOLEAN NOT NULL,
    "summarize_on_end" BOOLEAN NOT NULL,
    "is_large" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "recording_config" TEXT DEFAULT 'NOT-CONFIGURED'
);

-- CreateTable
CREATE TABLE "participans" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role_call" TEXT NOT NULL DEFAULT 'group_call_host',
    "user_id" TEXT NOT NULL,
    "meeting_id" TEXT NOT NULL,
    CONSTRAINT "participans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "participans_meeting_id_fkey" FOREIGN KEY ("meeting_id") REFERENCES "mettings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "participans_user_id_key" ON "participans"("user_id");
