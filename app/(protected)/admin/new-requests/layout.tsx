import TableSection from "@/components/admin/new-requests/TableSection";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      New Requests
      <TableSection />
      {children}
    </div>
  );
};

export default Layout;
