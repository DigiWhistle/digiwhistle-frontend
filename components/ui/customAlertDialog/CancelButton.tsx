import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import React from "react";
import { Button } from "../button";
const CancelButton = () => {
  return (
    <AlertDialogCancel className="flex flex-grow rounded-3xl items-center justify-center py-3  bg-white hover:bg-slate-100 border-[1px] border-bc-primary-black text-tc-primary-default font-sans text-body-lg-medium">
      Cancel
    </AlertDialogCancel>
  );
};

export default CancelButton;
