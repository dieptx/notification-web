"use client";

import { Notification } from "@prisma/client";
import { useState, useEffect } from "react";

import { api } from "~/trpc/react";

export function useNotifications() {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationsPagination, { isLoading, refetch }] =
    api.notification.getUserNotifications.useSuspenseQuery({
      page,
    });

  const {
    notifications: fetchedNotifications,
    unreadCount,
    limit,
    page: serverPage,
  } = notificationsPagination;

  useEffect(() => {
    if (fetchedNotifications.length === 0) {
      setHasMore(false);
    } else {
      if (!page) {
        setNotifications(fetchedNotifications);
      }
    }
  }, [fetchedNotifications]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage(page + 1);
    }
  };

  return {
    unreadCount,
    notifications,
    page,
    limit,
    hasMore,
    loadMore,
    isLoading,
    refetch,
  };
}
