import React from "react";
import ProfileControlFilters from "@/components/admin/profile-control/ProfileFilters";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h3 className="text-display-xxs mb-10">Member profile control</h3>
      <ProfileControlFilters />
      {children}
    </div>
  );
};

export default layout;
