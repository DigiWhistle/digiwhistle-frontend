"use client";
import React from "react";
import Marquee from "react-fast-marquee";
import Title from "../ui/Title";
import Image from "next/image";
import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import { useEffect } from "react";
import { LandingInfluencerData } from "./Influencers";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const head_buttons = ["Influencers", "Brands"];
const dummy_testimonials = [
  {
    testimonial: "DW helped me scale up my IG followers significantly.",
    name: "CS Ujjawal Pahwa",
    post: "Finance Influencer",
    url: "/assets/testimonials/Ujjwal.webp",
  },
  {
    testimonial: "Great experience with DW; supportive and transparent team.",
    name: "CA Anamika Rana",
    post: "Finance Influencer",
    url: "/assets/testimonials/anamika_rana.png",
  },
  {
    testimonial: "Finglory simplifies finance concepts creatively and engagingly.",
    name: "Nidhi Nagar",
    post: "Finance Influencer",
    url: "/assets/testimonials/Nidhi.webp",
  },
  {
    testimonial: "DigiWhistle feels like a family of finance influencers.",
    name: "Neha Nagar",
    post: "Finance Influencer",
    url: "/assets/testimonials/neha.webp",
  },
  {
    testimonial: "DW streamlined brand deals, boosting my PR effectively.",
    name: "Pooja Patel",
    post: "Finance Influencer",
    url: "/assets/testimonials/Pooja.webp",
  },
];
const dummy_brands_testimonials = [
  {
    testimonial: "Digiwhistle is the Airbnb for the Creator Economy and the Companies",
    name: "Forbes",
    post: "Magazine Company",
    url: "/assets/testimonials/Forbes_2.webp",
  },
  {
    testimonial: "Digiwhistle is the Airbnb for the Creator Economy and the Companies",
    name: "Forbes",
    post: "Magazine Company",
    url: "/assets/testimonials/Forbes_2.webp",
  },
  {
    testimonial: "Digiwhistle is the Airbnb for the Creator Economy and the Companies",
    name: "Forbes",
    post: "Magazine Company",
    url: "/assets/testimonials/Forbes_2.webp",
  },
  {
    testimonial: "Digiwhistle is the Airbnb for the Creator Economy and the Companies",
    name: "Forbes",
    post: "Magazine Company",
    url: "/assets/testimonials/Forbes_2.webp",
  },
];
const Testimonials = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [currentPagination, setPagination] = useState<number>(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi)
      emblaApi.on("slidesInView", () => {
        const res = emblaApi.selectedScrollSnap();
        setPagination(res);
      });
  }, [emblaApi]);

  const chunkArray = (array: any[], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const [firstChunk, secondChunk, thirdChunk] = chunkArray(
    LandingInfluencerData,
    Math.ceil(LandingInfluencerData.length / 3),
  );
  return (
    <>
      <section
        className="relative flex-col w-full  space-y-20  md:pt-20 md:pb-24 lg:py-28 overflow-hidden"
        id="testimonials"
      >
        <Title title={"Testimonials"} />
        <div className=" relative flex flex-col  md:h-[776px] sm:h-[512px] justify-center items-center">
          <div className="absolute top-0 -z-20 flex flex-col justify-center items-center  md:gap-7 gap-4">
            <Marquee direction="right">
              {firstChunk.map((item, index) => (
                <Image
                  key={index}
                  className=" sm:mr-7  md:w-[240px] sm:w-[160px] h-[240px] object-cover rounded-2xl"
                  alt=""
                  height={200}
                  width={328}
                  src={item.influencer_url}
                />
              ))}
            </Marquee>
            <Marquee direction="left">
              {secondChunk.map((item, index) => (
                <Image
                  key={index}
                  className=" sm:mr-7  md:w-[240px] sm:w-[160px] h-[240px] object-cover rounded-2xl"
                  alt=""
                  height={200}
                  width={328}
                  src={item.influencer_url}
                />
              ))}
            </Marquee>
            <Marquee direction="right">
              {thirdChunk.map((item, index) => (
                <Image
                  key={index}
                  className=" sm:mr-7  md:w-[240px] sm:w-[160px] h-[240px] object-cover rounded-2xl"
                  alt=""
                  height={200}
                  width={328}
                  src={item.influencer_url}
                />
              ))}
            </Marquee>
          </div>
          {/*Glassmorphed container*/}
          <div className="flex flex-col  md:gap-10 gap-7 items-center lg:px-32 md:py-11 px-6 py-5 lg:w-[1160px] md:w-[670px] w-[312px] z-0   backdrop-blur-3xl bg-opacity-5 rounded-[32px] ">
            {/*testimonial sector buttons*/}
            <div className="flex justify-between md:px-3 px-2 py-2 rounded-full gap-3 items-center bg-white lg:w-[580px] md:w-[500px]">
              {head_buttons.map((item, index) => (
                <button
                  key={index}
                  className={`rounded-full w-full font-sans px-5 py-3  text-body-lg-medium text-tc-primary-default ${selectedIndex === index ? "bg-[#f5cc4c]" : "bg-white"} `}
                  onClick={() => setSelectedIndex(index)}
                >
                  {item}
                </button>
              ))}
            </div>
            {/*testimonial cards : we have used embla carousal for further reference visit embla carousal website*/}
            <div className="embla w-full" ref={emblaRef}>
              {selectedIndex === 0 ? (
                <div className="embla__container ">
                  {dummy_testimonials.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-grow-0 gap-7 justify-center flex-shrink-0 basis-[100%] "
                    >
                      <div className="font-heading  text-tc-primary-white  lg:text-display-s md:text-display-xs text-display-xxs lg:w-[650px] md:w-[590px] text-center">
                        <q>{item.testimonial}</q>
                      </div>
                      <div className=" flex flex-col gap-2 items-center">
                        <div className="relative">
                          <Image
                            className="rounded-full border-2 border-white object-cover"
                            src={item.url}
                            alt=""
                            height={70}
                            width={70}
                          />
                          <Image
                            className="absolute bottom-0 right-0"
                            src={"/assets/testimonials/outline-verified.svg"}
                            alt=""
                            height={20}
                            width={20}
                          />
                        </div>

                        <div className="flex flex-col gap-0 items-center">
                          <div className=" lg:text-body-xl-medium md:text-body-lg-medium text-body-md-medium text-tc-primary-white text-center">
                            {item.name}
                          </div>
                          <div className=" lg:text-body-md md:text-body-sm-medium text-body-sm-medium text-tc-primary-white text-center">
                            {item.post}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
              {selectedIndex === 1 ? (
                <div className="embla__container ">
                  {dummy_brands_testimonials.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-grow-0 gap-7 justify-center flex-shrink-0 basis-[100%] "
                    >
                      <div className="font-heading  text-tc-primary-white  lg:text-display-s md:text-display-xs text-display-xxs md:w-[590px] text-center">
                        <q>{item.testimonial}</q>
                      </div>
                      <div className="flex flex-col gap-2 items-center">
                        <div className="relative">
                          <Image
                            className="rounded-full border-2 border-white object-cover"
                            src={item.url}
                            alt=""
                            height={70}
                            width={70}
                          />
                          <Image
                            className="absolute bottom-0 right-0"
                            src={"/assets/testimonials/outline-verified.svg"}
                            alt=""
                            height={20}
                            width={20}
                          />
                        </div>
                        <div className="flex flex-col gap-0 items-center">
                          <div className=" lg:text-body-xl-medium md:text-body-lg-medium text-body-md-medium text-tc-primary-white text-center">
                            {item.name}
                          </div>
                          <div className=" lg:text-body-md md:text-body-sm-medium text-body-sm-medium text-tc-primary-white text-center">
                            {item.post}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-col gap-7">
              <div className="flex w-full justify-center gap-5">
                <button
                  className="  embla__prev border-2 border-bc-primary-white rounded-full lg:p-3 md:p-2.5 p-2 "
                  onClick={scrollPrev}
                >
                  <Image src="/assets/testimonials/arrow-left.webp" alt="" height={20} width={20} />
                </button>
                <button
                  className=" embla__next border-2 border-bc-primary-white rounded-full lg:p-3 md:p-2.5 p-2 "
                  onClick={scrollNext}
                >
                  <Image
                    src="/assets/testimonials/arrow-right.webp"
                    alt=""
                    height={20}
                    width={20}
                  />
                </button>
              </div>
              <div className="flex justify-center w-full gap-1.5">
                {selectedIndex === 0 &&
                  dummy_testimonials.map((item, index) => (
                    <div
                      key={index}
                      className={`h-[5px] bg-white rounded-full overflow-hidden transition-all duration-300 delay-0 ${currentPagination === index ? "w-[64px]" : "w-5"}`}
                    ></div>
                  ))}
                {selectedIndex === 1 &&
                  dummy_brands_testimonials.map((item, index) => (
                    <div
                      key={index}
                      className={`h-[5px] bg-white rounded-full overflow-hidden transition-all duration-300 delay-0 ${currentPagination === index ? "w-[64px]" : "w-5"}`}
                    ></div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
