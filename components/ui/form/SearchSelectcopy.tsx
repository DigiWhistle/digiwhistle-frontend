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
}

export function SearchSelectCopy({
  formName,
  label,
  placeholder,
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

          <Command>
            <CommandInput placeholder={placeholder} className="h-9" />
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

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
