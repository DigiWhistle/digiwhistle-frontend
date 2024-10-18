import AdminTitle from "@/components/admin/layout/title";
import React from "react";
import CustomDialog from "@/components/ui/customAlertDialog/CustomDialog";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import CreatePayrollPopUp from "@/components/admin/payroll/CreatePayrollPopUp";
import { DateFilter } from "@/components/admin/campaign/DateFIlter";
import CampaignFilters from "@/components/admin/campaign/CampaignFilters";
import CampaignDataCards from "@/components/admin/campaign/CampaignDataCards";
import PayrollFilters from "@/components/admin/payroll/PayrollFilters";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex justify-between items-start">
        <AdminTitle title="Payroll management" description="All payrolls in full detail." />
        <div className="flex space-x-3">
          <DateFilter />
          <CustomDialog
            className="w-[840px]"
            headerTitle="Create payroll"
            headerDescription="Please enter below details."
            triggerElement={
              <Button>
                <PlusCircleIcon className="mr-2 w-5 h-5 text-tc-ic-black-default" />
                Create new payroll
              </Button>
            }
          >
            {/* <AddInfluencers /> */}
            <CreatePayrollPopUp mode="Create payroll" />
          </CustomDialog>
        </div>
      </div>

      <div>
        <PayrollFilters />
        {children}
      </div>
    </div>
  );
};

export default layout;
