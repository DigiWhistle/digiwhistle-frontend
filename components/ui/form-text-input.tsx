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

interface IFormTextInputProps {
  formName: string;
  label: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  formDescription?: string;
  defaultValue?: string;
  type?: "text" | "number" | "password";
  className?: string;
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
}: IFormTextInputProps) => {
  const { control, trigger } = useFormContext();
  return (
    <FormField
      control={control}
      name={formName}
      render={({ field }) => (
        <FormItem className={cn("w-full  flex flex-col justify-between ", className)}>
          <div className="space-y-1">
            <FormLabel className="text-sm font-medium text-black ">
              {label}
              {required && <span className="text-destructive">*</span>}
            </FormLabel>
            <FormControl className="self-end">
              <Input
                type={type ?? "text"}
                placeholder={placeholder}
                {...field}
                disabled={disabled}
                value={defaultValue || field.value || ""}
                className="text-sm border border-gray-300 placeholder:text-muted-foreground bg-white "
                onChange={e => {
                  e.preventDefault();
                  type === "number"
                    ? field.onChange(Number(e.target.value))
                    : field.onChange(e.target.value);
                }}
              />
            </FormControl>
          </div>
          {formDescription && <FormDescription>{formDescription}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormTextInput;
