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
interface IFormTextInputProps {
  mobileFormName: string;
  codeFormName?: string;
  required?: boolean;
  disabled?: boolean;
  formDescription?: string;
  defaultValue?: string;
  className?: ClassValue[];
  inputCN?: ClassValue[];
}
const FormPhoneInput = ({
  mobileFormName,
  codeFormName,
  required = false,
  disabled = false,
  formDescription,
  defaultValue,
  className,
  inputCN,
}: IFormTextInputProps) => {
  const { control } = useFormContext();
  return (
    <div className="flex flex-col w-full gap-2 ">
      <FormLabel className="text-sm font-medium text-black ">
        {"Mobile Number With Country Code"}
        {required && <span className="text-destructive">*</span>}
      </FormLabel>{" "}
      <div className="flex gap-3">
        {/* <div className=" md:w-[150px] w-[130px]">
          <FormField
            control={control}
            name={codeFormName}
            render={({ field }) => (
              <FormItem className={cn("w-full  flex flex-col ", className)}>
                <FormControl className="">
                  <div className="relative flex items-center  border border-gray-300 rounded-full">
                    <div className="absolute inset-y-0 start-0 hidden md:flex items-center ps-3 pointer-events-none ">
                      <DevicePhoneMobileIcon className="text-[#0F172A] w-5 h-5" />
                    </div>

                    <Input
                      type={"text"}
                      placeholder={"e.g.,+91"}
                      {...field}
                      disabled={disabled}
                      value={defaultValue || field.value || ""}
                      className={cn(
                        " border-none placeholder:text-muted-foreground bg-white md:ps-10 ",
                        inputCN,
                      )}
                      onChange={e => {
                        e.preventDefault();
                        field.onChange(e.target.value);
                      }}
                    />
                  </div>
                </FormControl>

                {formDescription && <FormDescription>{formDescription}</FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}
        <FormField
          control={control}
          name={mobileFormName}
          render={({ field }) => (
            <FormItem className={cn("w-full  flex flex-col ", className)}>
              <FormControl className="">
                <div className="relative flex items-center  border border-gray-300 rounded-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
                    <DevicePhoneMobileIcon className="text-[#0F172A] w-5 h-5" />
                  </div>
                  <Input
                    placeholder={"Enter Mobile Number without '+'"}
                    {...field}
                    disabled={disabled}
                    value={defaultValue || field.value || ""}
                    className={cn(
                      " border-none placeholder:text-muted-foreground bg-white ps-10  ",
                      inputCN,
                    )}
                    onChange={e => {
                      e.preventDefault();
                      field.onChange(e.target.value);
                    }}
                  />
                </div>
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
