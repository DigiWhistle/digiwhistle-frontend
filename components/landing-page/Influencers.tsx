"use client";
import React, { RefObject, useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { Button } from "../ui/button";
import Title from "../ui/Title";
import { cn } from "@/lib/utils";
import Link from "next/link";
const data = [
  {
    influencer_url: "/assets/influencers/neha.webp",
    name: "Neha Nagar",
    tagname: "iamnehanagar",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/iamnehanagar/",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
  {
    influencer_url: "/assets/influencers/Ranchana.webp",
    name: "Rachna Ranade",
    tagname: "ca_rachanaranade",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/ca_rachanaranade?igsh=MzdlenlpNmF6azFi",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },

  {
    influencer_url: "/assets/influencers/Ankit.webp",
    name: "Ankit Sharda",
    tagname: "whatifankit_2.0",
    category: "Infotainment",
    sociallinks: {
      instagram: "https://www.instagram.com/whatifankit_2.0/",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
  {
    influencer_url: "/assets/influencers/Sanket.webp",
    name: "Sanket Khandagale",
    tagname: "spiktec_",
    category: "Infotainment",
    sociallinks: {
      instagram: "https://www.instagram.com/spiktec_/",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
  {
    influencer_url: "/assets/influencers/Monica.webp",
    name: "Monica Malik",
    tagname: "prettymuchfinance",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/prettymuchfinance/",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
  {
    influencer_url: "/assets/influencers/Ujjwal.webp",
    name: "Ujjawal Pahwa",
    tagname: "cs.ujjawalpahwa",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/cs.ujjawalpahwa",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
  {
    influencer_url: "/assets/influencers/Deepanshu.webp",
    name: "Deepanshu Bhaskar",
    tagname: "deepanshu.bhaskar",
    category: "Tech",
    sociallinks: {
      instagram: "https://www.instagram.com/deepanshu.bhaskar/",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
  {
    influencer_url: "/assets/influencers/Aniket.webp",
    name: "Aniket Thakur",
    tagname: "anikett.thakurr",
    category: "Infotainment",
    sociallinks: {
      instagram: "https://www.instagram.com/anikett.thakurr/",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
  {
    influencer_url: "/assets/influencers/Anmol.webp",
    name: "Anmol Sharma",
    tagname: "financebyanmoll",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/financebyanmoll/",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
  {
    influencer_url: "/assets/influencers/Vikas.webp",
    name: "Vikas Gawri",
    tagname: "marketians",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/marketians/",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
  {
    influencer_url: "/assets/influencers/Pooja.webp",
    name: "Pooja Patel",
    tagname: "profittiger_",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/profittiger_/",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
  {
    influencer_url: "/assets/influencers/Nidhi.webp",
    name: "Nidhi Nagar",
    tagname: "finglory",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/finglory/",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
  {
    influencer_url: "/assets/influencers/Garvit.webp",
    name: "Garvit Goyal",
    tagname: "garvittgoyal",
    category: "Finance",
    sociallinks: {
      instagram: "https://instagram.com/garvittgoyal?igshid=MzRlODBiNWFlZA==",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
  {
    influencer_url: "/assets/influencers/Prabhjot.webp",
    name: "Prabhjot Singh",
    tagname: "prabhjot.speaks",
    category: "Infotainment",
    sociallinks: {
      instagram: "https://www.instagram.com/prabhjot.speaks/",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
  {
    influencer_url: "/assets/influencers/Manav.webp",
    name: "Manav Narang",
    tagname: "learnwithcamanav",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/learnwithcamanav/",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
  {
    influencer_url: "/assets/influencers/Hritik.webp",
    name: "Hritik Nahar",
    tagname: "hritiknahar",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/hritiknahar/",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
  {
    influencer_url: "/assets/influencers/Lakshya.webp",
    name: "Lakshya Yadav",
    tagname: "multipliy",
    category: "Infotainment",
    sociallinks: {
      instagram: "https://www.instagram.com/multipliy/",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
  {
    influencer_url: "/assets/influencers/Deepak.webp",
    name: "Deepak Mamgai",
    tagname: "marketing.vidyalaya",
    category: "Infotainment",
    sociallinks: {
      instagram: "https://www.instagram.com/marketing.vidyalaya",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
  {
    influencer_url: "/assets/influencers/Alankar.webp",
    name: "Alankar Gupta",
    tagname: "alankargupt.a",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/alankargupt.a/",
      youtube: "https://youtube.com/",
      linkedin: "https://linkedin.com/",
      X: "https://twitter.com/",
    },
  },
];

const Influencers = () => {
  const wrapperRef: RefObject<HTMLDivElement> = useRef(null);
  const [playMarquee, setPlayMarquee] = useState(true);
  const [selectedInfluencer, setSelectedInfluencer] = useState("");

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setPlayMarquee(true);
      setSelectedInfluencer("");
    }
  };

  return (
    <>
      <section
        className="w-full flex flex-col items-center lg:pt-28 lg:pb-20 pt-20 md:pb-40 pb-24 lg:gap-20 gap-14"
        id="star-influencers"
      >
        <Title title="Our Star Influencers" />
        <Marquee
          pauseOnHover
          pauseOnClick
          play={playMarquee}
          className=""
          direction="left"
          ref={wrapperRef}
        >
          {data.map((item, index) => (
            <div
              key={index}
              className={cn(
                " flex flex-col md:mr-10 mr-7 bg-sb-black  md:p-5 p-3  gap-8  md:rounded-3xl rounded-[20px]  md:h-[536px] md:w-[333px] h-[474px] w-[264px]",
                selectedInfluencer === item.influencer_url ? " border-4 border-yellow-101" : null,
              )}
            >
              <Image
                className="w-full  md:h-[298px] h-[266px] object-cover rounded-2xl"
                src={item.influencer_url}
                alt=""
                height={320}
                width={328}
              ></Image>
              <div className="flex flex-col gap-5">
                <div className="flex  flex-col gap-3">
                  <div className=" font-heading text-center text-tc-primary-white text-display-xxs ">
                    {item.tagname}
                  </div>
                  <div className="text-center  text-body-md-light text-[#BBBBBE] ">
                    {item.name} | {item.category}
                  </div>
                </div>
                <div className="flex justify-between items-center bg-dark-black-651 rounded-[16px] md:px-6 md:py-4 px-3 py-3">
                  <button
                    className=" flex items-center justify-center border-2 border-white rounded-full px-[10px] py-[12px] md:h-[46px] md:w-[46px] h-10 w-10"
                    onClick={() => {
                      window.open(item.sociallinks.instagram);
                      setPlayMarquee(false);
                      setSelectedInfluencer(item.influencer_url);
                    }}
                  >
                    <Image src="/assets/icons/instagram.svg" alt="I" height={24} width={24} />
                  </button>
                  <button
                    className=" flex items-center justify-center border-2 border-white rounded-full px-[10px] py-[12px] md:h-[46px] md:w-[46px] h-10 w-10"
                    onClick={() => {
                      window.open(item.sociallinks.instagram);
                      setPlayMarquee(false);
                      setSelectedInfluencer(item.influencer_url);
                    }}
                  >
                    <Image src="/assets/icons/youtube.svg" alt="I" height={24} width={24} />
                  </button>
                  <button
                    className="flex items-center justify-center border-2 border-white rounded-full px-[11px] py-[12px] md:h-[46px] md:w-[46px] h-10 w-10"
                    onClick={() => {
                      window.open(item.sociallinks.instagram);
                      setPlayMarquee(false);
                      setSelectedInfluencer(item.influencer_url);
                    }}
                  >
                    <Image src="/assets/icons/linkedin.svg" alt="I" height={24} width={24} />
                  </button>
                  <button
                    className="flex items-center justify-center border-2 border-white rounded-full px-[11px] py-[12px] md:h-[46px] md:w-[46px] h-10 w-10"
                    onClick={() => {
                      window.open(item.sociallinks.instagram);
                      setPlayMarquee(false);
                      setSelectedInfluencer(item.influencer_url);
                    }}
                  >
                    <Image src="/assets/icons/twitter.svg" alt="I" height={24} width={24} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
        <Link href={"/sign-up/user"}>
          <Button className="md:w-[352px] w-[280px]" size={"xl"}>
            EXPLORE MORE TALENTS
          </Button>
        </Link>
      </section>
    </>
  );
};

export default Influencers;
