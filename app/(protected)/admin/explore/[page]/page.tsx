"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { LinkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { debounce } from "lodash";
import { GET } from "@/lib/config/axios";
import DataCards from "@/components/admin/new-requests/DataCards";
import ExploreInfluencer from "@/components/admin/explore-influencers-card/ExploreInfluencer";
const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [relatedInfluencers, setInfluencers] = useState({
    cards: ["string"],
    name: "Anmol Sharma",
    desc: "Finance & Stock Market📈 On a mission to make 10,000 families Crorepatis by 2035 via @finlight.in💰",
    profilePic: "string",
    profileUrl: "https://www.youtube.com/@CarbonFinGami",
    metric: {
      key: "Digiwhistle creator",
      value: 0,
    },
  });
  const debouncedFetchData = debounce(async (value: string) => {
    const response = await GET(`influencer/explore-influencer?url=${value}`);
    const data = {
      cards: ["string"],
      name: "string",
      desc: "string",
      profilePic: "string",
      profileUrl: "string",
      metric: {
        key: "string",
        value: 0,
      },
    };
    setInfluencers(data);
  }, 300);
  const mark = "email";
  const handleValueChange = (e: any) => {
    setSearchTerm(e.target.value);
    debouncedFetchData(e.target.value);
  };
  return (
    <div className="flex w-full gap-9 flex-col">
      <div className="relative flex items-center w-2/5 border border-gray-300 rounded-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <LinkIcon className="w-5 h-5" />
        </div>
        <Input
          placeholder={"Type employee name here"}
          className={cn(
            "min-w-40 w-full ps-10 border-none placeholder:text-muted-foreground bg-white ",
          )}
          onChange={handleValueChange}
          value={searchTerm}
          name="search"
        />
      </div>
      <div className="flex flex-col w-full gap-5">
        <DataCards />
        <ExploreInfluencer relatedInfluencers={relatedInfluencers} />
      </div>
    </div>
  );
};

export default Page;
