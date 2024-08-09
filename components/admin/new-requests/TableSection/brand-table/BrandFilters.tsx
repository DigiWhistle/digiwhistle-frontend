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
import { PAGE_LIMIT } from ".";
import { debounce } from "lodash";
import { usePathname, useRouter } from "next/navigation";

const BrandFilters = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const currentPath = usePathname();

  const debouncedFetchData = useCallback(
    debounce((query: string) => {
      dispatch(fetchBrandRequestsData({ page: 1, limit: PAGE_LIMIT, name: query }));
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
      <div className="flex gap-2 items-center">
        <div className="flex items-center space-x-2">
          <Switch
            id="approve-only"
            onCheckedChange={value =>
              dispatch(fetchBrandRequestsData({ page: 1, limit: PAGE_LIMIT, approved: value }))
            }
          />
          <Label htmlFor="approve-only">Approve only</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="rejected-only"
            onCheckedChange={value =>
              dispatch(fetchBrandRequestsData({ page: 1, limit: PAGE_LIMIT, rejected: value }))
            }
          />
          <Label htmlFor="rejected-only">Rejected only</Label>
        </div>
      </div>
    </div>
  );
};

export default BrandFilters;
