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
import FormTextInput from "./form-text-input";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import React from "react";

interface IFormTextInputProps {
  mobileFormName: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  formDescription?: string;
  defaultValue?: string;
  className?: string;
  inputCN?: string;
}

const CustomInputComponent = React.forwardRef<HTMLInputElement>((props, ref) => (
  <Input {...props} ref={ref} className={cn("border-none focus-visible:ring-0 h-9  ")} />
));
CustomInputComponent.displayName = "CustomInputComponent";

const FormPhoneInput = ({
  mobileFormName,
  label,
  required = false,
  disabled = false,
  formDescription,
  defaultValue,
  className,
  inputCN,
}: IFormTextInputProps) => {
  const { control, watch } = useFormContext();

  return (
    <div className="flex flex-col w-full gap-2 ">
      <FormLabel className="text-sm font-medium text-black ">
        {label ?? "Mobile Number"}
        {required && <span className="text-destructive">*</span>}
      </FormLabel>{" "}
      <div className="flex gap-3">
        <FormField
          control={control}
          name={mobileFormName}
          render={({ field }) => (
            <FormItem
              className={cn(
                "w-full rounded-full flex flex-col ",
                className,
                disabled ? "bg-[#D0D0D390]" : "",
              )}
            >
              <FormControl className="">
                <PhoneInput
                  defaultCountry="IN"
                  placeholder="Enter phone number"
                  {...field}
                  disabled={disabled}
                  value={field.value || defaultValue || ""}
                  className={cn(
                    "flex gap-1 h-10 border border-gray-300 ring-offset-background rounded-full px-4 py-2 text-sm   hoevr:border-ring focus-visible:ring-[1px] focus-visible:ring-ring focus-visible:ring-offset-0  ",
                    inputCN,
                  )}
                  inputComponent={CustomInputComponent}
                />
              </FormControl>

              {formDescription && <FormDescription>{formDescription}</FormDescription>}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default FormPhoneInput;
