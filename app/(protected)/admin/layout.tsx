import React from "react";
import Dashboard_Navbar from "@/components/dashboard/Dashboard_Navbar";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-col h-screen ">
      <Dashboard_Navbar />
      <div className="flex h-full ">
        <div
          className="w-60 h-full py-10 "
          style={{ boxShadow: "inset -1px 0 0 rgba(240, 240, 241, 1)" }}
        >
          <div className="flex justify-between"></div>
        </div>
        <div className="p-7">{children}</div>
      </div>
    </div>
  );
};

export default layout;
