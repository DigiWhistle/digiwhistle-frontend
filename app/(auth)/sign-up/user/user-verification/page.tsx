"use client";
import React from "react";
import { useSelector } from "react-redux";
import { User } from "@/store/UserSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import InfluencerSignUp from "@/components/auth/influencer/InfluencerSignUp";
import AgencySignUp from "@/components/auth/Agency/AgencySignUp";
import BrandSignUp from "@/components/auth/Brand/BrandSignUp";
const Verification = () => {
  const user_info = useSelector(User);
  const router = useRouter();
  let role: string | null = null;
  if (user_info === null) {
    router.push("/login");
  } else if (user_info.isverified) {
    toast("you will get redirected to dashboard");
    console.log("redirect to dashboard");
  } else if (user_info.onboarded) {
    toast("please be patient to get verified soon");
  } else {
    role = user_info.role;
  }

  return (
    <div>
      {role === "influencer" ? <InfluencerSignUp /> : <></>}
      {role === "agency" ? <AgencySignUp /> : <></>}
      {role === "brand" ? <BrandSignUp /> : <></>}
    </div>
  );
};

export default Verification;
