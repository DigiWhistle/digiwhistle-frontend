"use client";
import React, { RefObject, useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { Button } from "../ui/button";
import Title from "../ui/Title";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const LandingInfluencerData = [
  {
    influencer_url: "/assets/influencers/neha.webp",
    name: "Neha Nagar",
    tagname: "iamnehanagar",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/iamnehanagar/",
      youtube: "https://www.youtube.com/@nehanagar",
      linkedin: "https://www.linkedin.com/in/iamnehanagar/",
      X: "https://twitter.com/nehanagarr",
    },
  },
  {
    influencer_url: "/assets/influencers/abhi.webp",
    name: "Abhi & Niyu",
    tagname: "abhiandniyu",
    category: "Infotainment | Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/abhiandniyu/",
      youtube: "https://youtube.com/@abhiandniyu?si=9266GVHWN5HpLDTN",
      linkedin: "https://www.linkedin.com/in/niyati-mavinkurve-0b2292b9/",
      X: "https://x.com/abhiandniyu?t=eT3WokLFNjzT1JbsdJ7Dtg&s=08",
    },
  },
  {
    influencer_url: "/assets/influencers/Adarsh.webp",
    name: "Adarsh Gupta",
    tagname: "adarshh.gupta",
    category: "Infotainment",
    sociallinks: {
      instagram: "https://www.instagram.com/adarshh.gupta/",
      youtube: "https://youtube.com/@adarshgofficial?si=auKtIQT6sfXEHTE0",
      linkedin: null,
      X: "https://x.com/AdarshhGupta?t=SbAc0JK6xIGvl85QkWubBw&s=08",
    },
  },
  {
    influencer_url: "/assets/influencers/SakchiJain.webp",
    name: "CA Sakchi Jain",
    tagname: "ca.sakchijain",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/ca.sakchijain/",
      youtube: "https://www.youtube.com/@ca.sakchijain",
      linkedin: "http://www.linkedin.com/in/sakchi-jain/",
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/Kavya.webp",
    name: "Kavya",
    tagname: "kk.create",
    category: "Infotainment",
    sociallinks: {
      instagram: "https://www.instagram.com/kk.create/",
      youtube: "https://www.youtube.com/@ca.sakchijain",
      linkedin:
        "https://www.linkedin.com/in/kavya-karnatac?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      X: "https://x.com/kavya_karnatac?t=5ch9AWS7lCQGcMUjUpf5nQ&s=08",
    },
  },
  {
    influencer_url: "/assets/influencers/neha.webp",
    name: "Kavya",
    tagname: "kk.create",
    category: "Infotainment",
    sociallinks: {
      instagram: "https://www.instagram.com/kk.create/",
      youtube: "https://www.youtube.com/@ca.sakchijain",
      linkedin:
        "https://www.linkedin.com/in/kavya-karnatac?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      X: "https://x.com/kavya_karnatac?t=5ch9AWS7lCQGcMUjUpf5nQ&s=08",
    },
  },
  {
    influencer_url: "/assets/influencers/Ranchana.webp",
    name: "Rachna Ranade",
    tagname: "ca_rachanaranade",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/ca_rachanaranade?igsh=MzdlenlpNmF6azFi",
      youtube: "https://www.youtube.com/@CARachanaRanade",
      linkedin: "https://www.linkedin.com/in/carachanaranade/",
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/AnantLadha.webp",
    name: "Anant Ladha",
    tagname: "anantladha1234",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/anantladha1234/",
      youtube: "https://youtube.com/@investaajforkal?si=lyCF5RhIztxgQ9Td",
      linkedin: "http://www.linkedin.com/in/anant-ladha-cfa-ca-cfp-ll-b-a506a6127/",
      X: "https://x.com/anantladha25?t=udnWLEpkUSv-bwGS4OA_AA&s=08",
    },
  },
  {
    influencer_url: "/assets/influencers/SakshiGaur.webp",
    name: "Sakshi Gaur",
    tagname: "lastnighttech",
    category: "Tech",
    sociallinks: {
      instagram: "https://www.instagram.com/lastnighttech/reels/",
      youtube: null,
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/Ankit.webp",
    name: "Ankit Sharda",
    tagname: "whatifankit_2.0",
    category: "Infotainment",
    sociallinks: {
      instagram: "https://www.instagram.com/whatifankit_2.0/",
      youtube: "https://youtube.com/@whatifankit?si=A2h9LzZQRxlhv5lR",
      linkedin:
        "https://www.linkedin.com/in/ankitshardaa?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      X: "https://x.com/anantladha25?t=udnWLEpkUSv-bwGS4OA_AA&s=08",
    },
  },
  {
    influencer_url: "/assets/influencers/DeepanshuBhaskar.webp",
    name: "Deepanshu Bhaskar",
    tagname: "deepanshu.bhaskar",
    category: "Tech",
    sociallinks: {
      instagram: "https://www.instagram.com/deepanshu.bhaskar/",
      youtube: "https://youtube.com/@deepanshu.bhaskar?si=BzDHxJ7MJ5PWFvZ1",
      linkedin: null,
      X: null,
    },
  },

  {
    influencer_url: "/assets/influencers/Sanket.webp",
    name: "Sanket Khandagale",
    tagname: "spiktec_",
    category: "Infotainment",
    sociallinks: {
      instagram: "https://www.instagram.com/spiktec_/",
      youtube: null,
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/Monica.webp",
    name: "Monica Malik",
    tagname: "prettymuchfinance",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/prettymuchfinance/",
      youtube: "https://www.youtube.com/@prettymuchfinanceofficial",
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/Bhanu.webp",
    name: "Bhanu Pathak",
    tagname: "bhanu_pathak",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/bhanu_pathak/",
      youtube: "https://youtube.com/@bhanupathak?si=_5TFvnjHZtYC8o5Q",
      linkedin: "https://www.linkedin.com/in/pathakbhanu/",
      X: "https://x.com/bhanu_pathak_?t=88lMpbxOzhdM9sOl5p9Hjg&s=08",
    },
  },
  {
    influencer_url: "/assets/influencers/Sajal.jpeg",
    name: "Sajal Goel",
    tagname: "sajalgoell",
    category: "Finance | Business",
    sociallinks: {
      instagram: "https://www.instagram.com/sajalgoell/",
      youtube: "https://youtube.com/@sajalgoell?si=jy1pNcsmjiLRi4Yj",
      linkedin: "http://www.linkedin.com/in/goelsajal/",
      X: "https://x.com/sajalgoell?t=L0xPUDlNheAqEcti-BlU_w&s=08",
    },
  },
  {
    influencer_url: "/assets/influencers/Taresh.webp",
    name: "Basically Bania",
    tagname: "basically_baniya",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/basically_baniya/",
      youtube: "https://youtube.com/@basicallybaniya1251?si=jDWPPvE8DT8zdD-2",
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/Ujjwal.webp",
    name: "Ujjawal Pahwa",
    tagname: "cs.ujjawalpahwa",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/cs.ujjawalpahwa",
      youtube: "https://www.youtube.com/@cs.ujjawalpahwa",
      linkedin:
        "https://www.linkedin.com/in/ujjawal-pahwa-content-creator?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      X: "https://x.com/UjjawalPahwa?t=qoYwqnH6IKlybBjAtnUlRA&s=08",
    },
  },
  {
    influencer_url: "/assets/influencers/Deepanshu.webp",
    name: "Deepanshu Bhaskar",
    tagname: "deepanshu.bhaskar",
    category: "Tech",
    sociallinks: {
      instagram: "https://www.instagram.com/deepanshu.bhaskar/",
      youtube: null,
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/Aniket.webp",
    name: "Aniket Thakur",
    tagname: "anikett.thakurr",
    category: "Infotainment",
    sociallinks: {
      instagram: "https://www.instagram.com/anikett.thakurr/",
      youtube: "https://youtube.com/@currentwatch_aniketthakur?si=5EXUaq9hC2F3oBNM",
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/Anmol.webp",
    name: "Anmol Sharma",
    tagname: "financebyanmoll",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/financebyanmoll/",
      youtube: "https://www.youtube.com/@finlightanmol",
      linkedin: "https://www.linkedin.com/in/financebyanmol/",
      X: "https://x.com/financebyanmol?t=cWRBS8Mv_LxsVDPpjAQFPQ&s=08",
    },
  },
  {
    influencer_url: "/assets/influencers/Vikas.webp",
    name: "Vikas Gawri",
    tagname: "marketians",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/marketians/",
      youtube: "https://www.youtube.com/@VikasGawri",
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/RiyaUpreti.webp",
    name: "Riya Upreti",
    tagname: "careerwithriya",
    category: "Career Guide",
    sociallinks: {
      instagram: "https://www.instagram.com/careerwithriya/",
      youtube: "https://youtube.com/@riyaupreti?si=2xxbNWps17vFPefc",
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/Pooja.webp",
    name: "Pooja Patel",
    tagname: "profittiger_",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/profittiger_/",
      youtube: "https://www.youtube.com/@Profittiger",
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/ManuBajaj.webp",
    name: "Manu Bajaj",
    tagname: "iammanubajaj",
    category: "Tech",
    sociallinks: {
      instagram: "https://www.instagram.com/iammanubajaj",
      youtube: "https://youtube.com/@iammanubajaj?si=w8S7ZRD0SFNCjdQj",
      linkedin: null,
      X: "https://x.com/iammanubajaj?t=oILKTEsn8B2g4rRPkdVl5g&s=08",
    },
  },
  {
    influencer_url: "/assets/influencers/CaTwinkleJain.webp",
    name: "CA Twinkle Jain",
    tagname: "iammanubajaj",
    category: "Finance | Infotainment",
    sociallinks: {
      instagram: "https://www.instagram.com/ca.twinklejain/?hl=en",
      youtube: "https://youtube.com/@ca.twinklejain1?si=sctK1MFMPJFn_NJt",
      linkedin:
        "https://www.linkedin.com/in/catwinklejain?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      X: "https://x.com/twinklejain?t=cMyt818Vqt7N4m9dChf7Cw&s=08",
    },
  },
  {
    influencer_url: "/assets/influencers/TejasJoshi.webp",
    name: "Tejas Joshi",
    tagname: "tejasjosh.i",
    category: "Finance ",
    sociallinks: {
      instagram: "https://www.instagram.com/tejasjosh.i/",
      youtube: "https://www.youtube.com/@tejasjosh.i",
      linkedin: null,
      X: "https://x.com/heytejas?t=JfjY9V2CmqrW35OtGkoWAQ&s=08",
    },
  },
  {
    influencer_url: "/assets/influencers/CaShreyaJaiswal.webp",
    name: "CA Shreya Jaiswal",
    tagname: "the_unconventional_ca",
    category: "Finance ",
    sociallinks: {
      instagram: "https://www.instagram.com/the_unconventional_ca/",
      youtube: null,
      linkedin:
        "https://www.linkedin.com/in/theunconventionalca?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/Nidhi.webp",
    name: "Nidhi Nagar",
    tagname: "finglory",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/finglory/",
      youtube: "https://www.youtube.com/@finglory",
      linkedin: "https://www.linkedin.com/in/nidhi-nagar-b74581135/",
      X: null,
    },
  },
  // {
  //   influencer_url: "/assets/influencers/Nidhi.webp",
  //   name: "Tech with us",
  //   tagname: "techwith.us",
  //   category: "Tech",
  //   sociallinks: {
  //     instagram: "https://www.instagram.com/techwith.us",
  //     youtube: "https://youtube.com/@shrutiispeaks?si=c1duDCGqpDZ67Yjr",
  //     linkedin: null,
  //     X: null,
  //   },
  // },
  {
    influencer_url: "/assets/influencers/HimanshuMandada.webp",
    name: "Himanshu Mudada",
    tagname: "himanshu_mundada_",
    category: "Infotainment",
    sociallinks: {
      instagram: "https://www.instagram.com/himanshu_mundada_/",
      youtube: "https://youtube.com/@himanshumundada6035?si=iWvF1zsUg3BkuSNV",
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/ProfVinayArora.webp",
    name: "Prof Vinny Arora",
    tagname: "moneyvsme",
    category: "Finance (SEBI Registered)",
    sociallinks: {
      instagram: "https://www.instagram.com/moneyvsme/",
      youtube: null,
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/ParasMadan.webp",
    name: "Paras Madan",
    tagname: "parasmadan.in",
    category: "Tech",
    sociallinks: {
      instagram: "https://www.instagram.com/parasmadan.in/",
      youtube: "https://youtube.com/@parasmadan_in?si=2NvrUDdB1Lh3GRXM",
      linkedin: "http://www.linkedin.com/in/paras-madan-a9863716b/",
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/Tarun.webp",
    name: "Tarun Kediaa",
    tagname: "tarunkediaa/",
    category: "Infotainment",
    sociallinks: {
      instagram: "https://www.instagram.com/tarunkediaa/",
      youtube: "https://youtube.com/@tarunkediaa?si=w-sGqjuhfdJRqERZ",
      linkedin: "http://www.linkedin.com/in/tarun-kumar-kedia-b43050152/",
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/CaMeherKaur.webp",
    name: "CA Mehar Kaur",
    tagname: "meheronmmoney",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/meheronmmoney",
      youtube: null,
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/KritikaSharma.webp",
    name: "Kritika Sharma",
    tagname: "sharmajiinvests",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/sharmajiinvests/",
      youtube: null,
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/CaSwarajJain.webp",
    name: "CA Swaraj Jain",
    tagname: "a.swarajjain",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/ca.swarajjain/",
      youtube: "https://www.youtube.com/@caswarajjain",
      linkedin: "http://www.linkedin.com/in/swarajjain/",
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/SatyamKhandelwal.webp",
    name: "Satyam Khandelwal",
    tagname: "careergrowthwithsatyam",
    category: "Career Guide",
    sociallinks: {
      instagram: "https://www.instagram.com/careergrowthwithsatyam/",
      youtube: null,
      linkedin: "http://www.linkedin.com/in/satyamcareercoach/",
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/ManpritGautam.webp",
    name: "Manpreet Gautam",
    tagname: "manpritgautam",
    category: "Career Guide",
    sociallinks: {
      instagram: "https://www.instagram.com/manpritgautam/",
      youtube: null,
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/KajalArora.webp",
    name: "Kajol Arora",
    tagname: "placement_drives_updates",
    category: "Career Guide",
    sociallinks: {
      instagram: "https://www.instagram.com/placement_drives_updates/",
      youtube: null,
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/MayuriRajput.webp",
    name: "Mayuri Rajput",
    tagname: "mayuri.in",
    category: "Career Guide",
    sociallinks: {
      instagram: "https://www.instagram.com/mayuri.in/",
      youtube: null,
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/CareerWithAnjali.webp",
    name: "Career with Anjali",
    tagname: "careerwithanjali",
    category: "Career Guide",
    sociallinks: {
      instagram: "https://www.instagram.com/careerwithanjali/",
      youtube: null,
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/Garvit.webp",
    name: "Garvit Goyal",
    tagname: "garvittgoyal",
    category: "Finance",
    sociallinks: {
      instagram: "https://instagram.com/garvittgoyal?igshid=MzRlODBiNWFlZA==",
      youtube: "https://youtube.com/@garvittgoyal?si=4NJwvOZE1d9L8t2T",
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/ShivamSharma.webp",
    name: "Shivam Sharma",
    tagname: "shivamsharma_ig",
    category: "Infotainment",
    sociallinks: {
      instagram: "https://www.instagram.com/shivamsharma_ig/",
      youtube: null,
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/CaNikitaJindal.webp",
    name: "CA Nikita Jindal",
    tagname: "ca.nikitajindal",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/ca.nikitajindal/",
      youtube: "https://youtube.com/@ca.nikitajindal?si=QXEAu2-jXhJKNVE5",
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/CaSristiNerdInYou.webp",
    name: "CA Srishti Nerd in you",
    tagname: "nerd_in_you",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/nerd_in_you",
      youtube: "https://youtube.com/@casrishtigosavi?si=78lHiKNspE6KzG26",
      linkedin: "https://www.linkedin.com/in/srishti-gosavi-8a860ba7/",
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/ShrutiSpeaks.webp",
    name: "Shruti Speaks",
    tagname: "shrutiispeaks",
    category: "Infotainment",
    sociallinks: {
      instagram: "https://instagram.com/shrutiispeaks",
      youtube: "https://www.youtube.com/@shrutiispeaks/shorts",
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/Prabhjot.webp",
    name: "Prabhjot Singh",
    tagname: "prabhjot.speaks",
    category: "Infotainment",
    sociallinks: {
      instagram: "https://www.instagram.com/prabhjot.speaks/",
      youtube: "https://www.youtube.com/@prabhjotspeaks/",
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/CaMukander.webp",
    name: "CA Mukander",
    tagname: "ca.mukanderbeniwal",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/ca.mukanderbeniwal/",
      youtube: null,
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/Manav.webp",
    name: "Manav Narang",
    tagname: "learnwithcamanav",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/learnwithcamanav/",
      youtube: null,
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/Hritik.webp",
    name: "Hritik Nahar",
    tagname: "hritiknahar",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/hritiknahar/",
      youtube: null,
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/Lakshya.webp",
    name: "Lakshya Yadav",
    tagname: "multipliy",
    category: "Infotainment",
    sociallinks: {
      instagram: "https://www.instagram.com/multipliy/",
      youtube: "https://youtube.com/@multipliy2.0?si=lnaPwTSDu_u8i1z5",
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/Deepak.webp",
    name: "Deepak Mamgai",
    tagname: "marketing.vidyalaya",
    category: "Infotainment",
    sociallinks: {
      instagram: "https://www.instagram.com/marketing.vidyalaya",
      youtube: null,
      linkedin: null,
      X: null,
    },
  },
  {
    influencer_url: "/assets/influencers/Alankar.webp",
    name: "Alankar Gupta",
    tagname: "alankargupt.a",
    category: "Finance",
    sociallinks: {
      instagram: "https://www.instagram.com/alankargupt.a/",
      youtube: "https://www.youtube.com/@Alankar-Gupta",
      linkedin: null,
      X: "https://x.com/aguptaYT?t=Gts1PBTZOQOdaCoCGp6w6w&s=08",
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
          {LandingInfluencerData.map((item, index) => (
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
                <div className="flex justify-center items-center gap-4 bg-dark-black-651 rounded-[16px] md:px-6 md:py-4 px-3 py-3">
                  {item.sociallinks.instagram && (
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
                  )}
                  {item.sociallinks.youtube && (
                    <button
                      className="flex items-center justify-center border-2 border-white rounded-full px-[11px] py-[12px] md:h-[46px] md:w-[46px] h-10 w-10"
                      onClick={() => {
                        window.open(item.sociallinks.youtube as string);
                        setPlayMarquee(false);
                        setSelectedInfluencer(item.influencer_url);
                      }}
                    >
                      <Image src="/assets/icons/linkedin.svg" alt="I" height={24} width={24} />
                    </button>
                  )}
                  {item.sociallinks.X && (
                    <button
                      className="flex items-center justify-center border-2 border-white rounded-full px-[11px] py-[12px] md:h-[46px] md:w-[46px] h-10 w-10"
                      onClick={() => {
                        window.open(item.sociallinks.X as string);
                        setPlayMarquee(false);
                        setSelectedInfluencer(item.influencer_url);
                      }}
                    >
                      <Image src="/assets/icons/twitter.svg" alt="I" height={24} width={24} />
                    </button>
                  )}
                  {item.sociallinks.linkedin && (
                    <button
                      className="flex items-center justify-center border-2 border-white rounded-full px-[11px] py-[12px] md:h-[46px] md:w-[46px] h-10 w-10"
                      onClick={() => {
                        window.open(item.sociallinks.linkedin as string);
                        setPlayMarquee(false);
                        setSelectedInfluencer(item.influencer_url);
                      }}
                    >
                      <Image src="/assets/icons/linkedin.svg" alt="I" height={24} width={24} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Marquee>
        <Link href={"/login"}>
          <Button className="md:w-[352px] w-[280px]" size={"xl"}>
            EXPLORE MORE TALENTS
          </Button>
        </Link>
      </section>
    </>
  );
};

export default Influencers;
