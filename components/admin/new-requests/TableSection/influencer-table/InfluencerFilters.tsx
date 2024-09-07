"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AppDispatch, useAppSelector } from "@/lib/config/store";
import { camelToNormal, cn } from "@/lib/utils";
import { fetchBrandRequestsData } from "@/store/admin/new-requests/BrandRequestsTableSlice";
import {
  ArrowPathIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  fetchInfluencerRequestsData,
  InfluencerRequestsTableLoading,
} from "@/store/admin/new-requests/InfluencerRequestsTableSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InfluencerFollowers,
  InfluencerNiche,
  InfluencerPlatforms,
  InfluencerType,
} from "@/types/admin/influencer";
import { INFLUENCER_TABLE_PAGE_LIMIT } from ".";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Checked = DropdownMenuCheckboxItemProps["checked"];

// @ts-ignore
const NicheOptions = Object.values(InfluencerNiche).map(platform => ({
  label: platform.charAt(0).toUpperCase() + platform.slice(1),
  value: platform,
}));

// @ts-ignore
const InfluencerTypes = Object.values(InfluencerType).map(platform => ({
  label: platform.charAt(0).toUpperCase() + platform.slice(1),
  value: platform,
}));

const FollowersOptions = [
  { label: "Less than 250k", value: "lessThan250k" },
  { label: "250k to 500k", value: "250Kto500K" },
  { label: "500k to 750k", value: "500Kto750K" },
  { label: "More than 750k", value: "moreThan750K" },
];
export function FiltersDropdown({
  pushUrl,
  removeParam,
}: {
  pushUrl: (paramName: string, value: string) => void;
  removeParam: (paramName: string) => void;
}) {
  const searchParams = useSearchParams();

  const defaultNiche = searchParams.get("niche");
  const defaultType = searchParams.get("type");
  const defaultFollowers = searchParams.get("followers");

  const countFilters = [defaultNiche, defaultType, defaultFollowers].filter(
    item => item !== null,
  ).length;

  return (
    <div className="flex gap-3 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-2 items-center">
          <FunnelIcon className="w-4 h-4" />
          <span className="">Filter ({countFilters})</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-5 space-y-3">
          <DropdownMenuLabel className="font-medium pl-0 mb-3">Influencer Niche</DropdownMenuLabel>
          <RadioGroup
            defaultValue={defaultNiche as string}
            onValueChange={value => pushUrl("niche", value)}
          >
            {NicheOptions.map(item => (
              <div className="flex items-center space-x-2" key={item.value}>
                <RadioGroupItem value={item.value} id={item.value} />
                <Label htmlFor={item.value}>{item.label}</Label>
              </div>
            ))}
          </RadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="font-medium pl-0 mb-3">Influencer Type</DropdownMenuLabel>
          <RadioGroup
            defaultValue={defaultType as string}
            onValueChange={value => pushUrl("type", value)}
          >
            {InfluencerTypes.map(item => (
              <div className="flex items-center space-x-2" key={item.value}>
                <RadioGroupItem value={item.value} id={item.value} />
                <Label htmlFor={item.value}>{item.label}</Label>
              </div>
            ))}
          </RadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="font-medium pl-0 mb-3">Followers</DropdownMenuLabel>
          <RadioGroup
            defaultValue={defaultFollowers as string}
            onValueChange={value => pushUrl("followers", value)}
          >
            {FollowersOptions.map(item => (
              <div className="flex items-center space-x-2" key={item.value}>
                <RadioGroupItem value={item.value} id={item.value} />
                <Label htmlFor={item.value}>{item.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {countFilters > 0 && <div className="w-px h-7 bg-gray-554"></div>}
      {defaultNiche && (
        <FilterTag value={defaultNiche} paramName="niche" onClickHandler={removeParam} />
      )}
      {defaultType && (
        <FilterTag value={defaultType} paramName="type" onClickHandler={removeParam} />
      )}
      {defaultFollowers && (
        <FilterTag value={defaultFollowers} paramName="followers" onClickHandler={removeParam} />
      )}
    </div>
  );
}

const FilterTag = ({
  value,
  paramName,
  onClickHandler,
}: {
  value: string;
  paramName: string;
  onClickHandler: (paramName: string) => void;
}) => {
  return (
    <div className="flex gap-1 items-center border rounded-full px-4 py-1.5">
      {camelToNormal(value)}{" "}
      <XMarkIcon
        className="w-3 h-3 text-tc-ic-black-default cursor-pointer"
        onClick={() => onClickHandler(paramName)}
      />
    </div>
  );
};

// @ts-ignore
export const influencerPlatforms = Object.values(InfluencerPlatforms).map(platform => ({
  label: platform.charAt(0).toUpperCase() + platform.slice(1),
  value: platform,
}));

const InfluencerFilters = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const currentPath = usePathname();
  const loading = useAppSelector(InfluencerRequestsTableLoading);

  const searchParams = useSearchParams();

  const defaultSearchPlatform = searchParams.get("platform");
  const defaultSearchTerm = searchParams.get("name");

  const [searchPlatform, setSearchPlatform] = useState(
    defaultSearchPlatform || InfluencerPlatforms.INSTAGRAM,
  );
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm || "");

  const debouncedFetchData = useCallback(
    debounce((query: string) => {
      dispatch(
        fetchInfluencerRequestsData({
          page: 1,
          name: query,
          platform: searchPlatform as InfluencerPlatforms,
        }),
      );
    }, 300),
    [dispatch, searchPlatform],
  );

  const pushUrl = (paramName: string, value: string) => {
    const newPath = currentPath.replace(/\/\d+$/, "/1");
    const url = new URL(window.location.href);

    if (value === null) {
      url.searchParams.delete(paramName);
    } else {
      url.searchParams.set(paramName, value);
    }

    url.pathname = newPath;
    url.searchParams.set(paramName, value);
    router.push(url.toString());
  };

  const removeParam = (paramName: string) => {
    const newPath = currentPath.replace(/\/\d+$/, "/1");
    const url = new URL(window.location.href);

    url.searchParams.delete(paramName);
    url.pathname = newPath;
    router.push(url.toString());
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    pushUrl("name", query);
    setSearchTerm(query);
    debouncedFetchData(query);
  };

  return (
    <div className="w-full flex items-center justify-between gap-4">
      <div className=" flex  items-center gap-4">
        <div className="flex gap-2 items-center">
          <Select
            value={searchPlatform}
            onValueChange={value => {
              pushUrl("platform", value);
              setSearchPlatform(value);
            }}
          >
            <SelectTrigger className="flex gap-1 min-w-32 px-4">
              Platform: <SelectValue placeholder="Choose Platform" />
            </SelectTrigger>
            <SelectContent>
              {influencerPlatforms.map(platform => (
                <SelectItem key={platform.value} value={platform.value}>
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
            placeholder={"Type influencer name here"}
            className={cn(
              "min-w-40 lg:w-80 ps-10 border-none placeholder:text-muted-foreground bg-white ",
            )}
            onChange={handleSearchChange}
            value={searchTerm}
            name="search"
          />
        </div>

        <FiltersDropdown pushUrl={pushUrl} removeParam={removeParam} />
      </div>
      <Button
        variant={"secondary"}
        onClick={() => pushUrl("refresh", true.toString())}
        loading={searchParams.get("refresh") === "true" && loading}
        disabled={searchParams.get("refresh") === "true" && loading}
      >
        {" "}
        <ArrowPathIcon className="mr-2 w-5 h-5 text-tc-ic-black-default" />
        Refresh
      </Button>
    </div>
  );
};

export default InfluencerFilters;
