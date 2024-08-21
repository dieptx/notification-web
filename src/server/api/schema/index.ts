import { NotificationType } from "@prisma/client";
import { z } from "zod";

export const addNotificationValidationSchema = z
  .object({
    type: z.nativeEnum(NotificationType),
    sender: z.string().optional(),
    releaseNumber: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === NotificationType.PLATFORM_UPDATE && !data.releaseNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["releaseNumber"],
        message: "Release number is required for Platform Update notifications",
      });
    }

    if (
      (data.type === NotificationType.COMMENT_TAG ||
        data.type === NotificationType.ACCESS_GRANTED ||
        data.type === NotificationType.JOIN_WORKSPACE) &&
      !data.sender
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["sender"],
        message: "Sender is required for this notification type",
      });
    }
  });

export const filterUserNotificationsValidationSchema = z.object({
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.number().nullish(),
});

export const markAsReadNotificationValidationSchema = z.object({
  notificationId: z.number(),
});
