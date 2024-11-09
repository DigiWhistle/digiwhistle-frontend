import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import React from "react";
import { Button } from "../button";
import { cn } from "@/lib/utils";
const CancelButton = ({
  handleClick,
  text,
  className,
}: {
  handleClick?: any;
  text?: string;
  className?: string;
}) => {
  return (
    <AlertDialogCancel
      onClick={handleClick ? handleClick : () => {}}
      className={cn(
        "flex flex-grow rounded-3xl items-center justify-center py-3 outline-none  bg-white hover:text-tc-black-hover hover:border-tc-black-hover border-[1px] border-bc-primary-black text-tc-primary-default font-sans text-body-lg-medium",
        className,
      )}
    >
      {text ? text : "Cancel"}
    </AlertDialogCancel>
  );
};

export default CancelButton;
