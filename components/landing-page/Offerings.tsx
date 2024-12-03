"use client";
import { cn } from "@/lib/utils";
import { BoltIcon, StarIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Title from "../ui/Title";

const OfferingsArray = [
  {
    name: "Influencer Marketing",
    image: "/assets/Offerings/influencer-marketing-desktop.svg",
    icon: SpeakerWaveIcon,
    description: [
      "Data-Driven Influencer Campaigns",
      "Authentic and Organic Brand Integration",
      "Full-Service Campaign Management",
      "Specialised in Niche Audiences",
      "Transparent Reporting and ROI Focus",
    ],
  },
  {
    name: "Talent Management",
    image: "/assets/Offerings/talent-management-desktop.svg",
    icon: StarIcon,
    description: [
      "End to End Solution",
      "Data-Driven Decision Making",
      "Proven Success and Client Impact",
      "Industry Expertise & Network",
    ],
  },
  {
    name: "Public Relations",
    image: "/assets/Offerings/public-relations-desktop.svg",
    icon: HandThumbUpIcon,
    description: [
      "Strategic, Results-Driven PR",
      "Strong Media Relationships & Exclusive Access",
      "Creative & Compelling Storytelling",
      "Personalised, Client-Centric Approach",
      "Comprehensive Brand Building & Positioning",
    ],
  },
  {
    name: "Performance Marketing",
    image: "/assets/Offerings/performance-marketing-desktop.svg",
    icon: BoltIcon,
    description: [
      "Omnichannel Performance Marketing",
      "Cost-Efficient, Results-Oriented Approach",
      "Scalable Campaigns for Growing Businesses",
      "Data-Driven Campaigns with Measurable ROI",
    ],
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
    <section className="w-full my-16 md:my-32 lg:my-40 overflow-hidden" id="offerings">
      <Title title="Offerings" />
      <div className="mt-12 md:mt-14 lg:mt-20 flex flex-col gap-12 md:gap-16 lg:gap-20 items-center text-body-md-medium">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-aos="fade-up">
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
        <div className="relative w-full flex flex-col items-center" data-aos="fade-up">
          <div className="absolute h-32 w-32 md:h-44  md:w-44 bg-[#FFEEA3] rounded-full -z-10 top-14 transform -translate-x-20 lg:-translate-x-32  "></div>
          <div className="absolute  h-32 w-32 md:h-44 md:w-44 bg-[#F4BBEA] rounded-full -z-10 bottom-14  transform translate-x-20 lg:translate-x-32"></div>
          <div className="relative flex flex-col gap-5 items-center w-full h-full  bg-clip-content backdrop-filter backdrop-blur-2xl bg-opacity-100 ">
            <Image
              src={OfferingsArray[selectedIndex].image}
              alt={OfferingsArray[selectedIndex].name}
              className="w-56 md:w-64 lg:w-72 h-auto object-cover rounded z-20"
              width={80000}
              height={20000}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            />
            <div className="max-w-2xl flex flex-wrap gap-4 items-center justify-center">
              {OfferingsArray[selectedIndex].description.map((text, index) => (
                <p
                  key={index}
                  className="border-brown-641 bg-focus-yellow-shadow border p-2 px-4 rounded-full"
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
        <CountingCards section={"offerings"} />
      </div>
    </section>
  );
};

export default Offerings;

export const CountingCards = ({ section }: { section: string }) => {
  const [hasCountStarted, setHasCountStarted] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && !hasCountStarted) {
      setHasCountStarted(true);
    }
  }, [inView, hasCountStarted]);
  return (
    <div
      ref={ref}
      className={cn(
        ` flex items-center justify-center gap-3 md:gap-4  lg:gap-8`,
        section === "about" ? " w-full " : "",
      )}
    >
      {[
        { count: 200, name: "Brands" },
        { count: 1000, name: "Campaigns" },
        { count: 300, name: "Creators" },
      ].map((data, index) => (
        <div
          key={index}
          className={cn(
            `flex flex-col items-center justify-center py-4 px-6 md:px-8 lg:px-16 text-[#8A6D31] bg-[#FCF8E9] md:rounded-full rounded-[28px]  text-center`,
            section === "about"
              ? "lg:px-1.5 lg:py-4 lg:gap-3 lg:w-[240px]  md:w-[180px]   px-2 md:px-1 md:py-3 md:gap-2"
              : "",
          )}
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
          {hasCountStarted && (
            <CountUp
              end={data.count}
              suffix="+"
              className={cn(
                `font-heading text-display-xxs md:text-display-xs lg:text-display-l`,
                section === "about"
                  ? "md:font-sans  lg:text-display-l-trial md:leading-5 md:font-bold md:text-[30px]"
                  : "",
              )}
            />
          )}
          <p
            className={cn(
              `text-body-sm-medium md:text-body-lg-medium lg:text-body-xl-medium`,
              section === "about" ? "lg:leading-5 md:leading-4" : "",
            )}
          >
            {data.name}
          </p>
        </div>
      ))}
    </div>
  );
};
