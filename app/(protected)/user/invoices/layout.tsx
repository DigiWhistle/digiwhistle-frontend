"use client";
import AdminTitle from "@/components/admin/layout/title";
import React from "react";
import CustomDialog from "@/components/ui/customAlertDialog/CustomDialog";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { DateFilter } from "@/components/admin/campaign/DateFIlter";
import CampaignFilters from "@/components/admin/campaign/CampaignFilters";
import AddInfluencers from "@/components/admin/layout/AddInfluencers";
import { useAppSelector } from "@/lib/config/store";
import { UserRole } from "@/store/UserSlice";
import PurchaseInvoiceFilters from "@/components/invoice/purchase-invoice/PurchaseInvoiceFilters";
import CreateInvoiceModal from "@/components/invoice/CreateInvoiceModal";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const role = useAppSelector(UserRole);

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex justify-between items-start">
        <AdminTitle title="Invoice Management 😇" description="All campaigns in full detail." />
        <div className="flex space-x-3">
          <DateFilter />
          {role != "influencer" ? (
            // <CustomDialog
            //   className="w-[970px]"
            //   headerTitle="Create invoice"
            //   headerDescription="Please enter below details."
            //   triggerElement={
            //     <Button>
            //       <PlusCircleIcon className="mr-2 w-5 h-5 text-tc-ic-black-default" />
            //       Create new invoice
            //     </Button>
            //   }
            // >
            //   <CreateInvoiceModal mode="Create sale invoice" />
            // </CustomDialog>
            <></>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div>
        <PurchaseInvoiceFilters />
        {children}
      </div>
    </div>
  );
};

export default Layout;
