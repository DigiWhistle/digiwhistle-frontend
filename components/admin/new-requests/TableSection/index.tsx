import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrandTable from "./brand-table";

const TableSection = () => {
  return (
    <Tabs defaultValue="brand" className="w-full">
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex items-center gap-4">
          <div className="relative flex items-center  border border-gray-300 rounded-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </div>
            <Input
              placeholder={"Type brand name here"}
              className={cn("w-80 ps-10 border-none placeholder:text-muted-foreground bg-white ")}
            />
          </div>
          <div className="">filters</div>
        </div>

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

      <div>
        <TabsContent value="influencer">
          {/* <ContactForm userType={PersonType.Influencer} /> */}
        </TabsContent>
        <TabsContent value="brand">
          <BrandTable />
        </TabsContent>
        <TabsContent value="agency">
          {/* <ContactForm userType={PersonType.Brand} /> */}
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default TableSection;
