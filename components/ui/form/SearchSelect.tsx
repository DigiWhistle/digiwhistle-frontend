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
import { UserRole } from "@/store/UserSlice";
import { useAppSelector } from "@/lib/config/store";
interface IFormSearchSelectProps {
  formName: string;
  label: string;
  placeholder: string;
  searchPlaceholder: string;
  required?: boolean;
  disabled?: boolean;
  formDescription?: string;
  defaultValue?: string;
  type?: "EmailSelector" | "email";
  className?: string;
  inputCN?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  setterfunction: any;
  popoverclassname?: string;
  endpoint?: string;
  selectedValueSetter?: any;
  searchType?: string;
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
  searchType,
  selectedValueSetter,
}: IFormSearchSelectProps) {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [initialValue, setInitialValue] = useState<string>("");
  const [Options, setOptions] = useState<any>([]);
  const role = useAppSelector(UserRole);
  const debouncedFetchData = debounce(async (value: string) => {
    let response: any;
    if (type === "EmailSelector" && role != "agency" && role != "influencer") {
      if (searchType && searchType === "employee") {
        response = await GET(`employee/search?email=${value}`);
      } else {
        response = await GET(`user/search?queryType=InfluencerAndAgencyByEmail&email=${value}`);
      }
    } else if (type === "email") {
      response = await GET(`employee/search?email=${value}`);
    } else {
      response = await GET(`${endpoint}?name=${value}`);
    }
    if ((role === "agency" || role === "influencer") && type === "EmailSelector") {
      setOptions([{ name: value, email: value, id: value }]);
    } else {
      setOptions([{ name: value, email: value, id: value }, ...response.data]);
    }
    setOpen(!!value);
  }, 1000);
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
  const getValue = (value?: string) => {
    if (inputValue.length === 0 && initialValue.length === 0 && value) {
      setInputValue(value);
      setInitialValue(value);
    }
    return inputValue;
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
              <div
                className={cn(
                  "relative flex items-center  border border-gray-300 rounded-full",
                  disabled ? "bg-[#D0D0D3]" : "",
                )}
              >
                {leftIcon && (
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    {leftIcon}
                  </div>
                )}
                <CommandInput
                  placeholder={searchPlaceholder}
                  value={getValue(field.value)}
                  defaultValue={field.value}
                  onValueChange={handleValueChange}
                  disabled={disabled}
                  className={cn("flex h-10 w-full", leftIcon ? "ps-8" : null)}
                />
              </div>
              <CommandList className={cn("absolute mt-11 bg-white w-full max-h-32 z-50")}>
                {Options &&
                  open &&
                  Options.map((Option: any, index: number) => (
                    <CommandItem
                      value={
                        type === "EmailSelector" || type === "email" ? Option.email : Option.name
                      }
                      key={index}
                      className={cn("cursor-pointer")}
                      onSelect={() => {
                        setterfunction(formName, Option);

                        if (type === "EmailSelector") {
                          setInputValue("");
                          setInitialValue("");
                          setOpen(false);
                        } else {
                          setInputValue(type === "email" ? Option.email : Option.name);
                          setInitialValue(type === "email" ? Option.email : Option.name);
                          setOpen(false);
                          selectedValueSetter(Option);
                        }
                      }}
                    >
                      {type === "EmailSelector" || type === "email" ? Option.email : Option.name}
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
