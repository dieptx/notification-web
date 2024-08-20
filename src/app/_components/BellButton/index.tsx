"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import AddNotificationDialog from "../AddNotificationDialog";
import { NotificationItem } from "../NotificationItem";
import { ScrollArea } from "~/components/ui/scroll-area";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { useNotifications } from "~/app/hooks/use-notifications";
import { BellRingIcon } from "lucide-react";

const BellButton = () => {
  const [open, setOpen] = React.useState(false);
  const { unreadCount, notifications, hasMore, loadMore, isLoading, refetch } =
    useNotifications();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild className="focus-visible:ring-0">
        <Button variant="outline" size="icon" className="relative rounded-full">
          {unreadCount > 0 && (
            <span className="absolute right-[-6px] top-[-6px] inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount}
            </span>
          )}
          <BellRingIcon className="h-5 w-5 text-black" />
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="h-[600px] w-[400px]">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="space-y-4 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              {unreadCount
                ? `You have ${unreadCount} new notifications`
                : "You read them all"}
            </p>
            <AddNotificationDialog />
          </div>
          <ScrollArea className="h-[400px] space-y-2">
            {notifications?.map((notification) => (
              <NotificationItem
                item={notification as any}
                key={notification.id + "_" + notification.notificationSettingId}
                onItemClick={async () => {
                  await refetch();
                  setOpen(false);
                }}
              />
            ))}
          </ScrollArea>
          {hasMore && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                className="px-4 py-2"
                disabled={isLoading}
                onClick={loadMore}
              >
                {isLoading ? (
                  <div className="mr-2" />
                ) : (
                  <ArrowDownIcon className="mr-2 h-4 w-4" />
                )}
                Load More
              </Button>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default React.memo(BellButton);
