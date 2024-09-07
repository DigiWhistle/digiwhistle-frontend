import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import clsx from "clsx";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-body-lg-medium font-medium transition-colors disabled:pointer-events-none ",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-tc-primary-default hover:opacity-90  focus:ring-offset-focus-border-color focus:ring-opacity-50 focus:outline-none focus:ring-0 focus:ring-offset-2 disabled:bg-bb-primary-black-disabled disabled:text-black-201",
        secondary:
          "border border-bc-black-disabled  hover:opacity-80  focus:border-black-201 disabled:opacity-50",
        "secondary-dark":
          "border text-white border-white border-2 hover:opacity-80  focus:border-black-201 disabled:opacity-50",
        tertiary:
          "text-tc-primary-white hover:bg-gray-559 focus:border focus:border-focus-border-color focus:text-yellow-101 disabled:opacity-50",
        outline: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
        ghost: "",
      },
      size: {
        default: "h-10 px-4 py-2.5 text-body-lg-medium",
        xl: "h-13 px-4 py-[14px] text-body-lg-medium",
        lg: "h-11 px-4 py-3 text-body-lg-medium",
        sm: "h-9 px-3 py-2 text-body-md-medium",
        xs: "h-8 px-3 py-1.5 text-body-md-medium",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={clsx(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {loading ? (
          <>
            <span className="loading loading-spinner loading-sm "></span>
          </>
        ) : (
          props.children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
