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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RadioOption {
  label: string;
  value: string;
}
interface IFormRadioGroupProps {
  formName: string;
  label: string;
  radioOptions: RadioOption[];
  groupCN?: string;
  required?: boolean;
  disabled?: boolean;
  formDescription?: string;
  defaultValue?: string;
  className?: string;
  triggerOnChange?: boolean;
}
const FormRadioGroup = ({
  formName,
  label,
  radioOptions,
  groupCN,
  required = false,
  disabled = false,
  formDescription,
  defaultValue,
  className,
  triggerOnChange = false,
}: IFormRadioGroupProps) => {
  const { control, trigger } = useFormContext();
  return (
    <FormField
      control={control}
      name={formName}
      render={({ field }) => (
        <FormItem className={cn("w-full  flex flex-col justify-between ", className)}>
          <div className="space-y-2">
            <FormLabel className="text-sm font-medium text-black ">
              {label}
              {required && <span className="text-destructive">*</span>}
            </FormLabel>
            <div>
              <FormControl className="self-end">
                <RadioGroup
                  onValueChange={value => {
                    field.onChange(value);
                    triggerOnChange && trigger(formName);
                  }}
                  value={field.value || null}
                  defaultValue={field.value || defaultValue}
                  className={cn("flex flex-wrap gap-3", groupCN)}
                  disabled={disabled}
                >
                  {radioOptions.map((option, index) => (
                    <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                      <FormControl>
                        <RadioGroupItem value={option.value} id={option.value} />
                      </FormControl>
                      <FormLabel className="font-normal">{option.label}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
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

export default FormRadioGroup;
