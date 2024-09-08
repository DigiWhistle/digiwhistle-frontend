"use client";
import React, { useCallback, useEffect } from "react";
import CampaignCard from "./campaign-card";
import { campaigns } from "./constants";
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

export const CAMPAIGN_TABLE_PAGE_LIMIT = 3;

const CampaignTable = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const dispatch: AppDispatch = useAppDispatch();
  const data = useAppSelector(campaignsTableData);
  const loading = useAppSelector(campaignsTableLoading);
  const prevName = useRef<string | null>("");

  const name = searchParams.get("name");
  const type = searchParams.get("type") as InfluencerType;
  const payment = searchParams.get("payment");

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
      name,
      type,
      payment,
    };

    if (name !== prevName.current) {
      debouncedFetch(params);
    } else {
      dispatch(fetchCampaignsData(params));
    }

    prevName.current = name;
  }, [dispatch, currentPath, name, type, payment]);

  return (
    <div>
      {data.data.map(campaign => (
        <CampaignCard data={campaign as any} key={campaign.code} />
      ))}
    </div>
  );
};

export default CampaignTable;
