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
import { PAGE_LIMIT } from "./QueriesTable";
import { debounce } from "lodash";
import { usePathname, useRouter } from "next/navigation";
import { fetchQueriesTableData } from "@/store/admin/queries/QueriesTableSlice";

const QueriesFilters = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const currentPath = usePathname();
  const [influencerCheck, setInfluencerCheck] = useState(false);
  const [brandCheck, setBrandCheck] = useState(false);

  const debouncedFetchData = useCallback(
    debounce((query: string) => {
      dispatch(fetchQueriesTableData({ page: 1, limit: PAGE_LIMIT, name: query }));
    }, 300),
    [dispatch, PAGE_LIMIT],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    const newPath = currentPath.replace(/\/\d+$/, "/1");
    router.push(newPath);
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
            id="brands-only"
            onCheckedChange={value => {
              setBrandCheck(value);
              dispatch(
                fetchQueriesTableData({
                  page: 1,
                  limit: PAGE_LIMIT,
                  brands: value,
                  influencer: influencerCheck,
                }),
              );
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
                  limit: PAGE_LIMIT,
                  brands: brandCheck,
                  influencer: value,
                }),
              );
            }}
          />
          <Label htmlFor="influencer-only">Influencers only</Label>
        </div>
      </div>
    </div>
  );
};

export default QueriesFilters;
