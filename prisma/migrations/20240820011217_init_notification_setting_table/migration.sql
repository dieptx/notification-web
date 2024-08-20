/*
  Warnings:

  - You are about to drop the column `createdById` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `targetUserId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `notificationSettingId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_targetUserId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "createdById",
DROP COLUMN "targetUserId",
DROP COLUMN "type",
ADD COLUMN     "notificationSettingId" INTEGER NOT NULL,
ADD COLUMN     "recipientId" INTEGER,
ADD COLUMN     "senderId" INTEGER;

-- CreateTable
CREATE TABLE "NotificationSetting" (
    "id" SERIAL NOT NULL,
    "type" "NotificationType" NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "NotificationSetting_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_notificationSettingId_fkey" FOREIGN KEY ("notificationSettingId") REFERENCES "NotificationSetting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
