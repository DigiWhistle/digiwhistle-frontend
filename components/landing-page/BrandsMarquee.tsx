// @ts-nocheck
"use client";
import { getRequest } from "@/lib/config/axios";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const brandImages = [
  {
    name: "Airtel",
    url: "/assets/brands/airtel.webp",
  },
  {
    name: "amazon_fresh",
    url: "/assets/brands/amazon_fresh.webp",
  },
  {
    name: "angel_one",
    url: "/assets/brands/angel_one.webp",
  },
  {
    name: "bajaj_finserv",
    url: "/assets/brands/bajaj_finserv.webp",
  },
  {
    name: "cred",
    url: "/assets/brands/cred.webp",
  },
  {
    name: "ditto",
    url: "/assets/brands/ditto.webp",
  },
  {
    name: "growth_school",
    url: "/assets/brands/growth_school.webp",
  },
  {
    name: "groww",
    url: "/assets/brands/groww.webp",
  },
  {
    name: "honeywell",
    url: "/assets/brands/honeywell.webp",
  },
  {
    name: "icici_prudential",
    url: "/assets/brands/icici_prudential.webp",
  },
  {
    name: "incred_money",
    url: "/assets/brands/incred_money.webp",
  },
  {
    name: "klarity_life",
    url: "/assets/brands/klarity_life.webp",
  },
  {
    name: "one_score",
    url: "/assets/brands/one_score.webp",
  },
  {
    name: "kotak_812",
    url: "/assets/brands/kotak_812.webp",
  },
  {
    name: "liquid",
    url: "/assets/brands/liquid.webp",
  },
  {
    name: "lpu",
    url: "/assets/brands/lpu.webp",
  },
  {
    name: "master_union",
    url: "/assets/brands/master_union.webp",
  },
  {
    name: "meesho",
    url: "/assets/brands/meesho.webp",
  },
  {
    name: "mobikwik",
    url: "/assets/brands/mobikwik.webp",
  },
  {
    name: "newton_school",
    url: "/assets/brands/newton_school.webp",
  },
  {
    name: "nykaa",
    url: "/assets/brands/nykaa.webp",
  },
  {
    name: "o_hi",
    url: "/assets/brands/o_hi.webp",
  },
  {
    name: "odoo",
    url: "/assets/brands/odoo.webp",
  },
  {
    name: "one_card",
    url: "/assets/brands/one_card.webp",
  },
  {
    name: "one_finance",
    url: "/assets/brands/one_finance.webp",
  },

  {
    name: "paytm",
    url: "/assets/brands/paytm.webp",
  },
  {
    name: "pepper_money",
    url: "/assets/brands/pepper_money.webp",
  },
  {
    name: "policy_bazaar",
    url: "/assets/brands/policy_bazaar.webp",
  },
  {
    name: "seed",
    url: "/assets/brands/seed.webp",
  },
  {
    name: "simandhar_education",
    url: "/assets/brands/simandhar_education.webp",
  },
  {
    name: "stable_money",
    url: "/assets/brands/stable_money.webp",
  },
  {
    name: "upi",
    url: "/assets/brands/upi.webp",
  },
  {
    name: "upstox",
    url: "/assets/brands/upstox.webp",
  },
  {
    name: "zoomcar",
    url: "/assets/brands/zoomcar.webp",
  },
];
const halfIndex = Math.ceil(brandImages.length / 2);
const firstHalf = brandImages.slice(0, halfIndex);
const secondHalf = brandImages.slice(halfIndex);
const BrandsMarquee = () => {
  // const [brands, setBrands] = useState([]);
  // const halfIndex = Math.ceil((brands?.length || 0) / 2);
  // const firstHalf = brands.slice(0, halfIndex);
  // const secondHalf = brands.slice(halfIndex);

  // useLayoutEffect(() => {
  //   const fetchBrands = async () => {
  //     const response = await getRequest<[]>("brand/list");

  //     if (response.data) {
  //       setBrands(response.data);
  //     }
  //     console.log(response.data);
  //   };

  //   fetchBrands();
  // }, []);

  return (
    <div className="my-10 space-y-8 w-full h-full overflow-hidden">
      <Marquee pauseOnHover pauseOnClick gradient>
        {firstHalf?.length > 0 &&
          firstHalf.map((brand, index) => (
            <Image
              key={index}
              src={brand.url ?? ""}
              alt={brand.name}
              width={10000}
              height={10000}
              className="w-auto h-10 mx-5 place-self-center cursor-pointer transition-all duration-300 ease-in-out self-center object-cover grayscale hover:grayscale-0"
              // onClick={() => window.open(`/brand-report/${brand.id}`)}
            />
          ))}
      </Marquee>
      <Marquee pauseOnHover pauseOnClick gradient direction="right">
        {secondHalf?.length > 0 &&
          secondHalf.map((brand, index) => (
            <Image
              key={index}
              src={brand.url ?? ""}
              alt={brand.name}
              width={10000}
              height={10000}
              className="w-auto h-10 mx-5 place-self-center cursor-pointer transition-all duration-300 ease-in-out object-fill grayscale hover:grayscale-0"
              // onClick={() => window.open(`/brand-report/${brand.id}`)}
            />
          ))}
      </Marquee>
    </div>
  );
};

export default BrandsMarquee;
