"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { BellIcon } from "~/components/icon/bell-icon";
import { XIcon } from "~/components/icon/x-icon";
import AddNotificationDialog from "../AddNotificationDialog";

export default function BellButton() {
  const [showModal, setShowModal] = useState(false);
  const [notificationType, setNotificationType] = useState("");
  const [notificationDetails, setNotificationDetails] = useState({});
  const handleNotificationTypeChange = (value) => {
    setNotificationType(value);
    setNotificationDetails({});
  };
  const handleNotificationDetailsChange = (field, value) => {
    setNotificationDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleCreateNotification = () => {
    setShowModal(false);
  };
  const handleCancelNotification = () => {
    setShowModal(false);
    setNotificationType("");
    setNotificationDetails({});
  };

  const unreadNotifications = 3;

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="focus-visible:ring-0">
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-full"
          >
            {unreadNotifications > 0 && (
              <span className="absolute right-[-6px] top-[-6px] inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unreadNotifications}
              </span>
            )}
            <BellIcon className="h-5 w-5 text-black" />
            <span className="sr-only">Notifications</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[400px]">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="space-y-4 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                You have 3 new notifications
              </p>
              <AddNotificationDialog />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-sm font-medium">Registration is open</p>
                    <p className="text-muted-foreground text-xs">2 days ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BellIcon className="h-5 w-5" />
                  <div>
                    <p className="text-sm font-medium">New message</p>
                    <p className="text-muted-foreground text-xs">1 hour ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-sm font-medium">Upcoming event</p>
                    <p className="text-muted-foreground text-xs">
                      3 days from now
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon"></Button>
              </div>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Notification</DialogTitle>
            <DialogDescription>
              Select the type of notification and fill in the details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-[1fr_auto] items-center gap-4">
              <Label htmlFor="notification-type">Notification Type</Label>
              <Select
                id="notification-type"
                value={notificationType}
                onValueChange={handleNotificationTypeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="calendar">Calendar Event</SelectItem>
                  <SelectItem value="message">Message</SelectItem>
                  <SelectItem value="alarm">Alarm</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {notificationType === "calendar" && (
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                <Label htmlFor="calendar-event">Event Name</Label>
                <div className="text-right text-gray-500 dark:text-gray-400">
                  Required
                </div>
                <Input
                  id="calendar-event"
                  type="text"
                  className="max-w-[200px]"
                  value={notificationDetails.eventName || ""}
                  onChange={(e) =>
                    handleNotificationDetailsChange("eventName", e.target.value)
                  }
                  required
                />
              </div>
            )}
            {notificationType === "alarm" && (
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                <Label htmlFor="alarm-time">Alarm Time</Label>
                <div className="text-right text-gray-500 dark:text-gray-400">
                  Required
                </div>
                <Input
                  id="alarm-time"
                  type="time"
                  className="max-w-[200px]"
                  value={notificationDetails.alarmTime || ""}
                  onChange={(e) =>
                    handleNotificationDetailsChange("alarmTime", e.target.value)
                  }
                  required
                />
              </div>
            )}
            <div className="grid grid-cols-[1fr_auto] items-center gap-4">
              <Button
                type="submit"
                onClick={handleCreateNotification}
                disabled={
                  notificationType === "" ||
                  (notificationType === "calendar" &&
                    !notificationDetails.eventName) ||
                  (notificationType === "message" &&
                    !notificationDetails.messageText) ||
                  (notificationType === "alarm" &&
                    !notificationDetails.alarmTime)
                }
              >
                Create Notification
              </Button>
              <Button variant="outline" onClick={handleCancelNotification}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
