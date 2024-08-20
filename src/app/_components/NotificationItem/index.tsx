import {
  Notification,
  NotificationSetting,
  NotificationType,
  User,
} from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryClient } from "@trpc/react-query/shared";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { api } from "~/trpc/react";

type Props = {
  item: Notification & {
    sender?: User;
    notificationSetting: NotificationSetting;
  };
  onItemClick: (item: Notification) => void;
};

const generateNotice = (
  noticeSetting?: NotificationSetting,
  sender?: string | null,
) => {
  switch (noticeSetting?.type) {
    case NotificationType.ACCESS_GRANTED:
      return `${sender} shared a chat with you`;
    case NotificationType.COMMENT_TAG:
      return `${sender} tagged you in a comment`;
    case NotificationType.JOIN_WORKSPACE:
      return `${sender} joined your workspace`;
    case NotificationType.PLATFORM_UPDATE:
      return "New features - see what’s new";
    default:
      return null;
  }
};

const SYSTEM_AVATAR_DEFAULT =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHr_Ei8p3PIh0oQgq90qmDZozm16oG1pu5U9NTZ6EfShSwh6aZNJpoU9GBjzV4Y7LT0U&usqp=CAU";

const getLinks = (type: NotificationType, version?: string | null) => {
  switch (type) {
    case NotificationType.ACCESS_GRANTED:
      return "/chats";
    case NotificationType.COMMENT_TAG:
      return "/comments";
    case NotificationType.JOIN_WORKSPACE:
      return "/workspace";
    case NotificationType.PLATFORM_UPDATE:
      return "/";
    default:
      return "/";
  }
};

export const NotificationItem = React.memo(({ item, onItemClick }: Props) => {
  const queryClient = useQueryClient();
  const readMutation = api.notification.markAsRead.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getUserNotifications"],
      });
    },
  });
  return (
    <Link
      href={getLinks(item.notificationSetting.type, item.releaseNumber)}
      onClick={() => {
        readMutation.mutate({
          notificationId: item.id,
        });
        onItemClick(item);
        if (
          item.notificationSetting.type === NotificationType.PLATFORM_UPDATE
        ) {
          alert(item.releaseNumber || "1.2.3");
        }
      }}
      className="my-2 grid grid-flow-col items-center gap-2 rounded-sm p-2"
      style={{
        backgroundColor: item.notificationSetting.color || "inherit",
      }}
    >
      <Avatar>
        <AvatarImage
          className="bg-gray-200"
          src={item.sender?.avatar || SYSTEM_AVATAR_DEFAULT}
        />
        <AvatarFallback>S</AvatarFallback>
      </Avatar>
      <div className="items-center gap-2">
        <p className="line-clamp-2 text-sm font-medium">
          {generateNotice(item.notificationSetting, item.personName)}
        </p>
      </div>
      <p className="text-muted-foreground text-xs">1 hour ago</p>
    </Link>
  );
});
