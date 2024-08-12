import TableSection from "@/components/admin/new-requests/TableSection";
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import CustomDialog from "@/components/ui/customAlertDialog/CustomDialog";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="text-display-xxs ">Welcome Ankit 👋</h3>
          <div className="text-body-md-light text-tc-body-grey">Here’s your Admin dashboard!</div>
        </div>
        <div className="flex space-x-3">
          <CustomDialog
            className="w-[700px]"
            headerTitle={"Invite influencers"}
            triggerElement={
              <Button className="flex rounded-3xl items-center justify-center   bg-white focus:ring-offset-0 border-[1px] border-bc-primary-black text-tc-primary-default font-sans text-body-lg-medium">
                {" "}
                <EnvelopeIcon className="mr-2 w-5 h-5 text-tc-ic-black-default" />
                Invite influencer
              </Button>
            }
          >
            hello
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
            hello
          </CustomDialog>
        </div>
      </div>
      <TableSection />
      {children}
    </div>
  );
};

export default Layout;
