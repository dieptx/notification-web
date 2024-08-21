"use client";

import { DEFAULT_LIMIT } from "~/server/api/routers/notification";

import { api } from "~/trpc/react";



export function useNotifications() {

  const {data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage} = api.notification.getUserNotifications.useInfiniteQuery({
    limit: DEFAULT_LIMIT,
  },
  {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })

  return {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading: (isFetchingNextPage || isFetching),
  };
}
