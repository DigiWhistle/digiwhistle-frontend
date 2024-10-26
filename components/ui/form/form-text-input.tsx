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
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
const FormTextInput = ({
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
}: IFormTextInputProps) => {
  const { control } = useFormContext();
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
                <div className="relative flex items-center  border border-gray-300 rounded-full">
                  {leftIcon && (
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      {leftIcon}
                    </div>
                  )}
                  <Input
                    type={type ?? "text"}
                    placeholder={placeholder}
                    {...field}
                    disabled={disabled}
                    value={
                      type === "number"
                        ? parseInt(field.value || defaultValue || null, 10)
                        : field.value || defaultValue || ""
                    }
                    {...inputProps}
                    className={cn(
                      " border-none placeholder:text-muted-foreground bg-white",
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
                  <div className="absolute cursor-pointer inset-y-0 end-0 flex items-center pe-3 ">
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

export default FormTextInput;
