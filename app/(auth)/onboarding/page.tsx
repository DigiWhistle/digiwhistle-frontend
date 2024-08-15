"use client";
import React from "react";
import { useSelector } from "react-redux";
import { User } from "@/store/UserSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import InfluencerSignUp from "@/components/auth/sign-up/user-panel/InfluencerSignUp";
import AgencySignUp from "@/components/auth/sign-up/user-panel/AgencySignUp";
import BrandSignUp from "@/components/auth/sign-up/user-panel/BrandSignUp";
import { ADMIN_DEFAULT_ROUTE, USER_DEFAULT_ROUTE } from "@/lib/constants";
const OnBoarding = () => {
  const user = useSelector(User);
  const router = useRouter();

  if (user === null) {
    toast.info("Please login first");
    router.push("/login");
    return null;
  } else if (user.isOnBoarded && user.isVerified) {
    if (user.role === "influencer" || user.role === "agency" || user.role === "brand") {
      router.push(USER_DEFAULT_ROUTE);
    } else if (user.role === "admin" || user.role === "employee") {
      router.push(ADMIN_DEFAULT_ROUTE);
    }
    return null;
  } else if (user.isOnBoarded) {
    toast.info("Onboarding already done! Please wait for admin approval");
    router.push("/login");
    return null;
  }

  return (
    <div>
      {user.role === "influencer" ? (
        <InfluencerSignUp />
      ) : user.role === "agency" ? (
        <AgencySignUp />
      ) : user.role === "brand" ? (
        <BrandSignUp />
      ) : (
        <div className="text-center text-xl">Role not found</div>
      )}
    </div>
  );
};

export default OnBoarding;
