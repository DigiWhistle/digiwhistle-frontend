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
import { fetchProfileControlTableData } from "@/store/admin/profile-control/ProfileControlSlice";
import { PROFILE_CONTROL_TABLE_PAGE_LIMIT } from "@/types/admin/ProfileControl";
import CustomDialog from "@/components/ui/customAlertDialog/CustomDialog";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import AddMemberForm from "./AddMemberForm";
const ProfileControlFilters = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const currentPath = usePathname();

  const searchParams = useSearchParams();
  const defaultSearchTerm = searchParams.get("firstName");

  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm || "");

  const debouncedFetchData = useCallback(
    debounce((query: string) => {
      dispatch(
        fetchProfileControlTableData({
          page: 1,
          limit: PROFILE_CONTROL_TABLE_PAGE_LIMIT,
          name: query,
        }),
      );
    }, 300),
    [dispatch, PROFILE_CONTROL_TABLE_PAGE_LIMIT],
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
    <div className="w-full flex items-center justify-between gap-4">
      <div className="relative flex items-center  border border-gray-300 rounded-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </div>
        <Input
          placeholder={"Type employee name here"}
          className={cn(
            "min-w-40 lg:w-80 ps-10 border-none placeholder:text-muted-foreground bg-white ",
          )}
          onChange={handleSearchChange}
          value={searchTerm}
          name="search"
        />
      </div>
      <CustomDialog
        className="w-[700px]"
        headerTitle="Add member"
        headerDescription="Please enter below details."
        triggerElement={
          <Button className="px-8">
            <PlusCircleIcon className="mr-2 w-5 h-5 text-tc-ic-black-default" />
            Add Member
          </Button>
        }
      >
        <AddMemberForm />
      </CustomDialog>
    </div>
  );
};

export default ProfileControlFilters;
