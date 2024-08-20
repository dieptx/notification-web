import { NotificationType } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  addNotificationValidationSchema,
  filterUserNotificationsValidationSchema,
  markAsReadNotificationValidationSchema,
} from "../schema";

export const DEFAULT_PAGE = 0;
export const DEFAULT_LIMIT = 10;

export const notificationRouter = createTRPCRouter({
  addNotification: protectedProcedure
    .input(addNotificationValidationSchema)
    .mutation(async ({ ctx, input }) => {
      /**
       * TODO: We will find out messages owned by the person who is logged in later
        const userId = ctx.session?.user?.id;
        if (!userId) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Not authenticated',
          });
        }
       */

      const { type, sender, releaseNumber } = input;

      const foundSender = await ctx.db.user.findFirst({
        where: { name: { contains: sender?.trim() } },
      });
      // Validate the input based on notification type
      if (type === NotificationType.PLATFORM_UPDATE && !releaseNumber?.trim()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Release number is required for Platform update notifications",
        });
      }

      if (
        (type === NotificationType.COMMENT_TAG ||
          type === NotificationType.JOIN_WORKSPACE ||
          type === NotificationType.ACCESS_GRANTED) &&
        !foundSender
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Person who will send the notification is required for Comment Tag, Access Granted, and Join workspace notifications",
        });
      }

      const foundNotificationType = await ctx.db.notificationSetting.findFirst({
        where: { type },
      });

      if (!foundNotificationType) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Can not create notification. Notification type does not exist",
        });
      }

      // Create the notification
      const notification = await ctx.db.notification.create({
        data: {
          notificationSettingId: foundNotificationType.id,
          message: "",
          releaseNumber: releaseNumber ?? null,
          senderId: foundSender?.id ?? null,
          personName: sender ?? null,
        },
      });

      return notification;
    }),
  getUserNotifications: protectedProcedure
    .input(filterUserNotificationsValidationSchema)
    .query(async ({ ctx, input }) => {
      /**
       * TODO: We will find out messages owned by the person who is logged in later
        const userId = ctx.session?.user?.id;
        if (!userId) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Not authenticated',
          });
        }
       */

      const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = input;
      const skip = page * limit;

      const notifications = await ctx.db.notification.findMany({
        include: {
          sender: true,
          notificationSetting: true,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      });

      const totalCount = await ctx.db.notification.count();

      const unreadCount = await ctx.db.notification.count({
        where: {
          isRead: false,
        },
      });
      return {
        notifications,
        totalCount,
        unreadCount,
        page,
        limit,
      };
    }),

  getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
    //TODO: We will check for unread messages owned by the person who is logged in later
    const count = await ctx.db.notification.count({
      where: {
        isRead: false,
      },
    });
    return count;
  }),
  // Mark notification as read
  markAsRead: protectedProcedure
    .input(markAsReadNotificationValidationSchema)
    .mutation(async ({ ctx, input }) => {
      //TODO: We will check for unread messages owned by the person who is logged in later
      const result = await ctx.db.notification.update({
        where: { id: input.notificationId },
        data: { isRead: true },
      });
      return result;
    }),
});
