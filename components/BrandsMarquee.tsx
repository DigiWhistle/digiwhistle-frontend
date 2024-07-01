import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

const brandImages = [
  {
    name: "Cred",
    url: "/assets/brands/cred.png",
  },
  {
    name: "Groww",
    url: "/assets/brands/groww.png",
  },
  {
    name: "ICICI",
    url: "/assets/brands/icici.png",
  },
  {
    name: "Amazon",
    url: "/assets/brands/amazon.png",
  },
  {
    name: "Cred",
    url: "/assets/brands/cred.png",
  },
  {
    name: "Groww",
    url: "/assets/brands/groww.png",
  },
  {
    name: "ICICI",
    url: "/assets/brands/icici.png",
  },
  {
    name: "Amazon",
    url: "/assets/brands/amazon.png",
  },
  {
    name: "Cred",
    url: "/assets/brands/cred.png",
  },
  {
    name: "Groww",
    url: "/assets/brands/groww.png",
  },
  {
    name: "ICICI",
    url: "/assets/brands/icici.png",
  },
  {
    name: "Amazon",
    url: "/assets/brands/amazon.png",
  },
];
const BrandsMarquee = () => {
  return (
    <div className="my-10 space-y-8 w-full h-full overflow-hidden">
      <Marquee pauseOnHover pauseOnClick gradient className="smooth-marquee-wrapper">
        {brandImages.map((brand, index) => (
          <Image
            key={index}
            src={brand.url}
            alt={brand.name}
            width={126}
            height={34}
            className="mx-5 place-self-center cursor-pointer transition-all duration-300 ease-in-out"
          />
        ))}
      </Marquee>
      <Marquee pauseOnHover pauseOnClick gradient direction="right">
        {brandImages.map((brand, index) => (
          <Image
            key={index}
            src={brand.url}
            alt={brand.name}
            width={126}
            height={34}
            className="mx-5 place-self-center cursor-pointer transition-all duration-300 ease-in-out"
          />
        ))}
      </Marquee>
    </div>
  );
};

export default BrandsMarquee;
