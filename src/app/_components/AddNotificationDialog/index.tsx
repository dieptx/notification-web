/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";

import { Input } from "~/components/ui/input";
import { PlusCircleIcon } from "lucide-react";
import { addNotificationValidationSchema } from "~/server/api/schema";
import { NotificationType } from "@prisma/client";
import { UserSelect } from "../UserSelect";
import { NotificationTypeSelect } from "../NotificationTypeSelect";
import { api } from "~/trpc/react";

export default function AddNotificationDialog() {
  const [showModal, setShowModal] = useState(false);
  const utils = api.useUtils();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      type: "",
      releaseNumber: "",
      sender: "",
    },
    resolver: zodResolver(addNotificationValidationSchema),
  });
  const notificationType = useWatch({
    control,
    name: "type",
  });

  const handleNotificationTypeChange = (value: any) => {
    reset({
      type: value,
      releaseNumber:
        value === NotificationType.PLATFORM_UPDATE ? "" : undefined,
    });
  };

  const createNotificationMutation =
    api.notification.addNotification.useMutation({
      onSuccess: async () => {
        await utils.invalidate();
        setShowModal(false);
      },
      onError(error, variables, context) {
        console.log("Error add notification", { error, variables, context });
      },
    });
  const onSubmit = (data: any) => {
    createNotificationMutation.mutate(data);
  };

  const handleCancelNotification = () => {
    setShowModal(false);
    reset();
  };
  console.log("🚀 ~ AddNotificationDialog ~ errors:", errors);

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger>
        <Button variant="outline" className="outline-none" size="icon">
          <PlusCircleIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Notification</DialogTitle>
          <DialogDescription>
            Select the type of notification and fill in the details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
            <Label>Type</Label>
            <NotificationTypeSelect
              name="type"
              control={control}
              onChange={handleNotificationTypeChange}
            />
          </div>
          {notificationType === NotificationType.PLATFORM_UPDATE && (
            <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
              <Label htmlFor="releaseNumber">Release Number</Label>
              <Controller
                name="releaseNumber"
                control={control}
                render={({ field }) => (
                  <div className="w-full">
                    <Input id="releaseNumber" type="text" {...field} />
                    {errors.releaseNumber && (
                      <span className="text-xs text-red-500">
                        {errors.releaseNumber.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
          )}
          {(notificationType === NotificationType.ACCESS_GRANTED ||
            notificationType === NotificationType.JOIN_WORKSPACE ||
            notificationType === NotificationType.COMMENT_TAG) && (
            <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
              <Label htmlFor="sender">Sender</Label>
              <div className="w-full">
                <UserSelect name="sender" control={control} />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              type="submit"
              className="mt-2 sm:mt-0"
              disabled={!notificationType}
            >
              Create
            </Button>
            <DialogClose asChild>
              <Button variant="outline" onClick={handleCancelNotification}>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
