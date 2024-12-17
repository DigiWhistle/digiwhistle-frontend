"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import useScreenSize from "@/hooks/useScreenSize";
import Link from "next/link";

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
    <section className="relative max-w-screen overflow-hidden -mt-32" id="hero">
      <div className="w-full h-full absolute backdrop-filter backdrop-blur-2xl bg-opacity-10 -z-10"></div>
      <div className="absolute -z-20 [background:radial-gradient(circle_at_center,_rgba(var(--first-color-first-gradient),_0.4)_0,_rgba(var(--second-color-first-gradient),_0)_50%)_no-repeat] w-44 h-44 lg:w-96 lg:h-96 top-10 -right-10 animate-first lg:animate-first"></div>
      <div className="absolute -z-20 [background:radial-gradient(circle_at_center,_rgba(var(--first-color-second-gradient),_0.4)_0,_rgba(var(--second-color-second-gradient),_0)_50%)_no-repeat] w-44 h-44 lg:w-96 lg:h-96 top-10 -right-10 animate-second lg:animate-second"></div>
      <div className="absolute -z-20 [background:radial-gradient(circle_at_center,_rgba(var(--first-color-second-gradient),_0.4)_0,_rgba(var(--second-color-second-gradient),_0)_50%)_no-repeat] w-44 h-44 lg:w-96 lg:h-96 top-64 lg:bottom-10 -right-10 animate-sixth lg:animate-third"></div>
      <div className="absolute -z-20 [background:radial-gradient(circle_at_center,_rgba(var(--first-color-first-gradient),_0.4)_0,_rgba(var(--second-color-first-gradient),_0)_50%)_no-repeat] w-44 h-44 lg:w-96 lg:h-96 top-10 -right-10 animate-first lg:animate-fourth"></div>
      <div className="absolute -z-20 [background:radial-gradient(circle_at_center,_rgba(var(--first-color-first-gradient),_0.4)_0,_rgba(var(--second-color-first-gradient),_0)_50%)_no-repeat] w-44 h-44 lg:w-96 lg:h-96 top-64 lg:bottom-10 -right-10 animate-first lg:animate-fifth"></div>
      <div className="absolute -z-20 [background:radial-gradient(circle_at_center,_rgba(var(--first-color-second-gradient),_0.4)_0,_rgba(var(--second-color-second-gradient),_0)_50%)_no-repeat] w-44 h-44 lg:w-96 lg:h-96 top-10 -left-10 animate-first lg:animate-first"></div>
      <div className="absolute -z-20 [background:radial-gradient(circle_at_center,_rgba(var(--first-color-second-gradient),_0.4)_0,_rgba(var(--second-color-second-gradient),_0)_50%)_no-repeat] w-44 h-44 lg:w-96 lg:h-96 top-10 -left-10 animate-second lg:animate-second"></div>
      <div className="absolute -z-20 [background:radial-gradient(circle_at_center,_rgba(var(--first-color-first-gradient),_0.4)_0,_rgba(var(--second-color-first-gradient),_0)_50%)_no-repeat] w-44 h-44 lg:w-96 lg:h-96 top-64 lg:bottom-10 -left-10 animate-sixth lg:animate-third"></div>
      <div className="absolute -z-20 [background:radial-gradient(circle_at_center,_rgba(var(--first-color-first-gradient),_0.4)_0,_rgba(var(--second-color-first-gradient),_0)_50%)_no-repeat] w-44 h-44 lg:w-96 lg:h-96 top-10 -left-10 animate-third lg:animate-fourth"></div>
      <div className="absolute -z-20 [background:radial-gradient(circle_at_center,_rgba(var(--first-color-first-gradient),_0.4)_0,_rgba(var(--second-color-first-gradient),_0)_50%)_no-repeat] w-44 h-44 lg:w-96 lg:h-96 top-64 lg:bottom-10 -left-10 animate-fifth lg:animate-fifth"></div>

      <Image
        src={"/assets/hero-section/instagram.png"}
        width={200}
        height={200}
        className="absolute top-40 lg:top-32 left-1 mix-blend-screen w-14 h-14 md:w-28 md:h-28 lg:w-44 lg:h-44"
        alt="instagram"
      />
      <Image
        src={"/assets/hero-section/thumb.png"}
        width={200}
        height={200}
        className="absolute top-56 md:top-80 lg:top-[350px] left-1 mix-blend-hard-light w-14 h-14 md:w-28 md:h-28 lg:w-48 lg:h-44"
        alt="thumb"
      />
      <Image
        src={"/assets/hero-section/like.png"}
        width={200}
        height={200}
        className="absolute top-40 lg:top-32 right-1 mix-blend-screen w-14 h-14 md:w-28 md:h-28 lg:w-44 lg:h-44"
        alt="like"
      />
      <Image
        src={"/assets/hero-section/youtube.png"}
        width={200}
        height={200}
        className="absolute top-56 md:top-80 lg:top-[350px] right-1 mix-blend-screen w-14 h-14 md:w-28 md:h-28 lg:w-44 lg:h-44"
        alt="youtube"
      />

      <div
        className="flex flex-col gap-12 items-center text-center px-8 md:px-40 lg:px-80 mt-40 z-20"
        data-aos="fade-up"
      >
        <h1
          className={` font-raleway text-display-xs md:text-display-l lg:text-display-xl text-transparent bg-clip-text bg-gradient-2 text-wrap`}
        >
          We Empower Brands & Influencers To Achieve More
        </h1>
        <div className="flex flex-col items-center gap-5">
          <h3
            className={`text-tc-primary-default text-display-xxs md:text-display-small lg:text-display-m`}
          >
            We are Digiwhistle 🎉
          </h3>
          <p className="text-body-md-light text-tc-black-hover">
            Our comprehensive ERP portal offers seamless management of campaigns, influencers, and
            financials, ensuring you stay ahead in the digital marketing landscape.
          </p>
        </div>

        {screenSize.width > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 min-w-48 mb-20">
            {/* <Link href="/sign-up/user?role=brand" className="w-full"> */}
            <Link href="/login" className="w-full">
              <Button size={screenSize.width < 768 ? "sm" : "xl"} className="w-full">
                I AM BRAND
              </Button>
            </Link>
            <Link href="/login" className="w-full">
              <Button size={screenSize.width < 768 ? "sm" : "xl"} className="!px-10">
                I AM INFLUENCER
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
