import { NotificationType } from "@prisma/client";
import React from "react";
import { useController } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select"; // Adjust import according to your project structure

// Define your notification types
const notificationTypes = [
  {
    label: "Platform Update",
    value: NotificationType.PLATFORM_UPDATE,
  },
  {
    label: "Access Granted",
    value: NotificationType.ACCESS_GRANTED,
  },
  {
    label: "Join Workspace",
    value: NotificationType.JOIN_WORKSPACE,
  },
  {
    label: "Comment Tag",
    value: NotificationType.COMMENT_TAG,
  },
];

type Props = {
  name: string;
  control: any;
  onChange?: any;
};
export function NotificationTypeSelect({ name, control, onChange }: Props) {
  const {
    field: { onChange: fieldOnChange, value },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div>
      <Select
        value={value}
        onValueChange={(value) => {
          fieldOnChange(value);
          if (onChange) onChange(value);
        }}
      >
        <SelectTrigger>
          <SelectValue
            placeholder="Select notification type"
            className="outline-none"
          />
        </SelectTrigger>
        <SelectContent>
          {notificationTypes.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  );
}
