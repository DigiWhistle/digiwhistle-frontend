import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { Button } from "../button";
const CustomDialog = ({
  children,
  triggerElement,
  className,
  headerTitle,
  headerDescription,
}: {
  children: React.ReactNode;
  triggerElement: React.ReactNode;
  className?: string;
  headerTitle: string;
  headerDescription?: string;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerElement}</AlertDialogTrigger>
      <AlertDialogContent
        className={cn("flex flex-col  pt-10 pb-5 border-none max-w-[1000px] ", className)}
      >
        <AlertDialogCancel className="absolute top-4 right-4 p-0 bg-white hover:bg-white" asChild>
          <XMarkIcon cursor={"Pointer"} className="h-6 w-6 text-tc-ic-black-default" />
        </AlertDialogCancel>
        <AlertDialogHeader className="flex flex-col space-y-2">
          <AlertDialogTitle />
          <AlertDialogDescription />
          <div className="font-sans text-heading-l-semibold text-tc-primary-default">
            {headerTitle}
          </div>
          <div className="text-body-md-light font-sans text-tc-body-grey">{headerDescription}</div>
        </AlertDialogHeader>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomDialog;
