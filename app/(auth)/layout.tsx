import LeftContainer from "@/components/auth/left-panel/LeftContainer";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const logosvg = "/assets/navbar/logo.svg";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  // const user = useSelector(User);
  // const role = useSelector(UserRole);
  // const authUser = useSelector(AuthUser);
  // const router = useRouter();

  // if (user) {
  //   if (role === "admin" || role === "employee") {
  //     router.push(ADMIN_DEFAULT_ROUTE);
  //   } else if (role === "influencer" || role === "brand" || role === "agency") {
  //     router.push(USER_DEFAULT_ROUTE);
  //   }
  // }

  // if (authUser) {
  //   if (authUser.role === "admin" || authUser.role === "employee") {
  //     router.push(ADMIN_DEFAULT_ROUTE);
  //   } else if (
  //     authUser.role === "influencer" ||
  //     authUser.role === "brand" ||
  //     authUser.role === "agency"
  //   ) {
  //     router.push(USER_DEFAULT_ROUTE);
  //   }
  // }

  return (
    <div className=" min-h-screen flex   lg:flex-row flex-col justify-center lg:items-stretch md:items-center lg:overflow-hidden  ">
      <LeftContainer />
      <div className="flex flex-col flex-grow lg:w-full md:w-[768px]  h-full order-2 gap-9 md:px-14 md:py-14  p-6  ">
        <Link href={"/"}>
          <Image src={logosvg} alt="image" width={160} height={30} />
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
