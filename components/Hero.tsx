"use client";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Raleway } from "next/font/google";
import useScreenSize from "@/hooks/useScreenSize";

const raleway = Raleway({ subsets: ["vietnamese"], weight: "700" });

const firstColorGradientOne = "255, 18, 220";
const secondColorGradientOne = "255, 185, 18";
const firstColorGradientTwo = "148, 3, 253";
const secondColorGradientTwo = "1, 173, 254";
const Hero = () => {
  const screenSize = useScreenSize();

  React.useEffect(() => {
    document.body.style.setProperty("--first-color-first-gradient", firstColorGradientOne);
    document.body.style.setProperty("--second-color-first-gradient", secondColorGradientOne);
    document.body.style.setProperty("--first-color-second-gradient", firstColorGradientTwo);
    document.body.style.setProperty("--second-color-second-gradient", secondColorGradientTwo);
  }, []);

  return (
    <div className="relative max-w-screen  overflow-hidden -mt-16">
      <div className="w-full h-full backdrop-filter backdrop-blur-[500px] bg-opacity-10 "></div>
      <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color-first-gradient),_0.4)_0,_rgba(var(--second-color-first-gradient),_0)_50%)_no-repeat] w-44 h-44 lg:w-96 lg:h-96 top-10 -right-10 animate-first lg:animate-first"></div>
      <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color-second-gradient),_0.4)_0,_rgba(var(--second-color-second-gradient),_0)_50%)_no-repeat] w-44 h-44 lg:w-96 lg:h-96 top-10 -right-10 animate-second lg:animate-second"></div>
      <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color-second-gradient),_0.4)_0,_rgba(var(--second-color-second-gradient),_0)_50%)_no-repeat] w-44 h-44 lg:w-96 lg:h-96 bottom-10 -right-10 animate-sixth lg:animate-third"></div>
      <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color-first-gradient),_0.4)_0,_rgba(var(--second-color-first-gradient),_0)_50%)_no-repeat] w-44 h-44 lg:w-96 lg:h-96 top-10 -right-10 animate-first lg:animate-fourth"></div>
      <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color-first-gradient),_0.4)_0,_rgba(var(--second-color-first-gradient),_0)_50%)_no-repeat] w-44 h-44 lg:w-96 lg:h-96 bottom-10 -right-10 animate-first lg:animate-fifth"></div>
      <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color-second-gradient),_0.4)_0,_rgba(var(--second-color-second-gradient),_0)_50%)_no-repeat] w-44 h-44 lg:w-96 lg:h-96 top-10 -left-10 animate-first lg:animate-first"></div>
      <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color-second-gradient),_0.4)_0,_rgba(var(--second-color-second-gradient),_0)_50%)_no-repeat] w-44 h-44 lg:w-96 lg:h-96 top-10 -left-10 animate-second lg:animate-second"></div>
      <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color-first-gradient),_0.4)_0,_rgba(var(--second-color-first-gradient),_0)_50%)_no-repeat] w-44 h-44 lg:w-96 lg:h-96 bottom-10 -left-10 animate-sixth lg:animate-third"></div>
      <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color-first-gradient),_0.4)_0,_rgba(var(--second-color-first-gradient),_0)_50%)_no-repeat] w-44 h-44 lg:w-96 lg:h-96 top-10 -left-10 animate-third lg:animate-fourth"></div>
      <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color-first-gradient),_0.4)_0,_rgba(var(--second-color-first-gradient),_0)_50%)_no-repeat] w-44 h-44 lg:w-96 lg:h-96 bottom-10 -left-10 animate-fifth lg:animate-fifth"></div>

      <Image
        src={"/assets/hero-section/instagram.png"}
        width={200}
        height={200}
        className="absolute top-10 left-1 mix-blend-screen w-14 h-14 md:w-28 md:h-28 lg:w-48 lg:h-48"
        alt="instagram"
      />
      <Image
        src={"/assets/hero-section/thumb.png"}
        width={200}
        height={200}
        className="absolute bottom-16 lg:bottom-10 left-1 mix-blend-hard-light w-14 h-14 md:w-28 md:h-28 lg:w-48 lg:h-48"
        alt="thumb"
      />
      <Image
        src={"/assets/hero-section/like.png"}
        width={200}
        height={200}
        className="absolute top-10 right-1 mix-blend-screen  w-14 h-14 md:w-28 md:h-28 lg:w-48 lg:h-48"
        alt="like"
      />
      <Image
        src={"/assets/hero-section/youtube.png"}
        width={200}
        height={200}
        className="absolute bottom-16 lg:bottom-10 right-1 mix-blend-screen w-14 h-14 md:w-28 md:h-28 lg:w-48 lg:h-48"
        alt="youtube"
      />

      <div className="flex flex-col gap-12 items-center text-center px-5 md:px-40 lg:px-80 mt-14">
        <h1
          className={`${raleway.className} text-display-xs md:text-display-l lg:text-display-xl text-transparent bg-clip-text bg-gradient-2`}
        >
          We Empower Brands & Influencers To Achieve More
        </h1>
        <div className="flex flex-col items-center gap-5">
          <h3
            className={`${raleway.className} text-tc-primary-default text-display-xxs md:text-display-small lg:text-display-m`}
          >
            We are Digiwhistle 🎉
          </h3>
          <p className="text-body-md-light text-tc-black-hover">
            Our comprehensive ERP portal offers seamless management of campaigns, influencers, and
            financials, ensuring you stay ahead in the digital marketing landscape.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 min-w-48">
          <Button size={screenSize.width < 768 ? "sm" : "xl"} className="text-body-lg-semibold">
            I AM BRAND
          </Button>
          <Button size={screenSize.width < 768 ? "sm" : "xl"}>I AM INFLUENCER</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
