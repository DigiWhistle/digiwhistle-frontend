import { AccordionTrigger } from "@/components/ui/accordion";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { EllipsisVerticalIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, ExclamationCircleIcon, UserIcon } from "@heroicons/react/24/solid";
import { useAppSelector } from "@/lib/config/store";
import { UserRole } from "@/store/UserSlice";
import CurrencyValueDisplay from "@/components/ui/currency-value-display";
import CreateCreditNote from "@/components/admin/invoices/CreateCreditNote";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CustomDialog from "@/components/ui/customAlertDialog/CustomDialog";
import CreatePayrollPopUp from "@/components/admin/payroll/CreatePayrollPopUp";
import CancelButton from "@/components/ui/customAlertDialog/CancelButton";
import ActionButton from "@/components/ui/customAlertDialog/ActionButton";
import { DELETE, GET } from "@/lib/config/axios";
import { toast } from "sonner";
import ShareInvoice from "@/components/admin/invoices/ShareInvoice";
import SaleInvoice from "@/components/admin/invoices/SaleInvoice";
import { usePathname } from "next/navigation";
import CreateProformaInvoice from "@/components/admin/invoices/CreateProformaInvoice";
import { cn } from "@/lib/utils";

const PAID = "All Received";
const HeadingCard = ({ data }: { data: any }) => {
  const role = useAppSelector(UserRole);
  const currentPath = usePathname();

  const invoiceType = currentPath.split("/")[currentPath.split("/").length - 2] as
    | "sale"
    | "proforma";
  return (
    <div>
      <div className="w-full flex gap-4 items-center  justify-between text-tc-body-grey font-medium">
        <div className="flex items-center gap-4">
          <div className="flex gap-1 items-center">
            <h5
              className={cn(
                "font-semibold text-tc-primary-default text-xl",
                data?.paymentStatus === PAID ? " text-success" : data?.isLapse ? "text-alert" : "",
              )}
            >
              {data?.invoiceNumber}
            </h5>
            <Popover>
              <PopoverTrigger>
                <InformationCircleIcon className="w-5 h-5 text-tc-body-grey" />
              </PopoverTrigger>
              <PopoverContent
                className="w-fit text-tc-primary-white bg-black-201 text-sm p-3 space-y-4"
                sideOffset={4}
                alignOffset={-50}
                align="start"
              >
                <p>Campaign Code: {data?.code}</p>
                <p>Duration: {data?.campaignDuration}</p>
              </PopoverContent>
            </Popover>
          </div>
          {data?.total && (
            <>
              <div className="flex w-0.5  h-6 bg-bc-grey"></div>

              <CurrencyValueDisplay value={data?.total} />
            </>
          )}

          {data?.brand && (
            <div className="flex gap-1 items-center">
              <div className="flex w-0.5  h-6 bg-bc-grey mr-2"></div>
              <div className="">{data?.brand} (Brand)</div>
              <Popover>
                <PopoverTrigger>
                  <InformationCircleIcon className="w-5 h-5 text-tc-body-grey" />
                </PopoverTrigger>
                <PopoverContent
                  className="w-fit text-tc-primary-white bg-black-201 text-sm p-3 space-y-4"
                  sideOffset={4}
                  alignOffset={-50}
                  align="start"
                >
                  <p>Campaign Code: {data?.campaignCode}</p>
                  <p>Duration: {data?.campaignDuration}</p>
                </PopoverContent>
              </Popover>
            </div>
          )}
          {data?.gstTin && (
            <>
              <div className="flex w-0.5  h-6 bg-bc-grey"></div>
              <p>{data?.gstTin} (GSTIN)</p>
            </>
          )}
          {data?.issueDate && (
            <>
              <div className="flex w-0.5  h-6 bg-bc-grey"></div>
              <p>{data?.issueDate} (Invoice Date)</p>
            </>
          )}

          {/* {data?.poc && (
            <>
              <div className="flex w-0.5  h-6 bg-bc-grey"></div>
              <UserIcon className="h-5 -mr-2" />
              <p>
                {data?.poc}
                {form.getValues("pocIncentive") && `(+${form.getValues("pocIncentive")}% Incentive)`}
              </p>
            </>
          )} */}
        </div>
        <div className="flex gap-4 items-center">
          {/* TODO: TADVI WORK HERE --> Implement for sale & proforma invoice for admin only*/}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className=" flex items-center cursor-pointer ">
              <button type="button">
                <EllipsisVerticalIcon className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1" align="end">
              {/* TODO: TADVI WORK HERE*/}

              <CustomDialog
                className="w-[840px]"
                headerTitle="Edit invoice"
                headerDescription="Please enter below details."
                triggerElement={
                  <div className="flex rounded-sm items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none transition-colors hover:text-tc-ic-black-hover ">
                    Edit invoice
                  </div>
                }
              >
                {invoiceType === "sale" ? (
                  <SaleInvoice mode="Edit sale invoice" edit_id={data} />
                ) : (
                  <CreateProformaInvoice mode="Edit proforma invoice" edit_id={data} />
                )}
              </CustomDialog>

              <CustomDialog
                className="w-[700px]"
                headerTitle="Share invoice"
                headerDescription=""
                triggerElement={
                  <div className="flex rounded-sm items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none transition-colors hover:text-tc-ic-black-hover ">
                    Share invoice
                  </div>
                }
              >
                <ShareInvoice edit_id={data?.id} shareUrl={`invoice/${invoiceType}/share`} />
              </CustomDialog>
              <button
                className="flex rounded-sm items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none transition-colors hover:text-tc-ic-black-hover "
                onClick={async () => {
                  const response = await GET<{ url: string }>(
                    `invoice/${invoiceType}/download?id=${data?.id}`,
                  );
                  if (response.error) {
                    toast.error(response.error);
                    return;
                  }

                  const url = response.data?.url;
                  if (typeof url === "string") {
                    window.open(url, "_blank");
                  } else {
                    toast.error("Invalid URL");
                  }
                }}
              >
                Download Invoice
              </button>
              {invoiceType === "sale" &&
                (!data.creditNoteGenerated ? (
                  <CustomDialog
                    className="w-[970px]"
                    headerTitle="Create credit note"
                    headerDescription=""
                    triggerElement={
                      <div className="flex rounded-sm items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none transition-colors hover:text-tc-ic-black-hover ">
                        Create credit note
                      </div>
                    }
                  >
                    <CreateCreditNote edit_id={data} />
                  </CustomDialog>
                ) : (
                  <div className="flex rounded-sm items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none text-success ">
                    Credit note generated
                  </div>
                ))}
              {invoiceType === "sale" && (
                <button
                  className="flex rounded-sm items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none transition-colors hover:text-tc-ic-black-hover "
                  onClick={async () => {
                    const response = await GET<{ url: string }>(
                      `invoice/creditnote/download?id=${data?.id}`,
                    );
                    if (response.error) {
                      toast.error(response.error);
                      return;
                    }
                    const url = response.data?.url;
                    if (typeof url === "string") {
                      window.open(url, "_blank");
                    } else {
                      toast.error("Invalid URL");
                    }
                  }}
                >
                  Download Credit Note
                </button>
              )}
              <CustomDialog
                className="w-[400px]"
                headerTitle="Delete query"
                headerDescription="Please note that this action is permanent and irreversible in nature."
                triggerElement={
                  <div className="flex text-destructive rounded-sm hover:text-white hover:bg-destructive items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none ">
                    Delete Invoice
                  </div>
                }
              >
                <div className="flex w-full gap-3 pt-6 border-t-2">
                  <CancelButton />
                  <ActionButton
                    className="bg-destructive text-white hover:bg-destructive/90"
                    onClick={async () => {
                      const response = await DELETE(`invoice/${invoiceType}/${data?.id}`);
                      if (response.error) {
                        toast.error(response.error);
                      } else {
                        toast.success("Sale invoice deleted successfully");
                        window.location.reload();
                      }
                    }}
                  >
                    Delete
                  </ActionButton>
                </div>
              </CustomDialog>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <Select
            value=""
            onValueChange={(value: "influencer" | "agency") => {
              append(createNewParticipant(value));
            }}
          >
            <SelectTrigger
              className="flex gap-2 items-center bg-yellow-101 text-black-201 w-fit"
              iconClassName="w-6 h-6"
            >
              <SelectValue placeholder="Add" />
              <div className="h-10 w-px bg-white-301 ml-6"></div>
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="influencer">Add influencer</SelectItem>
              <SelectItem value="agency">Add agency</SelectItem>
            </SelectContent>
          </Select> */}
          <AccordionTrigger svgCN="w-6 h-6 text-[#0F172A]"></AccordionTrigger>
        </div>
      </div>
    </div>
  );
};

export default HeadingCard;
