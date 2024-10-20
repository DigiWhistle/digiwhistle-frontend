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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentStatus } from "@/types/admin/payroll";
import DownloadList from "@/app/(protected)/admin/invoices/DownloadList";

const PurchaseInvoiceFilters = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const role = useAppSelector(UserRole);

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

    pushUrl("invoiceNo", query);
    setSearchTerm(query);
  };

  return (
    <div className="flex justify-between gap-6">
      <div className="relative flex items-center  border border-gray-300 rounded-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </div>
        <Input
          placeholder={"Enter Invoice No here"}
          className={cn(
            "min-w-40 lg:w-80 ps-10 border-none placeholder:text-muted-foreground bg-white ",
          )}
          onChange={handleSearchChange}
          value={searchTerm}
          name="search"
        />
      </div>

      {(role === "agency" || role === "influencer") && <DownloadList />}

      {/* <FiltersDropdown pushUrl={pushUrl} removeParam={removeParam} /> */}
    </div>
  );
};

export default PurchaseInvoiceFilters;
