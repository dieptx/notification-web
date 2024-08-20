/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { NotificationType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 ~ Start seeding");
  // Seed Users
  const users = await prisma.user.createMany({
    data: [
      {
        name: "Emily",
        email: "emily.johnson@x.dummyjson.com",
        avatar: "https://dummyjson.com/icon/emilys/128",
      },
      {
        name: "Michael",
        email: "michael.williams@x.dummyjson.com",
        avatar: "https://dummyjson.com/icon/michaelw/128",
      },
      {
        name: "Sophia",
        email: "sophia.brown@x.dummyjson.com",
        avatar: "https://dummyjson.com/icon/sophiab/128",
      },
    ],
  });

  // Seed Notification Settings
  const notificationSettings = await prisma.notificationSetting.createMany({
    data: [
      { type: NotificationType.PLATFORM_UPDATE, color: "#FF5733" }, // Example color: Orange-Red
      { type: NotificationType.COMMENT_TAG, color: "#33FF57" }, // Example color: Green
      { type: NotificationType.ACCESS_GRANTED, color: "#3357FF" }, // Example color: Blue
      { type: NotificationType.JOIN_WORKSPACE, color: "#FF33A1" }, // Example color: Pink
    ],
  });

  console.log({ users, notificationSettings });
}

main()
  .then(() => {
    console.log("🚀 ~ Done seeding");
  })
  .catch((e) => {
    console.error("🚀 ~ Error seeding", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
