"use client";


import { api } from "~/trpc/react";



export function useNotifications() {

  const {data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage, refetch} = api.notification.getUserNotifications.useInfiniteQuery({
    limit: 10,
  },
  {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })

  return {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading: (isFetchingNextPage || isFetching),
    refetch
  };
}
