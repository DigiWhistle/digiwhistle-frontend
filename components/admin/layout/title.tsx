"use client";
import { useAppSelector } from "@/lib/config/store";
import { User } from "@/store/UserSlice";
import React from "react";

const AdminTitle = ({ title, description }: { title?: string; description?: string }) => {
  const user = useAppSelector(User);
  return (
    <div className="space-y-2">
      <h3 className="text-display-xxs ">{title || `Welcome ${user?.profile?.firstName} 👋`}</h3>
      <div className="text-body-md-light text-tc-body-grey">{description}</div>
    </div>
  );
};

export default AdminTitle;
