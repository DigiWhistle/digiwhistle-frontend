"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, ChevronUpDownIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface IFormSearchSelectProps {
  formName: string;
  label: string;
  placeholder: string;
  searchPlaceholder: string;
  required?: boolean;
  disabled?: boolean;
  formDescription?: string;
  defaultValue?: string;
  type?: "text" | "number";
  className?: string;
  inputCN?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  setterfunction: any;
  Options: string[];
  popoverclassname?: string;
}

export function SearchSelect({
  formName,
  label,
  placeholder,
  searchPlaceholder,
  required = false,
  disabled = false,
  formDescription,
  defaultValue,
  type,
  className,
  inputCN,
  leftIcon,
  rightIcon,
  inputProps,
  setterfunction,
  Options,
  popoverclassname,
}: IFormSearchSelectProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={formName}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col ">
          <FormLabel className="text-sm font-medium text-black ">
            {label}
            {required && <span className="text-destructive">*</span>}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl className="border-gray-300">
                <Button
                  variant={"secondary"}
                  role="combobox"
                  className={cn(
                    "w-full justify-between items-center font-sans ",
                    !field.value && "",
                  )}
                >
                  <div className="flex gap-1 text-sm">
                    {leftIcon && <div className="">{leftIcon}</div>}
                    {field.value ? Options.find(Option => Option === field.value) : placeholder}
                  </div>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className={cn("w-full p-0", popoverclassname)}>
              <Command>
                <CommandInput placeholder={searchPlaceholder} className="h-9" />
                <CommandList>
                  <CommandEmpty>Not found.</CommandEmpty>
                  <CommandGroup>
                    {Options.map((Option, index) => (
                      <CommandItem
                        value={Option}
                        key={index}
                        onSelect={() => {
                          setterfunction(formName, Option);
                        }}
                      >
                        {Option}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4 text-black",
                            Option === field.value ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
