import React from "react";
import Marquee from "react-fast-marquee";
import Title from "./ui/Title";
import Image from "next/image";
import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import { useEffect } from "react";
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const head_buttons = ["Influencers", "Brands"];
const dummy_testimonials = [
  {
    testimonial: "The Aest Influencer marketing platform in the market right now.",
    name: "CS Ujjawal Pahwa",
    post: "Finance Influencer",
    url: "/assets/testimonials/avtar.png",
  },
  {
    testimonial: "The Best Influencer marketing platform in the market right now.",
    name: "CS Ujjawal Pahwa",
    post: "Finance Influencer",
    url: "/assets/testimonials/avtar.png",
  },
  {
    testimonial: "The Cest Influencer marketing platform in the market right now.",
    name: "CS Ujjawal Pahwa",
    post: "Finance Influencer",
    url: "/assets/testimonials/avtar.png",
  },
  {
    testimonial: "The Cest Influencer marketing platform in the market right now.",
    name: "CS Ujjawal Pahwa",
    post: "Finance Influencer",
    url: "/assets/testimonials/avtar.png",
  },
  {
    testimonial: "The Cest Influencer marketing platform in the market right now.",
    name: "CS Ujjawal Pahwa",
    post: "Finance Influencer",
    url: "/assets/testimonials/avtar.png",
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
  return (
    <>
      <section
        className="relative flex-col w-full  space-y-20  md:pt-20 md:pb-24 lg:py-28 overflow-hidden"
        id="testimonials"
      >
        <Title title={"Testimonials"} />
        <div className="relative flex flex-col lg:h-[1020px] md:h-[776px] sm:h-[512px] justify-center items-center">
          <div className="absolute top-0 -z-20 flex flex-col justify-center items-center  md:gap-7 gap-4">
            <Marquee direction="right">
              {arr.map((item, index) => (
                <Image
                  key={index}
                  className="lg:mr-10 sm:mr-7 lg:w-[320px] md:w-[240px] sm:w-[160px]"
                  alt=""
                  width={320}
                  height={100}
                  src="/assets/testimonials/card.png"
                />
              ))}
            </Marquee>
            <Marquee direction="left">
              {arr.map((item, index) => (
                <Image
                  key={index}
                  className="lg:mr-10 sm:mr-7 lg:w-[320px] md:w-[240px] sm:w-[160px] "
                  alt=""
                  width={320}
                  height={100}
                  src="/assets/testimonials/card.png"
                />
              ))}
            </Marquee>
            <Marquee direction="right">
              {arr.map((item, index) => (
                <Image
                  key={index}
                  className="lg:mr-10 sm:mr-7 lg:w-[320px] md:w-[240px] sm:w-[160px]"
                  alt=""
                  width={320}
                  height={100}
                  src="/assets/testimonials/card.png"
                />
              ))}
            </Marquee>
          </div>
          {/*Glassmorphed container*/}
          <div className="flex flex-col lg:gap-16 md:gap-10 gap-7 items-center lg:px-32 md:py-11 px-6 py-5 lg:w-[1160px] md:w-[670px] w-[312px] z-0  bg-white backdrop-blur-3xl bg-opacity-5 rounded-[32px] ">
            {/*testimonial sector buttons*/}
            <div className="flex justify-between md:px-3 px-2 py-2 rounded-full gap-3 items-center bg-white lg:w-[580px] md:w-[500px]">
              {head_buttons.map((item, index) => (
                <button
                  key={index}
                  className={`rounded-full w-full font-sans px-5 py-3  text-body-lg-medium text-tc-primary-default ${selectedIndex === index ? "bg-[#f5cc4c]" : "bg-white"} `}
                  onMouseEnter={() => {
                    setSelectedIndex(index);
                  }}
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
                      <div className="font-heading lg:text-display-l text-tc-primary-white lg:w-full md:text-display-s text-display-xxs md:w-[590px] text-center">
                        {item.testimonial}
                      </div>
                      <div className="flex flex-col gap-2 items-center">
                        <Image src={item.url} alt="" height={56} width={56} />
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
                  {dummy_testimonials.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-grow-0 gap-7 justify-center flex-shrink-0 basis-[100%] "
                    >
                      <div className="font-heading lg:text-display-l text-tc-primary-white lg:w-full md:text-display-s text-display-xxs md:w-[590px] text-center">
                        {item.testimonial}
                      </div>
                      <div className="flex flex-col gap-2 items-center">
                        <Image src={item.url} alt="" height={56} width={56} />
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
                  <Image src="/assets/testimonials/arrow-left.png" alt="" height={20} width={20} />
                </button>
                <button
                  className=" embla__next border-2 border-bc-primary-white rounded-full lg:p-3 md:p-2.5 p-2 "
                  onClick={scrollNext}
                >
                  <Image src="/assets/testimonials/arrow-right.png" alt="" height={20} width={20} />
                </button>
              </div>
              <div className="flex justify-center w-full gap-1.5">
                {dummy_testimonials.map((item, index) => (
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
