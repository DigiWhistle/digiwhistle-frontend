import React from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { CircularChart } from "@/components/ui/Charts/CircularChart";
const ExploreInfluencer = ({ relatedInfluencers }: { relatedInfluencers: any }) => {
  return (
    <div className="flex gap-6">
      <div className="w-[820px] flex gap-8 items-start justify-start bg-white  px-4 py-5 rounded-2xl drop-shadow-y-elevation-md">
        <Avatar className="flex relative min-w-40 max-w-[280px]  h-full bg-slate-100 rounded-xl ">
          {relatedInfluencers.profilePic ? (
            <AvatarImage
              className="flex min-w-40  object-cover  items-center justify-center"
              src={relatedInfluencers.profilePic}
            />
          ) : (
            <div className="flex w-full h-full items-center justify-center">BV</div>
          )}
        </Avatar>
        <div className="flex w-full gap-5 h-full justify-between flex-col">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between w-full items-start">
              <div className="text-tc-primary-default  font-sans text-body-xl-semibold">
                {relatedInfluencers.name}
              </div>
              <div className="rounded-full bg-accent-foreground px-3 pb-[1px]">
                Digiwhistle creator
              </div>
            </div>
            <div className="font-sans text-tc-body-grey text-body-lg-light">
              {relatedInfluencers.desc}
            </div>
          </div>
          <hr />
          <div className="flex gap-3">
            <p className="font-sans text-tc-body-grey text-body-lg-medium">
              {!relatedInfluencers.profileUrl.includes("youtube") && "@"}
              {relatedInfluencers.profileUrl.split("/").pop()}
            </p>
            <div>
              <Link href={relatedInfluencers.profileUrl} target="_blank">
                <ArrowTopRightOnSquareIcon className="h-5 w-5 -mt-0.5 text-link" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="min-w-64 flex gap-8  justify-center bg-white  px-4 py-5 rounded-2xl drop-shadow-y-elevation-md">
        <CircularChart />
      </div>
    </div>
  );
};

export default ExploreInfluencer;
