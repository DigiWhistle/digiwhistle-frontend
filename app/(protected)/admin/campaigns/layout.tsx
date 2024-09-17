import AdminTitle from "@/components/admin/layout/title";
import React from "react";
import CustomDialog from "@/components/ui/customAlertDialog/CustomDialog";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import CampaignPopup from "@/components/admin/campaign/popup/CampaignPopup";
import { DateFilter } from "@/components/admin/campaign/DateFIlter";
import CampaignFilters from "@/components/admin/campaign/CampaignFilters";
import CampaignDataCards from "@/components/admin/campaign/CampaignDataCards";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex justify-between items-start">
        <AdminTitle title="Manage Campaigns 😇" description="All campaigns in full detail." />
        <div className="flex space-x-3">
          <DateFilter />
          <CustomDialog
            className="w-[840px]"
            headerTitle="Create campaign"
            headerDescription="Please enter below details."
            triggerElement={
              <Button>
                <PlusCircleIcon className="mr-2 w-5 h-5 text-tc-ic-black-default" />
                Create campaign
              </Button>
            }
          >
            {/* <AddInfluencers /> */}
            <CampaignPopup mode="Create campaign" />
          </CustomDialog>
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

export default layout;
