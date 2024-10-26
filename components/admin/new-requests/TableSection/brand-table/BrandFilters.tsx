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
import { BRAND_TABLE_PAGE_LIMIT } from "@/types/admin/new-requests";

const BrandFilters = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const currentPath = usePathname();

  const searchParams = useSearchParams();
  const defaultApproved = searchParams.get("approved") === "true";
  const defaultRejected = searchParams.get("rejected") === "true";
  const defaultSearchTerm = searchParams.get("name");

  const [approved, setApproved] = useState(defaultApproved);
  const [rejected, setRejected] = useState(defaultRejected);
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm || "");

  const debouncedFetchData = useCallback(
    debounce((query: string) => {
      dispatch(fetchBrandRequestsData({ page: 1, limit: BRAND_TABLE_PAGE_LIMIT, name: query }));
    }, 300),
    [dispatch, BRAND_TABLE_PAGE_LIMIT],
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
          placeholder={"Type brand name here"}
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
            id="approve-only"
            checked={approved}
            onCheckedChange={value => {
              setApproved(value);
              dispatch(
                fetchBrandRequestsData({
                  page: 1,
                  limit: BRAND_TABLE_PAGE_LIMIT,
                  approved: value,
                  rejected: rejected,
                }),
              );
              pushUrl("approved", value ? "true" : "false");
            }}
          />
          <Label htmlFor="approve-only">Approved</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="rejected-only"
            checked={rejected}
            onCheckedChange={value => {
              setRejected(value);
              dispatch(
                fetchBrandRequestsData({
                  page: 1,
                  limit: BRAND_TABLE_PAGE_LIMIT,
                  approved: approved,
                  rejected: value,
                }),
              );
              pushUrl("rejected", value ? "true" : "false");
            }}
          />
          <Label htmlFor="rejected-only">Rejected</Label>
        </div>
      </div>
    </div>
  );
};

export default BrandFilters;
