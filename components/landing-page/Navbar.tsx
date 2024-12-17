"use client";

import React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
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
  const [selectedButton, setSelectedButton] = useState("");
  const isClient = typeof window === "object";

  isClient &&
    (window.onscroll = () => {
      let current: string | null = "";
      const sections = document.querySelectorAll("section");

      sections.forEach(section => {
        const scrollPosition = window.scrollY || window.pageYOffset;
        const sectionTop = section.offsetTop;
        if (scrollPosition >= sectionTop - 500) {
          current = section.getAttribute("id");
        }
      });

      setSelectedButton("#" + current);
    });

  const handleScroll = (url: string) => {
    setSelectedButton(url);
    const element = document.querySelector(url);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="flex bg-transparent justify-center w-full sticky top-0 z-50 ">
        <div className="relative flex max-w-[1440px] w-full  bg-[#333333] rounded-full mx-3 md:mx-11 my-5  justify-between px-4 py-3">
          <div className="flex items-center ">
            <button className="lg:hidden mr-2" onClick={() => setIsOpen(!isOpen)}>
              <img src={bars} alt="|||" />
            </button>
            <button
              className="bg-white px-4 py-2 rounded-full"
              onClick={() => handleScroll("#hero")}
            >
              <img src={logosvg} alt="DIGI WHISTLE" />
            </button>
            <div className="hidden  lg:flex items-center space-x-4 ml-4">
              {navItems.map(item => (
                <button
                  key={item.label}
                  className={`px-5 py-3 text-white rounded-full  ${selectedButton === item.url ? "bg-dark-black-651" : "bg-transparent"}`}
                  onClick={() => handleScroll(item.url)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="hidden md:flex justify-between items-center space-x-3">
            <Button variant={"secondary-dark"} onClick={() => handleScroll("#contact-us")}>
              Contact Us
            </Button>
            <Link href={"/login"}>
              <Button>Login/ Signup</Button>
            </Link>
          </div>
          <div className=" flex  md:hidden justify-between items-center space-x-3">
            <Button
              className="flex items-center justify-center h-12 w-12 p-0"
              variant={"secondary"}
              onClick={() => handleScroll("#contact-us")}
            >
              <Image className="h-5 w-5" src={phone} alt="C" height={20} width={20} />
            </Button>
            <Button className=" flex items-center justify-center h-12 w-12 ">
              <Image className="h-5 w-5" src={logout} alt="L" height={20} width={20} />
            </Button>
          </div>

          {isOpen && (
            <div
              className="absolute top-0 left-0 w-full h-content rounded-3xl rounded-t-[36px] bg-white flex flex-col -z-10 pt-20 pb-5"
              onClick={() => setIsOpen(!isOpen)}
              data-aos="fade-down"
            >
              {navItems.map(item => (
                <button
                  key={item.label}
                  className={`px-5 py-3 rounded-full hover:opacity-70 ${selectedButton === item.url ? "bg-yellow-101 " : "bg-transparent"}`}
                  onClick={() => handleScroll(item.url)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
