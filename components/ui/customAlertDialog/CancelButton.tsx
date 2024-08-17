import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import React from "react";
import { Button } from "../button";
const CancelButton = ({ handleClick, text }: { handleClick?: any; text?: string }) => {
  return (
    <AlertDialogCancel
      onClick={handleClick ? handleClick : () => {}}
      className="flex flex-grow rounded-3xl items-center justify-center py-3  bg-white hover:text-tc-black-hover hover:border-tc-black-hover border-[1px] border-bc-primary-black text-tc-primary-default font-sans text-body-lg-medium"
    >
      {text ? text : "Cancel"}
    </AlertDialogCancel>
  );
};

export default CancelButton;
