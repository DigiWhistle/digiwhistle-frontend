"use client";
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
import { ClassValue } from "clsx";
import { Control, FieldValues, useFormContext } from "react-hook-form";
import { useState } from "react";
interface IFormTextInputProps {
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
  maxLength?: number;
  setFile: any;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  accept?: string;
}
const FormUploadInput = ({
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
  maxLength,
  setFile,
  inputProps,
  accept,
}: IFormTextInputProps) => {
  const { control } = useFormContext();
  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]); // Set the selected file
  };
  return (
    <FormField
      control={control}
      name={formName}
      render={({ field }) => (
        <FormItem className={cn("w-full  flex flex-col ", className)}>
          <div className="space-y-1">
            <FormLabel className="text-sm font-medium text-black ">
              {label}
              {required && <span className="text-destructive">*</span>}
            </FormLabel>
            <div>
              <FormControl className="">
                <div className="relative flex items-center  ">
                  {leftIcon && (
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      {leftIcon}
                    </div>
                  )}
                  <Input
                    type={"file"}
                    placeholder={placeholder}
                    accept={accept}
                    {...field}
                    onChangeCapture={handleFileChange}
                    {...inputProps}
                    disabled={disabled}
                    value={defaultValue || field.value || ""}
                    maxLength={maxLength ? maxLength : undefined}
                    className={cn(
                      " border border-gray-300 rounded-full h-9 placeholder:text-muted-foreground bg-white items-center ",
                      leftIcon ? "ps-10" : null,
                      rightIcon ? "pe-10" : null,
                      inputCN,
                      disabled ? "bg-[#D0D0D3]" : "",
                    )}
                    onChange={e => {
                      e.preventDefault();
                      type === "number"
                        ? field.onChange(Number(e.target.value))
                        : field.onChange(e.target.value);
                    }}
                  />
                  <div className="absolute z-50 cursor-pointer inset-y-0 end-0 flex items-center pe-3 ">
                    {rightIcon}
                  </div>
                </div>
              </FormControl>
            </div>
          </div>
          {formDescription && <FormDescription>{formDescription}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormUploadInput;
