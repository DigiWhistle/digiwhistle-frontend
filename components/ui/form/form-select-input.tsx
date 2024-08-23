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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
interface IFormSelectInputProps {
  formName: string;
  label: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  className?: string;
  inputCN?: string;
  rightIcon?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  selectItems: string[];
}

const FormSelectInput = ({
  formName,
  label,
  placeholder,
  required = false,
  disabled = false,
  defaultValue,
  className,
  inputCN,
  rightIcon,
  inputProps,
  selectItems,
}: IFormSelectInputProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={formName}
      render={({ field }) => (
        <FormItem className={cn("w-full  flex flex-col ", className)}>
          <FormLabel>
            {label} {required && <span className="text-destructive">*</span>}
          </FormLabel>

          <Select
            {...field}
            disabled={disabled}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className=" rounded-full  ">
                <SelectValue className="flex w-full" placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {selectItems.map(item => (
                <SelectItem key={item} className="hover:text-black" value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelectInput;
