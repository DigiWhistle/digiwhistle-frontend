import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { Button } from "./ui/button";
import Title from "./ui/Title";
const data = [
  {
    influencer_url: "/assets/influencers/userimg1.png",
    sociallinks: {
      instagram: "https://www.instagram.com/",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
  {
    influencer_url: "/assets/influencers/userimg1.png",
    sociallinks: {
      instagram: "https://www.instagram.com/",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
  {
    influencer_url: "/assets/influencers/userimg1.png",
    sociallinks: {
      instagram: "https://www.instagram.com/",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
  {
    influencer_url: "/assets/influencers/userimg1.png",
    sociallinks: {
      instagram: "https://www.instagram.com/",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
  {
    influencer_url: "/assets/influencers/userimg1.png",
    sociallinks: {
      instagram: "https://www.instagram.com/",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
  {
    influencer_url: "/assets/influencers/userimg1.png",
    sociallinks: {
      instagram: "https://www.instagram.com/",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
];

const Influencers = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center lg:pt-28 lg:pb-20 pt-20 md:pb-40 pb-24 lg:gap-20 gap-14">
        <Title title="Our Star Influencers" />
        <Marquee pauseOnHover className="" direction="left">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:mr-10 mr-7 bg-sb-black lg:p-7 md:p-5 p-3 lg:gap-10 gap-8 lg:rounded-[28px] md:rounded-3xl rounded-[20px] lg:h-[598px] lg:w-[384px] md:h-[536px] md:w-[333px] h-[474px] w-[264px]"
            >
              <Image
                className="w-full  lg:h-[320px] md:h-[298px] h-[266px] object-cover rounded-2xl lg:rounded-[20px]"
                src={item.influencer_url}
                alt=""
                height={320}
                width={328}
              ></Image>
              <div className="flex flex-col gap-5">
                <div className="flex  flex-col gap-3">
                  <div className=" font-heading text-center text-tc-primary-white text-display-xxs lg:text-display-xs">
                    financebyanmoll
                  </div>
                  <div className="text-center lg:text-body-xl-light text-body-md-light text-[#BBBBBE] ">
                    Anmol Sharma | Video Creator
                  </div>
                </div>
                <div className="flex justify-between items-center bg-dark-black-651 rounded-[16px] md:px-6 md:py-4 px-3 py-3">
                  <button
                    className=" flex items-center justify-center border-2 border-white rounded-full px-[10px] py-[12px] md:h-[46px] md:w-[46px] h-10 w-10"
                    onClick={() => window.open(item.sociallinks.instagram)}
                  >
                    <Image src="/assets/influencers/insta.png" alt="I" height={24} width={24} />
                  </button>
                  <button
                    className=" flex items-center justify-center border-2 border-white rounded-full px-[10px] py-[12px] md:h-[46px] md:w-[46px] h-10 w-10"
                    onClick={() => window.open(item.sociallinks.instagram)}
                  >
                    <Image src="/assets/influencers/youtube.png" alt="I" height={24} width={24} />
                  </button>
                  <button
                    className="flex items-center justify-center border-2 border-white rounded-full px-[11px] py-[12px] md:h-[46px] md:w-[46px] h-10 w-10"
                    onClick={() => window.open(item.sociallinks.instagram)}
                  >
                    <Image src="/assets/influencers/linkedin.png" alt="I" height={24} width={24} />
                  </button>
                  <button
                    className="flex items-center justify-center border-2 border-white rounded-full px-[11px] py-[12px] md:h-[46px] md:w-[46px] h-10 w-10"
                    onClick={() => window.open(item.sociallinks.instagram)}
                  >
                    <Image src="/assets/influencers/X.png" alt="I" height={24} width={24} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
        <Button className="md:w-[352px] w-[280px]" size={"xl"}>
          EXPLORE MORE TALENTS
        </Button>
      </div>
    </>
  );
};

export default Influencers;
