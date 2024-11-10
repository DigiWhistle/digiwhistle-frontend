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
import { fetchQueriesTableData } from "@/store/admin/queries/QueriesTableSlice";
import { QUERY_TABLE_PAGE_LIMIT } from "@/types/admin/queries";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/ui/customAlertDialog/CustomDialog";
import { useForm } from "react-hook-form";
import ConfigurePopUp from "./ConfigurePopUp";
const QueriesFilters = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const currentPath = usePathname();

  const searchParams = useSearchParams();
  const defaultInfluencer = searchParams.get("influencer") === "true";
  const defaultBrand = searchParams.get("brand") === "true";
  const defaultSearchTerm = searchParams.get("name");

  const [influencerCheck, setInfluencerCheck] = useState(defaultInfluencer);
  const [brandCheck, setBrandCheck] = useState(defaultBrand);
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm || "");

  const debouncedFetchData = useCallback(
    debounce((query: string) => {
      dispatch(fetchQueriesTableData({ page: 1, limit: QUERY_TABLE_PAGE_LIMIT, name: query }));
    }, 300),
    [dispatch, QUERY_TABLE_PAGE_LIMIT],
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

  return (
    <div className="w-full flex items-center gap-4">
      <div className="relative flex items-center  border border-gray-300 rounded-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </div>
        <Input
          placeholder={"Type user name here"}
          className={cn(
            "min-w-40 lg:w-80 ps-10 border-none placeholder:text-muted-foreground bg-white ",
          )}
          onChange={handleSearchChange}
          value={searchTerm}
          name="search"
        />
      </div>
      <div className="w-px h-7 bg-gray-554"></div>
      <div className="flex gap-2 items-center">
        <div className="flex items-center space-x-2">
          <Switch
            id="brands-only"
            checked={brandCheck}
            onCheckedChange={value => {
              setBrandCheck(value);
              dispatch(
                fetchQueriesTableData({
                  page: 1,
                  limit: QUERY_TABLE_PAGE_LIMIT,
                  brands: value,
                  influencer: influencerCheck,
                }),
              );
              pushUrl("brands", value ? "true" : "false");
            }}
          />
          <Label htmlFor="brands-only">Brands only</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="influencer-only"
            checked={influencerCheck}
            onCheckedChange={value => {
              setInfluencerCheck(value);
              dispatch(
                fetchQueriesTableData({
                  page: 1,
                  limit: QUERY_TABLE_PAGE_LIMIT,
                  brands: brandCheck,
                  influencer: value,
                }),
              );
              pushUrl("influencer", value ? "true" : "false");
            }}
          />
          <Label htmlFor="influencer-only">Influencers only</Label>
        </div>
      </div>
      <CustomDialog
        className="w-[970px]"
        headerTitle="Configure Contact us queries"
        headerDescription={`Please enter below details.`}
        triggerElement={<Button>Configure</Button>}
      >
        <ConfigurePopUp />
      </CustomDialog>
    </div>
  );
};

export default QueriesFilters;
