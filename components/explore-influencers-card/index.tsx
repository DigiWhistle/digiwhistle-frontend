import React from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { CircularChart } from "@/components/ui/Charts/CircularChart";
import Image from "next/image";
const ExploreInfluencerCard = ({
  relatedInfluencers,
  urlType,
  IsDigiwhistle,
}: {
  relatedInfluencers: any;
  urlType: "youtube" | "instagram" | "X" | undefined;
  IsDigiwhistle: boolean;
}) => {
  return (
    <>
      <div className="flex gap-6">
        <div className="w-[820px] flex gap-8 items-start justify-start bg-white  px-4 py-5 rounded-2xl drop-shadow-y-elevation-md">
          <Avatar className="flex relative min-w-40 max-w-[280px] overflow-hidden h-full bg-slate-100 rounded-xl ">
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
                {IsDigiwhistle ? (
                  <div className="rounded-full bg-accent-foreground px-3 pb-[1px]">
                    Digiwhistle creator
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="font-sans text-tc-body-grey text-body-lg-light h-36 overflow-hidden text-wrap truncate">
                {relatedInfluencers.desc}
              </div>
            </div>
            <hr />
            <div className="flex gap-3 items-center">
              {urlType === "X" ? (
                <Image src="/assets/icons/twitter.svg" alt="X" width={40} height={30} />
              ) : (
                <></>
              )}
              {urlType === "youtube" ? (
                <Image src="/assets/icons/youtube.svg" alt="X" width={40} height={30} />
              ) : (
                <></>
              )}
              {urlType === "instagram" ? (
                <Image src="/assets/icons/instagram.svg" alt="X" width={40} height={30} />
              ) : (
                <></>
              )}

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
        {urlType !== "youtube" ? (
          <div className="min-w-64 flex gap-8  justify-center bg-white  px-4 py-5 rounded-2xl drop-shadow-y-elevation-md">
            <CircularChart percent={urlType === "instagram"} metric={relatedInfluencers.metric} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ExploreInfluencerCard;
