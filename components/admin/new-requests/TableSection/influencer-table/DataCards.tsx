"use client";
import { DataCard } from "@/components/ui/DataCard";
import { getAuthorizedRequest } from "@/lib/config/axios";
import { TDataCard } from "@/types/admin/new-requests";
import {
  ExclamationCircleIcon,
  FaceSmileIcon,
  FaceFrownIcon,
  UsersIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

const DataCards = () => {
  const [data, setData] = useState<TDataCard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAuthorizedRequest<TDataCard[]>("influencer/stats");
      if (response.data) {
        const iconMap: { [key: string]: typeof UsersIcon } = {
          UsersIcon,
          StarIcon,
        };

        const dataWithIcons = response.data.map(item => ({
          ...item,
          iconName: iconMap[item.iconName as string] ?? UsersIcon,
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
