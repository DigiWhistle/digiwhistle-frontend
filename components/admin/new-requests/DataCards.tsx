"use client";
import { DataCard } from "@/components/ui/DataCard";
import { GET } from "@/lib/config/axios";
import { useAppSelector } from "@/lib/config/store";
import { AgencyRequestsTableData } from "@/store/admin/new-requests/AgencyRequestsTableSlice";
import {
  BrandRequestsTable,
  BrandRequestsTableData,
} from "@/store/admin/new-requests/BrandRequestsTableSlice";
import { InfluencerRequestsTableData } from "@/store/admin/new-requests/InfluencerRequestsTableSlice";
import { TDataCard } from "@/types/admin/new-requests";
import { ExclamationCircleIcon, FaceSmileIcon, FaceFrownIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

const DataCards = () => {
  const [data, setData] = useState<TDataCard[]>([]);
  const influencerData = useAppSelector(InfluencerRequestsTableData);
  const brandData = useAppSelector(BrandRequestsTableData);
  const agencyData = useAppSelector(AgencyRequestsTableData);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GET<TDataCard[]>("admin/stats");
      if (response.data) {
        const iconMap: { [key: string]: typeof ExclamationCircleIcon } = {
          ExclamationCircleIcon,
          FaceSmileIcon,
          FaceFrownIcon,
        };

        const dataWithIcons = response.data.map(item => ({
          ...item,
          iconName: iconMap[item.iconName as string] ?? ExclamationCircleIcon,
        }));
        setData(dataWithIcons as TDataCard[]);
      }
    };
    fetchData();
  }, [influencerData?.data, brandData?.data, agencyData?.data]);

  return (
    <div className="flex gap-5 items-center">
      {data.map((d, i) => (
        <DataCard key={i} {...d} />
      ))}
    </div>
  );
};

export default DataCards;
