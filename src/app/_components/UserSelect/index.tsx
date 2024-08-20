"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { api } from "~/trpc/react";
import { useDebounce } from "~/app/hooks/use-debounce";
import { useController } from "react-hook-form";

type Props = {
  name: string;
  control: any;
  rules?: any;
};

const DEFAULT_DELAY_IN_MS = 500;

export function UserSelect({ name, control, rules }: Props) {
  const [open, setOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control, rules });

  const debouncedQuery = useDebounce(keyword, DEFAULT_DELAY_IN_MS);
  const [users] = api.user.filterUsers.useSuspenseQuery({
    keyword: debouncedQuery,
  });
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? users.find((user) => user.name === value.id)?.name
            : "Select user..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search user..."
            className="h-9"
            value={keyword}
            onValueChange={setKeyword}
          />
          <CommandList>
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.name}
                  value={user.name}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {user.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === user.name ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </Popover>
  );
}
