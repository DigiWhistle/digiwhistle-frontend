import LeftContainer from "@/components/auth/left-panel/LeftContainer";
import Image from "next/image";
import React from "react";

const logosvg = "/assets/navbar/logo.svg";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" min-h-screen flex   lg:flex-row flex-col justify-center lg:items-stretch md:items-center lg:overflow-hidden  ">
      <LeftContainer />
      <div className="flex flex-col flex-grow lg:w-full md:w-[768px]  h-full order-2 gap-9 md:px-14 md:py-14  p-6  ">
        <Image src={logosvg} alt="image" width={160} height={30} />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
