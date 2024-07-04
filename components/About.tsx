import React from "react";
import Title from "./ui/Title";
import { CountingCards } from "./Offerings";

const About = () => {
  return (
    <>
      <div className="relative flex flex-col w-full gap-14  items-center  overflow-hidden">
        <Title title={"About Us"} />
        <div className="absolute h-32 w-32 lg:h-96  lg:w-96 md:h-60  md:w-60 bg-[#FFEEA3] rounded-full -z-10 lg:bottom-60 md:bottom-44 bottom-96  md:left-5 left-10 transform    "></div>
        <div className="absolute  h-32 w-32 lg:h-96  lg:w-96 md:h-60  md:w-60 bg-[#F4BBEA] rounded-full -z-10 lg:bottom-60 md:bottom-44 bottom-96  md:right-5 right-10  transform "></div>
        <div className="relative flex flex-col w-full z-0  bg-clip-content  backdrop-blur-3xl lg:h-[948px] md:h-[681px] sm:h-[642px] justify-start items-center">
          <div className="flex flex-col justify-end items-center lg:h-[776px] md:h-[446px]  h-[198px] lg:w-[1230px] md:w-[708px] w-[314px] bg-about-us-image bg-no-repeat bg-cover bg-center drop-shadow-y-elevation-xl border-[4px] rounded-2xl border-white">
            {/*Glassmorphed container*/}
            <div className="flex flex-col lg:gap-12 md:gap-9 gap-6 lg:mb-14 md:-mb-32 -mb-96 border-2 border-[#E1E1DA50] items-center lg:px-14 lg:py-10 drop-shadow-y-elevation-xl md:px-[42px] md:py-[30px] px-3 py-7 lg:w-[1100px] md:w-[670px] w-[296px] z-0  bg-white  backdrop-blur-3xl bg-opacity-5 rounded-[32px] ">
              <div className="flex flex-col justify-center items-center lg:gap-6 md:gap-[18px] gap-4">
                <div className="text-tc-primary-white md:text-display-xs text-display-xxs font-heading text-center">
                  Heylos we are Digiwhistle!
                </div>
                <div className="md:text-tc-primary-white text-tc-body-grey text-body-md-light text-center  ">
                  As a marketing and talent management agency, we handle a select roster of India’s
                  top influencers. Our exclusive relationship with our influencers allows us to
                  connect ambitious brands to relevant personalities in order to reach the right
                  target audiences.
                </div>
              </div>
              <CountingCards section="about" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
