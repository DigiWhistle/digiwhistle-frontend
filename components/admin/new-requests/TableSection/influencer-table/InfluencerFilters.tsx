"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AppDispatch } from "@/lib/config/store";
import { cn } from "@/lib/utils";
import { fetchBrandRequestsData } from "@/store/admin/new-requests/BrandRequestsTableSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchInfluencerRequestsData } from "@/store/admin/new-requests/InfluencerRequestsTableSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InfluencerPlatforms } from "@/types/admin/influencer";

const InfluencerFilters = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const currentPath = usePathname();

  const searchParams = useSearchParams();

  const defaultSearchPlatform = searchParams.get("platform");
  const defaultSearchTerm = searchParams.get("name");

  const [searchPlatform, setSearchPlatform] = useState(defaultSearchPlatform || "");
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm || "");

  const debouncedFetchData = useCallback(
    debounce((query: string) => {
      dispatch(fetchInfluencerRequestsData({ page: 1, name: query }));
    }, 300),
    [dispatch],
  );

  const pushUrl = (paramName: string, value: string) => {
    const newPath = currentPath.replace(/\/\d+$/, "/1");
    const url = new URL(window.location.href);
    url.pathname = newPath;
    url.searchParams.set(paramName, value);
    router.push(url.toString());
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    pushUrl("name", query);
    setSearchTerm(query);
    debouncedFetchData(query);
  };

  // @ts-ignore
  const influencerPlatforms = Object.values(InfluencerPlatforms).map(platform => ({
    label: platform.charAt(0).toUpperCase() + platform.slice(1),
    value: platform,
  }));
  return (
    <div className="w-full flex items-center gap-4">
      <div className="flex gap-2 items-center">
        <Select
          value={searchPlatform}
          onValueChange={value => {
            pushUrl("platform", value);
            setSearchPlatform(value);
          }}
        >
          <SelectTrigger className="flex gap-1 min-w-32">
            Platform: <SelectValue placeholder="Choose Platform" />
          </SelectTrigger>
          <SelectContent>
            {influencerPlatforms.map(platform => (
              <SelectItem key={platform.label} value={platform.value}>
                {platform.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="relative flex items-center  border border-gray-300 rounded-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </div>
        <Input
          placeholder={"Type brand name here"}
          className={cn(
            "min-w-40 lg:w-80 ps-10 border-none placeholder:text-muted-foreground bg-white ",
          )}
          onChange={handleSearchChange}
          value={searchTerm}
          name="search"
        />
      </div>
      {/* <div className="w-px h-7 bg-gray-554"></div> */}
    </div>
  );
};

export default InfluencerFilters;
