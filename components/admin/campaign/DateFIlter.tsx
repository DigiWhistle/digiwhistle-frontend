"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function DateFilter({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPath = usePathname();

  const startTime = searchParams.get("startTime")
    ? new Date(searchParams.get("startTime")!)
    : new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  const endTime = searchParams.get("endTime") ? new Date(searchParams.get("endTime")!) : new Date();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startTime,
    to: endTime,
  });

  const onChange = useCallback(
    (range: DateRange | undefined) => {
      setDate(range);

      const newPath = currentPath.replace(/\/\d+$/, "/1");
      const url = new URL(window.location.href);

      if (range?.from && range?.to) {
        url.searchParams.set("startTime", format(range.from, "yyyy-MM-dd"));
        url.searchParams.set("endTime", format(range.to, "yyyy-MM-dd"));
      } else {
        url.searchParams.delete("startTime");
        url.searchParams.delete("endTime");
      }

      url.pathname = newPath;
      router.push(url.toString());
    },
    [currentPath, router],
  );

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"secondary"}
            className={cn(
              " flex gap-2 justify-start  text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <div>
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </div>
            <ChevronDownIcon className="mr-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 " align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
