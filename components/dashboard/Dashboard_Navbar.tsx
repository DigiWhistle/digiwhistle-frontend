"use client";

import React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
const logosvg = "./assets/navbar/logo.svg";
const bars = "./assets/navbar/bars.svg";
import { UserIcon } from "@heroicons/react/24/outline";
const Dashboard_Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="flex bg-transparent justify-center w-full sticky top-0 z-50 ">
        <div className="relative flex max-w-[1440px] w-full  bg-[#333333] rounded-full mx-3 md:mx-11 my-5  justify-between px-4 py-3">
          <div className="flex items-center ">
            <button className="lg:hidden mr-2" onClick={() => setIsOpen(!isOpen)}>
              <img src={bars} alt="|||" />
            </button>
            <button className="bg-white px-4 py-2 rounded-full">
              <img src={logosvg} alt="DIGI WHISTLE" />
            </button>
          </div>

          <div className=" flex  justify-between items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="flex w-11 h-11 bg-black border-2 border-white rounded-[110px] justify-center items-center" />{" "}
              <div className="flex-col space-y-1">
                <div className="text-body-lg-medium text-white">Ajay Maurya</div>
                <div className="text-body-sm-light text-white">Employee</div>
              </div>
            </div>
            <div className="flex w-11 h-11 bg-sb-gray-555 rounded-[110px] justify-center items-center">
              <UserIcon className="text-[#FFF] w-7 h-7" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Dashboard_Navbar;
