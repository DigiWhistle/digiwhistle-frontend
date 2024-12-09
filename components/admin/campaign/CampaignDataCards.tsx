"use client";
import { DataCard } from "@/components/ui/DataCard";
import { GET } from "@/lib/config/axios";
import { useAppSelector } from "@/lib/config/store";
import { formatDateWithZeroTime } from "@/lib/utils";
import { campaignsTableData } from "@/store/admin/campaigns/CampaignTableSlice";
import { TDataCard } from "@/types/admin/new-requests";
import { UsersIcon, CurrencyRupeeIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CampaignDataCards = () => {
  const [data, setData] = useState<TDataCard[]>([]);
  const tableData = useAppSelector(campaignsTableData);
  const searchParams = useSearchParams();

  const startTime = searchParams.get("startTime")
    ? formatDateWithZeroTime(new Date(searchParams.get("startTime")!))
    : formatDateWithZeroTime(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));

  const endTime = searchParams.get("endTime")
    ? formatDateWithZeroTime(new Date(searchParams.get("endTime")!))
    : formatDateWithZeroTime(new Date());

  useEffect(() => {
    const fetchData = async () => {
      const response = await GET<TDataCard[]>(
        `campaign/stats?startTime=${startTime}&endTime=${endTime}`,
      );
      if (response.data) {
        const iconMap: { [key: string]: typeof UsersIcon } = {
          UsersIcon,
          CurrencyRupeeIcon,
        };

        const dataWithIcons = response.data.map(item => ({
          ...item,
          iconName: iconMap[item.iconName as string] ?? UsersIcon,
        }));
        setData(dataWithIcons as TDataCard[]);
      }
    };
    fetchData();
  }, [tableData?.data, startTime, endTime]);

  return (
    <div className="flex gap-5 items-center flex-wrap">
      {data.map((d, i) => (
        <DataCard key={i} {...d} />
      ))}
    </div>
  );
};

export default CampaignDataCards;
