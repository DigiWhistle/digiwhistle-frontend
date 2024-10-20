import AdminTitle from "@/components/admin/layout/title";
import React from "react";
import CustomDialog from "@/components/ui/customAlertDialog/CustomDialog";
import { Button } from "@/components/ui/button";
import { ArrowDownTrayIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import CampaignPopup from "@/components/admin/campaign/popup/CampaignPopup";
import { DateFilter } from "@/components/admin/campaign/DateFIlter";
import CampaignFilters from "@/components/admin/campaign/CampaignFilters";
import CampaignDataCards from "@/components/admin/campaign/CampaignDataCards";
import InvoiceAdminFilters from "@/components/invoice/InvoiceAdminFilters";
import DownloadList from "./DownloadList";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex justify-between items-start">
        <AdminTitle title="Invoice Management 😇" description="All invoices in full detail." />
        <div className="flex space-x-3">
          <DownloadList />
          {/* TODO: Tadvi work here  */}
          <CustomDialog
            className="w-[840px]"
            headerTitle="Create Proforma Invoice"
            headerDescription="Please enter below details."
            triggerElement={
              <Button variant={"secondary"}>
                <PlusCircleIcon className="mr-2 w-5 h-5 text-tc-ic-black-default" />
                Create Proforma Invoice
              </Button>
            }
          >
            {/* <AddInfluencers /> */}
            <CampaignPopup mode="Create campaign" />
          </CustomDialog>
          {/* TODO: Tadvi work here  */}

          <CustomDialog
            className="w-[840px]"
            headerTitle="Create Sale Invoice"
            headerDescription="Please enter below details."
            triggerElement={
              <Button>
                <PlusCircleIcon className="mr-2 w-5 h-5 text-tc-ic-black-default" />
                Create Sale Invoice
              </Button>
            }
          >
            {/* <AddInfluencers /> */}
            <CampaignPopup mode="Create campaign" />
          </CustomDialog>
        </div>
      </div>

      <div>
        <InvoiceAdminFilters />
        {children}
      </div>
    </div>
  );
};

export default layout;
