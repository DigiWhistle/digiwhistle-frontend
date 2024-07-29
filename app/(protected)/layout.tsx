import React from "react";
import UserProvider from "./UserProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default Layout;
