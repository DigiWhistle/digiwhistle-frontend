"use client";
import React from "react";
import { useSelector } from "react-redux";
import { User } from "@/store/UserSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import InfluencerSignUp from "@/components/auth/sign-up/user-panel/InfluencerSignUp";
import AgencySignUp from "@/components/auth/sign-up/user-panel/AgencySignUp";
import BrandSignUp from "@/components/auth/sign-up/user-panel/BrandSignUp";
const Verification = () => {
  const user = useSelector(User);
  const router = useRouter();
  let role: string | null = null;
  if (user === null) {
    toast.info("Please login first");
    router.push("/login");
  } else if (user.isOnBoarded) {
    toast.info("Please wait for admin approval");
    router.push("/login");
  } else if (user.isVerified) {
    toast("you will get redirected to dashboard");
  } else {
    role = user.role;
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
