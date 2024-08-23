"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { User, UserRole } from "@/store/UserSlice";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
const logosvg = "/assets/navbar/logo.svg";
const bars = "/assets/navbar/bars.svg";
interface AdminNavbarinterface {
  drawerView: boolean;
  setDrawerView: any;
}
const AdminNavbar = ({ drawerView, setDrawerView }: AdminNavbarinterface) => {
  const userInfo = useSelector(User);
  return (
    <>
      <nav className="flex bg-transparent justify-center w-full sticky top-0 z-50 ">
        <div className="relative flex max-w-[1440px] w-full  bg-[#333333] rounded-full mx-3 md:mx-11 my-5  justify-between px-4 py-3">
          <div className="flex items-center ">
            <button className="lg:hidden mr-2" onClick={() => setDrawerView(!drawerView)}>
              <img src={bars} alt="|||" />
            </button>
            <button className="bg-white px-4 py-2 rounded-full">
              <img src={logosvg} alt="DIGI WHISTLE" />
            </button>
          </div>

          <div className=" flex  justify-between items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Avatar className=" flex border-2  border-white w-11 h-11 bg-slate-100 rounded-full ">
                {userInfo?.profile?.profilePic ? (
                  <AvatarImage
                    className="rounded-full w-full h-full shado object-cover"
                    src={userInfo?.profile?.profilePic}
                  />
                ) : (
                  <div className="flex w-full h-full items-center justify-center">BV</div>
                )}
              </Avatar>

              <div className="flex-col space-y-1">
                <div className="text-body-lg-medium text-white">
                  {userInfo?.profile && "firstName" in userInfo.profile
                    ? userInfo.profile.firstName
                    : ""}
                </div>
                <div className="text-body-sm-light text-white">{userInfo?.role}</div>
              </div>
            </div>
            <Link
              href={"/admin/profile/1"}
              className="flex w-11 h-11 bg-sb-gray-555 rounded-[110px] justify-center items-center"
            >
              <UserIcon className="text-[#FFF] w-7 h-7" />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
