import React from "react";
import Title from "../ui/Title";
import { CountingCards } from "./Offerings";

const About = () => {
  return (
    <>
      <section
        className="relative flex flex-col w-full gap-14  items-center  overflow-hidden mt-16"
        id="about-us"
      >
        <Title title={"About Us"} />
        <div
          className="absolute h-32 w-32 lg:h-96  lg:w-96 md:h-60 blur-3xl  md:w-60 bg-[#FFEEA3] rounded-full -z-10 lg:bottom-60 md:bottom-44 bottom-96  md:left-5 left-10    "
          data-aos="fade-up"
        ></div>
        <div
          className="absolute  h-32 w-32 lg:h-96  lg:w-96 md:h-60  blur-3xl md:w-60 bg-[#F4BBEA] rounded-full -z-10 lg:bottom-60 md:bottom-44 bottom-96  md:right-5 right-10  "
          data-aos="fade-up"
        ></div>
        <div
          className=" flex flex-col w-full z-0 bg-clip-padding  backdrop-blur-3xl lg:h-[750px] md:h-[681px] sm:h-[642px] justify-start items-center"
          data-aos="fade-up"
        >
          <div className="w-full h-full  absolute bg-clip-padding  "></div>
          <div className="flex flex-col justify-end  items-center lg:h-[600px] md:h-[446px]  h-[198px] lg:w-[900px] md:w-[708px] w-[314px] bg-about-us-image bg-no-repeat bg-cover bg-bottom drop-shadow-y-elevation-xl border-[4px] rounded-[32px] border-white">
            {/*Glassmorphed container*/}
            <div className=" flex flex-col md:gap-9 gap-6 lg:mb-5 md:-mb-32 -mb-96 border-2 border-[#E1E1DA50] bg-gradient-to-b from-white/10  to-black/10 lg:bg-white/5 bg-clip-padding backdrop-filter backdrop-blur-3xl items-center md:px-[42px] md:py-[30px] px-3 py-7 lg:w-[850px] md:w-[670px] w-[296px] z-0   rounded-[32px] ">
              {/* <div className="w-full h-full absolute top-0 bg-clip-padding  backdrop-blur-3xl -z-10 rounded-[32px]"></div> */}

              <div className="flex flex-col justify-center items-center lg:gap-6 md:gap-[18px] gap-4">
                <div className="text-tc-primary-white md:text-display-xs text-display-xxs font-heading text-center">
                  Heylos we are Digiwhistle!
                </div>
                <div className="md:text-tc-primary-white text-gray-559 text-body-md-light text-center  ">
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
      </section>
    </>
  );
};

export default About;
