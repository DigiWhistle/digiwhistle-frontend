"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrandTable from "./brand-table";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import BrandFilters from "./brand-table/BrandFilters";
import AgencyFilters from "./agency-table/AgencyFilters";

const TableSection = () => {
  const router = useRouter();
  return (
    <Tabs
      defaultValue="brand"
      className="w-full"
      onValueChange={value => router.push(`/admin/new-requests/${value}/1`)}
    >
      <div className="w-full flex items-center justify-between gap-2">
        <TabsContent value="influencer"></TabsContent>
        <TabsContent value="brand">
          <BrandFilters />
        </TabsContent>
        <TabsContent value="agency">
          <AgencyFilters />
        </TabsContent>

        <TabsList className="text-body-md-medium p-1">
          <TabsTrigger value="influencer" className="py-2 px-5">
            Influencer
          </TabsTrigger>
          <TabsTrigger value="brand" className="py-2 px-5">
            Brand
          </TabsTrigger>
          <TabsTrigger value="agency" className="py-2 px-5">
            Agency
          </TabsTrigger>
        </TabsList>
      </div>

      <div></div>
    </Tabs>
  );
};

export default TableSection;
