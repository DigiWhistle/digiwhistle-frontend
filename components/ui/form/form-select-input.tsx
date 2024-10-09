import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
interface IFormSelectInputProps {
  formName: string;
  label: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  className?: string;
  triggerCN?: string;
  rightIcon?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  selectItems: Array<{ label: string | React.JSX.Element; value: string } | string>;
}

const FormSelectInput = ({
  formName,
  label,
  placeholder,
  required = false,
  disabled = false,
  defaultValue,
  className,
  triggerCN,
  rightIcon,
  inputProps,
  selectItems,
}: IFormSelectInputProps) => {
  const { control } = useFormContext();

  const formattedSelectItems = selectItems.map(item => {
    if (typeof item === "string") {
      return {
        label: item.charAt(0).toUpperCase() + item.slice(1),
        value: item,
      };
    }
    return item;
  });
  return (
    <FormField
      control={control}
      name={formName}
      render={({ field }) => (
        <FormItem className={cn("w-full  flex flex-col ", className)}>
          <FormLabel className="text-sm font-medium -mb-1 text-black ">
            {label} {required && <span className="text-destructive">*</span>}
          </FormLabel>

          <Select
            {...field}
            disabled={disabled}
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={defaultValue}
          >
            <FormControl>
              <SelectTrigger className={cn("flex gap-1 -mt-2 rounded-full ", triggerCN)}>
                <SelectValue className="flex w-full gap-2" placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {formattedSelectItems.map(item => (
                <SelectItem key={item.value} className="hover:text-black" value={item.value}>
                  {item.label}
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
