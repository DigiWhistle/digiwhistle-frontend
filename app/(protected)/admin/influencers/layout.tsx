import TableSection from "@/components/admin/new-requests/TableSection";
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import CustomDialog from "@/components/ui/customAlertDialog/CustomDialog";
import AddInfluencers from "@/components/admin/layout/AddInfluencers";
import InviteInfluencer from "@/components/admin/layout/InviteInfluencer";
import InfluencerFilters from "@/components/admin/new-requests/TableSection/influencer-table/InfluencerFilters";
import Title from "./title";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex justify-between items-start">
        <Title />
        <div className="flex space-x-3">
          <CustomDialog
            className="w-[700px]"
            headerTitle={"Invite influencers"}
            headerDescription="Please enter below details."
            triggerElement={
              <Button variant={"secondary"}>
                {" "}
                <EnvelopeIcon className="mr-2 w-5 h-5 text-tc-ic-black-default" />
                Invite influencer
              </Button>
            }
          >
            <InviteInfluencer />
          </CustomDialog>
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
        </div>
      </div>
      <div>
        <InfluencerFilters />
        {children}
      </div>
    </div>
  );
};

export default Layout;
