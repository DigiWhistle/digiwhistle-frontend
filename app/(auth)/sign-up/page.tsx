import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserSignUpMain from "@/components/auth/sign-up/user-panel/UserSignUpMain";
const page = () => {
  return <UserSignUpMain />;
  // return (
  //   <div className="flex flex-col space-y-9">
  //     <div className="space-y-5">
  //       <div className="md:text-display-s text-display-xs font-heading">Help us identify you!</div>
  //       <div className="text-body-md-light text-tc-body-grey">
  //         This will help us in curating the best experience for you in the portal.
  //       </div>
  //     </div>
  //     <div className="flex flex-col space-y-5">
  //       <hr className="w-full" />
  //       <Link href={"/sign-up/user"}>
  //         <Button className="w-full">I am Brand/ Influencer/ Agency</Button>
  //       </Link>
  //       <Link href={"/sign-up/admin"}>
  //         <Button className="w-full">I am Admin/ Employee</Button>
  //       </Link>
  //       {/* <AdminSignUp className="flex flex-col w-full h-full p-0 border-0" /> */}
  //     </div>
  //   </div>
  // );
};

export default page;
