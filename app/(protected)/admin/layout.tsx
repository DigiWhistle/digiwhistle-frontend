"use client";

import AdminNavbar from "@/components/admin/layout/AdminNavbar";
import React, { useState } from "react";
import Sidebar from "@/components/admin/layout/Sidebar";
import { cn } from "@/lib/utils";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [drawerView, setDrawerView] = useState(false);

  return (
    <div className="flex flex-col  h-[100vh]   ">
      <AdminNavbar drawerView={drawerView} setDrawerView={setDrawerView} />
      <div className="flex relative h-full overflow-hidden ">
        <Sidebar
          drawerView={drawerView}
          className={drawerView ? "-left-0" : "-left-60 md:-left-0 "}
        />

        <div
          onClick={() => {
            setDrawerView(false);
          }}
          className=" w-full h-full p-7 mt-1 lg:p-7 md:py-7 md:pr-7 md:pl-24 overflow-y-auto "
          style={{ scrollbarGutter: "stable" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
