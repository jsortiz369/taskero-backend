/*
  Warnings:

  - You are about to drop the column `user_agent` on the `users_sessions` table. All the data in the column will be lost.
  - Made the column `ip_address` on table `users_sessions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "system"."users_sessions" DROP COLUMN "user_agent",
ADD COLUMN     "browser" VARCHAR(255),
ADD COLUMN     "os" VARCHAR(255),
ADD COLUMN     "version" VARCHAR(255),
ALTER COLUMN "ip_address" SET NOT NULL;
