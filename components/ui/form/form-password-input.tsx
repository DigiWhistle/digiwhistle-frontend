"use client";
import React, { useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Control, FieldValues, useFormContext } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface IFormPasswordInputProps {
  formName: string;
  label: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  formDescription?: string;
  defaultValue?: string;
  type?: "text" | "number" | "password";
  className?: string;
  inputCN?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  triggerOnInput?: boolean;
}

const FormPasswordInput = ({
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
  triggerOnInput = false,
}: IFormPasswordInputProps) => {
  const { control, trigger, getValues } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={formName}
      render={({ field }) => (
        <FormItem className={cn("w-full  flex flex-col ")}>
          <div className="flex gap-2 justify-between">
            <FormLabel className="text-sm font-medium text-black ">
              {label}
              {required && <span className="text-destructive">*</span>}
            </FormLabel>
          </div>
          <div className="relative">
            <FormControl className="self-end ">
              <div className="relative flex items-center  border border-gray-300 rounded-full">
                {leftIcon && (
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    {leftIcon}
                  </div>
                )}
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder={placeholder}
                  {...field}
                  value={field.value || ""}
                  className={cn(
                    " border-none placeholder:text-muted-foreground bg-white ",
                    leftIcon ? "ps-10" : null,
                    inputCN,
                  )}
                  onChange={e => {
                    e.preventDefault();
                    field.onChange(e.target.value);
                    triggerOnInput && trigger(formName);

                    if (!(e.target.value.length > 0)) {
                      setShowPassword(false);
                    }
                  }}
                />
              </div>
            </FormControl>
            {getValues(formName) ? (
              showPassword ? (
                <EyeSlashIcon
                  className="w-4 h-4 absolute right-3 top-3 text-muted-foreground disabled:cursor-not-allowed"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <EyeIcon
                  className="w-4 h-4 absolute right-3 top-3 text-muted-foreground disabled:cursor-not-allowed"
                  onClick={() => setShowPassword(true)}
                />
              )
            ) : null}
          </div>
          {formDescription && <FormDescription>{formDescription}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormPasswordInput;
