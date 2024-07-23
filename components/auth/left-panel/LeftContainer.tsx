import React from "react";
import Image from "next/image";
const LeftContainer = () => {
  return (
    <div className="flex flex-col flex-grow  w-full items-center bg-light-purple-511 order-3 lg:order-1  md:px-12 md:pt-12 md:pb-0 p-6">
      <div className="flex flex-col lg:w-[592px] md:w-[640px]  w-full gap-5">
        <div className="flex flex-col  items-center gap-4">
          <div className=" md:text-display-s text-display-xxs font-heading  ">
            Revolutionize your influencer marketing.
          </div>
          <div className="md:text-body-md-light text-body-sm-light  text-tc-body-grey  ">
            Earn real influence and elevate your brand with Digiwhistle&apos;s simplified, impactful
            influencer marketing.
          </div>
        </div>
        <Image
          className="lg:w-[500px]  md:w-[640px] "
          src="/assets/auth/signup.webp"
          height={590}
          width={488}
          alt="image"
        />
      </div>
    </div>
  );
};

export default LeftContainer;
