"use client";

import React from "react";
import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
const logosvg = "./assets/navbar/logo.svg";
const bars = "./assets/navbar/bars.svg";
const phone = "./assets/navbar/phone.svg";
const logout = "./assets/navbar/logout.svg";
const navItems = [
  { label: "Offerings", url: "#offerings", variant: "tertiary" },
  { label: "Testimonials", url: "#testimonials", variant: "tertiary" },
  { label: "Star Influencers", url: "#star-influencers", variant: "tertiary" },
  { label: "About Us", url: "#about-us", variant: "tertiary" },
];
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState("Offerings");
  const handleScroll = (url: string, label: string) => {
    setSelectedButton(label);
    const element = document.querySelector(url);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="flex  bg-transparent justify-center w-full sticky top-0 z-50 ">
        <div className="flex max-w-[1440px] w-full  bg-[#333333] rounded-full mx-3 md:mx-11 my-5  justify-between px-4 py-3">
          <div className="flex items-center ">
            <button className="lg:hidden mr-2" onClick={() => setIsOpen(!isOpen)}>
              <img src={bars} alt="|||" />
            </button>
            <Button className="bg-white">
              <img src={logosvg} alt="DIGI WHISTLE" />
            </Button>
            <div className="hidden  lg:flex items-center space-x-4 ml-4">
              {navItems.map(item => (
                <button
                  key={item.label}
                  className={`px-5 py-3 text-white rounded-full  ${selectedButton === item.label ? "bg-dark-black-651" : "bg-transparent"}`}
                  onClick={() => handleScroll(item.url, item.label)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="hidden md:flex justify-between items-center space-x-3">
            <Button variant={"secondary"}>Contact Us</Button>
            <Button>Login/ Signup</Button>
          </div>
          <div className=" flex  md:hidden justify-between items-center space-x-3">
            <Button
              className="flex items-center justify-center h-12 w-12 p-0"
              variant={"secondary"}
            >
              <Image className="h-5 w-5" src={phone} alt="C" height={20} width={20} />
            </Button>
            <Button className=" flex items-center justify-center h-12 w-12 ">
              <Image className="h-5 w-5" src={logout} alt="L" height={20} width={20} />
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
