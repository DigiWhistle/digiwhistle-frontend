"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  UserIcon,
  CursorArrowRaysIcon,
  InformationCircleIcon,
  ArrowRightEndOnRectangleIcon,
  QuestionMarkCircleIcon,
  IdentificationIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { clearUser } from "@/store/UserSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import CustomDialog from "@/components/ui/customAlertDialog/CustomDialog";
import SignOut from "@/components/brand-report/popupForms/SignOut";
const SidebarLinks = [
  {
    icon: <UserIcon className=" text-tc-ic-black-default" />,
    link: "/admin/influencers",
    linkText: "Influencers",
    keyword: "influencers",
  },

  {
    icon: <CursorArrowRaysIcon className="text-tc-ic-black-default" />,
    link: "/admin/new-requests/brand/1",
    linkText: "New requests",
    keyword: "new-requests",
  },
  {
    icon: <QuestionMarkCircleIcon className="text-tc-ic-black-default" />,
    link: "/admin/queries/1",
    linkText: "Queries",
    keyword: "queries",
  },
  {
    icon: <IdentificationIcon className="text-tc-ic-black-default" />,
    link: "/admin/queries/1",
    linkText: "Profile control",
    keyword: "profile_influencer",
  },
  {
    icon: <MagnifyingGlassIcon className="text-tc-ic-black-default" />,
    link: "/admin/queries/1",
    linkText: "Explore influencers",
    keyword: "explore",
  },
];
const HelpCenterLink = {
  icon: <InformationCircleIcon className="text-tc-ic-black-default" />,
  link: "/admin/help-center",
  linkText: "Help center",
};

const Sidebar = ({ className, drawerView }: { className?: string; drawerView: boolean }) => {
  const [signoutcookie, signoutcookieSetter] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();

  const handleLogout = () => {
    deleteCookie("role");
    deleteCookie("token");
    dispatch(clearUser());
    router.push("/login");
  };
  useEffect(() => {
    const cookie = getCookie("Signout");
    if (cookie) {
      signoutcookieSetter(true);
    }
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col lg:w-72 md:w-auto sm:w-60 z-10 absolute lg:relative transition-all duration-300 ease-in-out bg-white h-full  pt-3 pb-3  ",
        className,
      )}
      style={{ boxShadow: "inset -1px 0 0 rgba(240, 240, 241, 1)" }}
    >
      <div className="flex  flex-col w-full h-full  justify-between ">
        <div className="flex-col  w-full ">
          {SidebarLinks.map(item => (
            <Link
              key={item.linkText}
              href={item.link}
              className={cn(
                "flex space-x-5 px-5 py-3 hover:bg-[#FCF8E9]",
                pathname.includes(item.keyword) ? "bg-[#FCF8E9] border-r-4 border-[#8A6D31]" : "",
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

        <div className="flex-col border-t-[1px] pt-2  ">
          {signoutcookie ? (
            <div
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
              className="flex space-x-5 px-5 py-3 hover:bg-[#FCF8E9]"
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
          ) : (
            <CustomDialog
              headerTitle="Sign out"
              headerDescription="Are you sure you want to signout ?"
              className="w-[400px]"
              triggerElement={
                <div
                  style={{ cursor: "pointer" }}
                  className="flex space-x-5 px-5 py-3 hover:bg-[#FCF8E9]"
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
              }
            >
              <SignOut />
            </CustomDialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
