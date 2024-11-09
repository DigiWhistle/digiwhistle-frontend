"use client";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { campaignsTableLoading } from "@/store/admin/campaigns/CampaignTableSlice";
import { AppDispatch, useAppSelector } from "@/lib/config/store";
import { Input } from "@/components/ui/input";
import { camelToNormal, cn } from "@/lib/utils";
import { FunnelIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
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
import { Label } from "@/components/ui/label";
import { InfluencerPlatforms, InfluencerType } from "@/types/admin/influencer";
import { UserRole } from "@/store/UserSlice";
import { influencerPlatforms } from "../new-requests/TableSection/influencer-table/InfluencerFilters";

// @ts-ignore
const InfluencerTypes = Object.values(InfluencerType).map(platform => ({
  label: platform.charAt(0).toUpperCase() + platform.slice(1),
  value: platform,
}));

const PaymentOption = [
  { label: "All", value: "all" },
  { label: "All Received", value: "All Paid" },
  { label: "Pending", value: "Pending" },
];

const CampaignStatusOptions = [
  { label: "All", value: "all" },
  { label: "Live", value: "Live" },
  { label: "Not Live", value: "Not Live" },
];

export function FiltersDropdown({
  pushUrl,
  removeParam,
}: {
  pushUrl: (paramName: string, value: string) => void;
  removeParam: (paramName: string) => void;
}) {
  const searchParams = useSearchParams();
  const role = useAppSelector(UserRole);

  const defaultPayment = searchParams.get("payment");
  const defaultType = searchParams.get("type");
  const defaultCampaignStatus = searchParams.get("status");
  const defaultPlatform = searchParams.get("platform");

  const countFilters = [defaultPayment, defaultType, defaultCampaignStatus, defaultPlatform].filter(
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
          <DropdownMenuLabel className="font-medium pl-0 mb-3">Payment Status</DropdownMenuLabel>
          <RadioGroup
            defaultValue={defaultPayment as string}
            onValueChange={value => pushUrl("payment", value)}
          >
            {PaymentOption.map(item => (
              <div className="flex items-center space-x-2" key={item.value}>
                <RadioGroupItem value={item.value} id={item.value} />
                <Label htmlFor={item.value}>
                  {item.value === "All Paid" && role === "brand" ? "All Paid" : item.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <DropdownMenuSeparator />
          {role === "admin" ? (
            <>
              <DropdownMenuLabel className="font-medium pl-0 mb-3">
                Influencer Type
              </DropdownMenuLabel>
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
            </>
          ) : (
            <>
              <DropdownMenuLabel className="font-medium pl-0 mb-3">
                Campaign Status
              </DropdownMenuLabel>
              <RadioGroup
                defaultValue={defaultCampaignStatus as string}
                onValueChange={value => pushUrl("status", value)}
              >
                {CampaignStatusOptions.map(item => (
                  <div className="flex items-center space-x-2" key={item.value}>
                    <RadioGroupItem value={item.value} id={item.value} />
                    <Label htmlFor={item.value}>{item.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          )}
          {role !== "admin" && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="font-medium pl-0 mb-3">Platform</DropdownMenuLabel>
              <RadioGroup
                defaultValue={defaultPlatform as string}
                onValueChange={(value: string) => pushUrl("platform", value)}
              >
                {influencerPlatforms.map(item => (
                  <div className="flex items-center space-x-2" key={item.value}>
                    <RadioGroupItem value={item.value} id={item.value} />
                    <Label htmlFor={item.value}>{item.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {countFilters > 0 && <div className="w-px h-7 bg-gray-554"></div>}
      {defaultPayment && (
        <FilterTag value={defaultPayment} paramName="payment" onClickHandler={removeParam} />
      )}
      {defaultType && (
        <FilterTag value={defaultType} paramName="type" onClickHandler={removeParam} />
      )}
      {defaultCampaignStatus && (
        <FilterTag value={defaultCampaignStatus} paramName="status" onClickHandler={removeParam} />
      )}
      {defaultPlatform && (
        <FilterTag value={defaultPlatform} paramName="platform" onClickHandler={removeParam} />
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

const CampaignFilters = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const role = useAppSelector(UserRole);

  const searchParams = useSearchParams();

  const defaultSearchTerm = searchParams.get("name");

  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm || "");
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
  };

  return (
    <div className="flex gap-6">
      <div className="relative flex items-center  border border-gray-300 rounded-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </div>
        <Input
          placeholder={"Search campaign"}
          className={cn(
            "min-w-40 lg:w-80 ps-10 border-none placeholder:text-muted-foreground bg-white ",
          )}
          onChange={handleSearchChange}
          value={searchTerm}
          name="search"
        />
      </div>
      {role !== "influencer" && <FiltersDropdown pushUrl={pushUrl} removeParam={removeParam} />}
    </div>
  );
};

export default CampaignFilters;
