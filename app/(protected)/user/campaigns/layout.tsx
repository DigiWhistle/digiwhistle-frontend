"use client";
import AdminTitle from "@/components/admin/layout/title";
import React from "react";
import CustomDialog from "@/components/ui/customAlertDialog/CustomDialog";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import CampaignPopup from "@/components/admin/campaign/popup/CampaignPopup";
import { DateFilter } from "@/components/admin/campaign/DateFIlter";
import CampaignFilters from "@/components/admin/campaign/CampaignFilters";
import CampaignDataCards from "@/components/admin/campaign/CampaignDataCards";
import AddInfluencers from "@/components/admin/layout/AddInfluencers";
import { useAppSelector } from "@/lib/config/store";
import { UserRole } from "@/store/UserSlice";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const role = useAppSelector(UserRole);
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex justify-between items-start">
        <AdminTitle title="Manage Campaigns 😇" description="All campaigns in full detail." />
        <div className="flex space-x-3">
          <DateFilter />
          {role === "agency" ? (
            <CustomDialog
              className="w-[700px]"
              headerTitle="Add influencer"
              headerDescription="Please enter below details."
              triggerElement={
                <Button>
                  <PlusCircleIcon className="mr-2 w-5 h-5 text-tc-ic-black-default" />
                  Add Influencer
                </Button>
              }
            >
              <AddInfluencers />
            </CustomDialog>
          ) : (
            <></>
          )}
        </div>
      </div>
      <CampaignDataCards />

      <div>
        <CampaignFilters />
        {children}
      </div>
    </div>
  );
};

export default Layout;
