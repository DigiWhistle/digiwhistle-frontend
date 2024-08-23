"use client";
import { DataCard } from "@/components/ui/DataCard";
import { getAuthorizedRequest } from "@/lib/config/axios";
import { TDataCard } from "@/types/admin/new-requests";
import { ExclamationCircleIcon, FaceSmileIcon, FaceFrownIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

const DataCards = () => {
  const [data, setData] = useState<TDataCard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAuthorizedRequest<TDataCard[]>("admin/stats");
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
  }, []);

  return (
    <div className="flex gap-5 items-center">
      {data.map((d, i) => (
        <DataCard key={i} {...d} />
      ))}
    </div>
  );
};

export default DataCards;
