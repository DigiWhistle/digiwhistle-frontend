"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { HandThumbUpIcon, LinkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { debounce } from "lodash";
import { GET } from "@/lib/config/axios";
import { DataCard } from "@/components/ui/DataCard";
import { TDataCard } from "@/types/admin/new-requests";
import {
  UsersIcon,
  EyeIcon,
  VideoCameraIcon,
  InboxArrowDownIcon,
  ChatBubbleBottomCenterTextIcon,
  ChartPieIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { toast } from "sonner";
import ExploreInfluencerCard from "../explore-influencers-card";
import { Button } from "../ui/button";
const ExploreInfluencer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [relatedInfluencers, setInfluencers] = useState<any>(null);
  const [data, setData] = useState<TDataCard[]>([]);
  const [urlType, setUrlTYpe] = useState<"youtube" | "instagram" | "X" | undefined>("instagram");
  const [loading, setLoading] = useState(false);
  const [isDigiwhistle, setIsDigiwhistle] = useState<boolean>(false);
  const debouncedFetchData = debounce(async (value: string) => {
    setLoading(true);
    const response: any = await GET(`influencer/explore?url=${value}`);
    // const response = {
    //   data: {
    //     cards: [
    //       { label: "Subscribers", value: "55300", subValue: "", iconName: "FaceFrownIcon" },
    //       { label: "Average Views", value: "22313245", subValue: "", iconName: "EyeIcon" },
    //       { label: "Videos", value: "594", subValue: "", iconName: "VideoCameraIcon" },
    //       { label: "Videsos", value: "594", subValue: "", iconName: "FaceFrownIcon" },
    //     ],
    //     desc: "Hey guys Anmol and team here, you might know me from Instagram, I go by \"financebyanmoll\" with over 307K loving followers. \n\nI'm an NIT-J graduate but my love for finance has got me here, we've been spreading our love for finance with education for the last 3 years and my team and I are here on Youtube to do the same. \n\nSo what is this channel about?\n\nFinance, stock market and geopolitics.\n\nThe three pillars of my channel and this is precisely what my team and I bring you, without any jargon. \n\nKnow how these pillars link with money and what happens in the background.\n\nFinance is for everyone and we make sure you're part of it too and help you reach 'towards your wealth' :)",
    //     name: "Anmol Sharma",
    //     profilePic:
    //       "https://yt3.googleusercontent.com/dk8K143OTsrmGN527jtqJZOlkKeE-lHQcNt1CgO6TzOmspRXtNabLG46OLgP_eaHGv5sUdUE",
    //     profileUrl: "https://www.youtube.com/@finlightanmol",
    //     metric: {
    //       key: 'Fake Followers',
    //       value: Math.round(0.9 * 100),
    //     }
    //   },
    //   error: null,
    // };

    if (!response.error) {
      const iconMap: { [key: string]: typeof UsersIcon } = {
        UsersIcon,
        EyeIcon,
        VideoCameraIcon,
        ChatBubbleBottomCenterTextIcon,
        InboxArrowDownIcon,
        ChartPieIcon,
        ChartBarIcon,
        HandThumbUpIcon,
      };
      setIsDigiwhistle(response.data.isDigiwhistle);
      const dataWithIcons = response.data.cards.map((item: any) => ({
        ...item,
        iconName: iconMap[item.iconName as string] ?? UsersIcon,
      }));
      if (value.includes("youtube.com")) {
        setUrlTYpe("youtube");
      } else if (value.includes("instagram")) {
        setUrlTYpe("instagram");
      } else if (value.includes("X")) {
        setUrlTYpe("X");
      }
      setData(dataWithIcons as TDataCard[]);
      setInfluencers(response.data);
    } else {
      setInfluencers(null);
    }

    setLoading(false);
  }, 1000);

  const handleValueChange = (e: any) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="flex w-full gap-9 flex-col">
      <div className="flex items-center gap-4">
        <div className="relative flex items-center w-2/5 border border-gray-300 rounded-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <LinkIcon className="w-5 h-5" />
          </div>
          <Input
            placeholder={"Search using profile link here"}
            className={cn(
              "min-w-40 w-full ps-10 border-none placeholder:text-muted-foreground bg-white ",
            )}
            onChange={handleValueChange}
            value={searchTerm}
            name="search"
          />
        </div>
        <Button onClick={() => debouncedFetchData(searchTerm)}>Search influencer</Button>
      </div>

      {loading ? (
        <div className="w-full flex justify-center h-36">
          <div className="loading loading-spinner loading-md text-yellow-101 "></div>
        </div>
      ) : relatedInfluencers ? (
        <>
          <div className="flex flex-col w-full gap-5">
            <div className="flex gap-5 items-center">
              {data.map((d: TDataCard, i: any) => (
                <DataCard key={i} {...d} />
              ))}
            </div>
            <ExploreInfluencerCard
              urlType={urlType}
              relatedInfluencers={relatedInfluencers}
              IsDigiwhistle={isDigiwhistle}
            />
          </div>
        </>
      ) : (
        <div>No Influencers Found</div>
      )}
      <div className="text-body-sm-light italic">
        *Data provided here originate from rapid apis sources, and we are not responsible for any
        discrepancies, inaccuracies, or delays in this information
      </div>
    </div>
  );
};

export default ExploreInfluencer;
