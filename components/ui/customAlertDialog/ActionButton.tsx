import React from "react";
import { cn } from "@/lib/utils";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
const ActionButton = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick: any;
}) => {
  return (
    <AlertDialogAction
      onClick={onClick}
      className={cn(
        "flex flex-grow items-center justify-center rounded-3xl bg-primary text-tc-primary-default text-body-lg-medium hover:opacity-90  focus:ring-offset-focus-border-color focus:ring-opacity-50 focus:outline-none focus:ring-0 focus:ring-offset-2 disabled:bg-bb-primary-black-disabled disabled:text-black-201",
        className,
      )}
    >
      {children}
    </AlertDialogAction>
  );
};

export default ActionButton;
