import PanelSignUp from "@/components/auth/admin-panel/SignUp";
import React from "react";

const page = () => {
  return (
    <div className="flex gap-6 p-12">
      <div className="w-3/5">Sign Up Page</div>
      <PanelSignUp className="w-2/5" />
    </div>
  );
};

export default page;
