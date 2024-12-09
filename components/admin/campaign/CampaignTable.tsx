"use client";
import React, { useCallback, useEffect } from "react";
import CampaignCard from "./campaign-card";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { AppDispatch, useAppDispatch, useAppSelector } from "@/lib/config/store";
import {
  campaignsTableData,
  campaignsTableLoading,
  fetchCampaignsData,
} from "@/store/admin/campaigns/CampaignTableSlice";
import { InfluencerType } from "@/types/admin/influencer";
import { debounce } from "lodash";
import { formatDateWithZeroTime } from "@/lib/utils";
import { UserRole } from "@/store/UserSlice";
import { BrandCampaign, Campaign } from "./schema";
import BrandCampaignCard from "./brand-campaign-card";
import { DataTablePagination } from "../lib/pagination";
import InfluencerCampaignCard from "./influencer-campaign-card";

export const CAMPAIGN_TABLE_PAGE_LIMIT = 3;

const CampaignTable = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const dispatch: AppDispatch = useAppDispatch();
  const data = useAppSelector(campaignsTableData);
  const role = useAppSelector(UserRole);
  const loading = useAppSelector(campaignsTableLoading);
  const prevName = useRef<string | null>("");

  const name = searchParams.get("name");
  const type = searchParams.get("type") as InfluencerType;
  const payment = searchParams.get("payment");
  const status = searchParams.get("status");
  const platform = searchParams.get("platform");

  const startTime = searchParams.get("startTime")
    ? formatDateWithZeroTime(new Date(searchParams.get("startTime")!))
    : formatDateWithZeroTime(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));

  const endTime = searchParams.get("endTime")
    ? formatDateWithZeroTime(new Date(searchParams.get("endTime")!))
    : formatDateWithZeroTime(new Date());

  const debouncedFetch = useCallback(
    debounce(params => {
      dispatch(fetchCampaignsData(params));
    }, 300),
    [dispatch],
  );

  useEffect(() => {
    const params = {
      page: Number(currentPath.split("/")[currentPath.split("/").length - 1]),
      limit: CAMPAIGN_TABLE_PAGE_LIMIT,
      startTime,
      endTime,
      name,
      type,
      payment,
      status,
      platform,
    };

    if (name !== prevName.current) {
      debouncedFetch(params);
    } else {
      dispatch(fetchCampaignsData(params));
    }

    prevName.current = name;
  }, [
    dispatch,
    currentPath,
    name,
    type,
    payment,
    status,
    platform,
    startTime,
    endTime,
    debouncedFetch,
  ]);

  const CampaignTable =
    data.data.length > 0 ? (
      data.data.map((campaign, index) => {
        if (role === "admin" || role === "employee") {
          return <CampaignCard data={campaign as Campaign} key={campaign.code} index={index} />;
        } else if (role === "influencer") {
          return (
            <InfluencerCampaignCard
              data={campaign as BrandCampaign}
              key={campaign.code}
              index={index}
            />
          );
        } else {
          return (
            <BrandCampaignCard data={campaign as BrandCampaign} key={campaign.code} index={index} />
          );
        }
      })
    ) : (
      <div className="w-full h-44 flex justify-center items-center">No campaigns found</div>
    );
  return (
    <div>
      {loading ? (
        <div className="flex w-full items-center h-48 justify-center">
          <span className="loading loading-spinner loading-sm "></span>
        </div>
      ) : (
        <div className="space-y-5 mt-5">
          {CampaignTable}
          <DataTablePagination data={data} />
        </div>
      )}
    </div>
  );
};

export default CampaignTable;
