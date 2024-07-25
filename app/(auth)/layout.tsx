import LeftContainer from "@/components/auth/left-panel/LeftContainer";
import { AuthUser } from "@/store/AuthUserSlice";
import { User, UserRole } from "@/store/UserSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const logosvg = "/assets/navbar/logo.svg";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  // const user = useSelector(User);
  // const role = useSelector(UserRole);
  // const authUser = useSelector(AuthUser);
  // const router = useRouter();

  // if (user) {
  //   if (role === "admin" || role === "employee") {
  //     router.push("/admin/dashboard");
  //   } else if (role === "influencer" || role === "brand" || role === "agency") {
  //     router.push("/user/dashboard");
  //   }
  // }

  // if (authUser) {
  //   if (authUser.role === "admin" || authUser.role === "employee") {
  //     router.push("/admin/dashboard");
  //   } else if (
  //     authUser.role === "influencer" ||
  //     authUser.role === "brand" ||
  //     authUser.role === "agency"
  //   ) {
  //     router.push("/user/dashboard");
  //   }
  // }

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
