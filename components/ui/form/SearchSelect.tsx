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
import { useState } from "react";
import { debounce } from "lodash";
import { GET } from "@/lib/config/axios";
import { getCookie } from "cookies-next";
interface IFormSearchSelectProps {
  formName: string;
  label: string;
  placeholder: string;
  searchPlaceholder: string;
  required?: boolean;
  disabled?: boolean;
  formDescription?: string;
  defaultValue?: string;
  type?: "EmailSelector";
  className?: string;
  inputCN?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  setterfunction: any;
  popoverclassname?: string;
  endpoint?: string;
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
  endpoint,
  popoverclassname,
}: IFormSearchSelectProps) {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [initialValue, setInitialValue] = useState("");
  const [Options, setOptions] = useState<any>([]);
  const debouncedFetchData = debounce(async (value: string) => {
    let response;
    if (type === "EmailSelector") {
      response = await GET(`campaign/search-by-email?email=${value}`);
    } else {
      response = await GET(`campaign/${endpoint}?name=${value}`);
    }
    setOptions(response.data);

    setOpen(!!value);
  }, 300);
  const mark = "email";
  const handleValueChange = (value: string) => {
    setInputValue(value);
    debouncedFetchData(value);
  };

  // (value: string) => {
  //     setInputValue(value);
  //     setOpen(!!value);
  //   };
  // const filteredCommands = Array.isArray(Options)
  //   ? Options.filter((Options) =>
  //       Options.toLowerCase().includes(inputValue.toLowerCase())
  //     )
  //   : [];

  window.onclick = () => {
    setOpen(false);
    setInputValue(initialValue);
  };
  return (
    <FormField
      control={control}
      name={formName}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col  relative">
          <FormLabel className="text-sm font-medium text-black ">
            {label}
            {required && <span className="text-destructive">*</span>}
          </FormLabel>

          <FormControl className="  ">
            <Command>
              <div className="relative flex items-center  border border-gray-300 rounded-full">
                {leftIcon && (
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    {leftIcon}
                  </div>
                )}
                <CommandInput
                  placeholder={searchPlaceholder}
                  value={inputValue}
                  onValueChange={handleValueChange}
                  className={cn("flex h-10 w-full", leftIcon ? "ps-8" : null)}
                />
              </div>
              <CommandList className="absolute mt-11 bg-white w-full max-h-32 z-50">
                {open &&
                  Options.map((Option: any, index: number) => (
                    <CommandItem
                      value={type === "EmailSelector" ? Option.email : Option.name}
                      key={index}
                      className="cursor-pointer"
                      onSelect={() => {
                        setterfunction(formName, Option);

                        if (type === "EmailSelector") {
                          setInputValue("");
                          setInitialValue("");
                        } else {
                          setInputValue(type === "EmailSelector" ? Option.email : Option.name);
                          setInitialValue(type === "EmailSelector" ? Option.email : Option.name);
                        }
                        setOpen(false);
                      }}
                    >
                      {type === "EmailSelector" ? Option.email : Option.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4 text-black",
                          Option === field.value ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandList>
            </Command>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
