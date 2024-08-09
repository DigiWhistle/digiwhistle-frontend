"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  UserIcon,
  CursorArrowRaysIcon,
  InformationCircleIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { deleteCookie, setCookie } from "cookies-next";
import { clearUser } from "@/store/UserSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
const SidebarLinks = [
  {
    icon: <UserIcon className=" text-tc-ic-black-default" />,
    link: "/admin/influencers",
    linkText: "Influencers",
  },

  {
    icon: <CursorArrowRaysIcon className="text-tc-ic-black-default" />,
    link: "/admin/new-requests/brand/1",
    linkText: "New requests",
  },
];
const HelpCenterLink = {
  icon: <InformationCircleIcon className="text-tc-ic-black-default" />,
  link: "/admin/help-center",
  linkText: "Help center",
};

const Sidebar = ({ className, drawerView }: { className?: string; drawerView: boolean }) => {
  console.log(drawerView);
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const handleLogout = () => {
    deleteCookie("role");
    deleteCookie("token");
    dispatch(clearUser());
    router.push("/login");
  };
  return (
    <div
      className={cn(
        " flex flex-col lg:w-60 md:w-auto sm:w-60  sm:z-10 absolute lg:relative transition-all duration-300 ease-in-out bg-white h-full  py-10  ",
        className,
      )}
      style={{ boxShadow: "inset -1px 0 0 rgba(240, 240, 241, 1)" }}
    >
      <div className="flex  flex-col w-full h-full sm:max-h-[70vh] justify-between ">
        <div className="flex-col  w-full ">
          {SidebarLinks.map(item => (
            <Link
              key={item.linkText}
              href={item.link}
              className={cn(
                "flex space-x-5 px-5 py-3 hover:bg-[#FCF8E9]",
                pathname === item.link ? "bg-[#FCF8E9] border-r-4 border-[#8A6D31]" : "",
              )}
            >
              <div className="flex justify-center items-center w-6 h-6 ">{item.icon}</div>
              <div
                className={cn(
                  "lg:flex text-body-md-light text-tc-primary-default",
                  drawerView ? "" : "md:hidden",
                )}
              >
                {item.linkText}
              </div>
            </Link>
          ))}
        </div>

        <div className="flex-col ">
          <Link
            href={HelpCenterLink.link}
            className={cn(
              "flex space-x-5 px-5 py-3 hover:bg-[#FCF8E9]",
              pathname === HelpCenterLink.link ? "bg-[#FCF8E9] border-r-4 border-[#8A6D31]" : "",
            )}
          >
            <div className="flex justify-center items-center w-6 h-6">{HelpCenterLink.icon}</div>
            <div
              className={cn(
                "lg:flex  text-body-md-light text-tc-primary-default",
                drawerView ? "" : "md:hidden",
              )}
            >
              {HelpCenterLink.linkText}
            </div>
          </Link>
          <div
            style={{ cursor: "pointer" }}
            className="flex space-x-5 px-5 py-3 hover:bg-[#FCF8E9]"
            onClick={handleLogout}
          >
            <div className="flex justify-center items-center w-6 h-6">
              <ArrowRightEndOnRectangleIcon className="text-tc-ic-black-default" />
            </div>
            <div
              className={cn(
                "lg:flex  text-body-md-light text-tc-primary-default",
                drawerView ? "" : "md:hidden",
              )}
            >
              Signout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
