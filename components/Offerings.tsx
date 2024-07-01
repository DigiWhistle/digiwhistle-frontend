"use client";
import { cn } from "@/lib/utils";
import { BoltIcon, StarIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import CountUp from "react-countup";

const OfferingsArray = [
  {
    name: "Influencer Marketing",
    image: "/assets/Offerings/influencer-marketing-desktop.png",
    icon: SpeakerWaveIcon,
  },
  {
    name: "Talent Management",
    image: "/assets/Offerings/talent-management-desktop.png",
    icon: StarIcon,
  },
  {
    name: "Public Relations",
    image: "/assets/Offerings/public-relations-desktop.png",
    icon: HandThumbUpIcon,
  },
  {
    name: "Performance Marketing",
    image: "/assets/Offerings/performance-marketing-desktop.png",
    icon: BoltIcon,
  },
];

const Offerings = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const cycleImage = useCallback(() => {
    if (!isHovering) {
      setSelectedIndex(prevIndex => (prevIndex + 1) % OfferingsArray.length);
    }
  }, [isHovering]);

  useEffect(() => {
    const interval = setInterval(cycleImage, 4000);

    return () => clearInterval(interval);
  }, [cycleImage]);

  return (
    <div className="w-screen my-16 md:my-32 lg:my-40 overflow-hidden">
      <div className="flex flex-col items-center gap-5">
        <h3 className="text-display-xxs md:text-display-xs lg:text-display-s">Our Offerings</h3>
        <div className="h-1 w-20 bg-gradient-2"></div>
      </div>
      <div className="mt-12 md:mt-14 lg:mt-20 flex flex-col gap-12 md:gap-16 lg:gap-20 items-center text-body-md-medium">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {OfferingsArray.map((offerings, index) => (
            <button
              className={cn(
                "flex gap-4 items-center justify-center border rounded-full px-4 py-2 transition-colors duration-200 ease-in-out hover:border-brown-641 hover:bg-focus-yellow-shadow",
                index === selectedIndex
                  ? "bg-focus-yellow-shadow border-brown-641"
                  : "bg-transparent",
              )}
              onMouseEnter={() => {
                setIsHovering(true);
                setSelectedIndex(index);
              }}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => setSelectedIndex(index)}
              key={index}
            >
              {<offerings.icon className="w-3.5 h-3.5" />}
              {offerings.name}
            </button>
          ))}
        </div>
        <div className="relative w-full flex flex-col items-center">
          <div className="absolute h-32 w-32 md:h-44  md:w-44 bg-[#FFEEA3] rounded-full -z-10 top-10 transform -translate-x-20 lg:-translate-x-32  "></div>
          <div className="absolute  h-32 w-32 md:h-44 md:w-44 bg-[#F4BBEA] rounded-full -z-10 bottom-10  transform translate-x-20 lg:translate-x-32"></div>
          <div className="relative flex flex-col items-center w-full h-full  bg-clip-content backdrop-filter backdrop-blur-2xl bg-opacity-100 ">
            <Image
              src={OfferingsArray[selectedIndex].image}
              alt={OfferingsArray[selectedIndex].name}
              className="w-56 md:w-64 lg:w-72 h-auto object-cover rounded z-20"
              width={80000}
              height={20000}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            />
          </div>
        </div>
        <CountingCards />
      </div>
    </div>
  );
};

export default Offerings;

export const CountingCards = () => (
  <div className=" flex items-center justify-center gap-3 md:gap-4 lg:gap-8">
    {[
      { count: 200, name: "Brands" },
      { count: 1000, name: "Campaigns" },
      { count: 300, name: "Creators" },
    ].map((data, index) => (
      <div
        key={index}
        className="py-4 px-6 md:px-8 lg:px-16 text-[#8A6D31] bg-[#FCF8E9] rounded-full text-center"
      >
        <CountUp
          end={data.count}
          suffix="+"
          className="font-heading text-display-xxs md:text-display-xs lg:text-display-l"
        />
        <p className="text-body-sm-medium md:text-body-lg-medium lg:text-body-xl-medium">
          {data.name}
        </p>
      </div>
    ))}
  </div>
);
