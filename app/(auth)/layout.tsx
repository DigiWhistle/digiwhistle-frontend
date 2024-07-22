import LeftContainer from "@/components/auth/left-panel/LeftContainer";
import Image from "next/image";
import React from "react";

const logosvg = "./assets/navbar/logo.svg";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" lg:h-screen flex lg:flex-row flex-col justify-center  lg:overflow-hidden ">
      <LeftContainer />
      <div className="flex flex-col flex-grow w-full h-full order-2 gap-6 md:px-14 md:py-14 p-6 ">
        <Image src={logosvg} alt="image" width={160} height={30} />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
