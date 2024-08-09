import QueriesFilters from "@/components/admin/queries/QueriesFilters";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h3 className="text-display-xxs mb-10">User queries 🧐</h3>
      <QueriesFilters />
      {children}
    </div>
  );
};

export default layout;
