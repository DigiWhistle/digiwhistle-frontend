import PanelSignUp from "@/components/auth/admin-panel/SignUp";
import React from "react";
import LeftContainer from "@/components/ui/login_signup_svg/LeftContainer";
const logosvg = "./assets/navbar/logo.svg";
import Image from "next/image";
const page = () => {
  return (
    <div className="flex lg:flex-row flex-col justify-center  lg:overflow-hidden  ">
      <LeftContainer />
      <div className="flex flex-col flex-grow w-full h-full order-2 gap-6 md:px-14 md:py-14 p-6 ">
        <Image src={logosvg} alt="image" width={160} height={30} />
        <PanelSignUp className="flex flex-col w-full h-full p-0 border-0" />
      </div>
    </div>
  );
};

export default page;
