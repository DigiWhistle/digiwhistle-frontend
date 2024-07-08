import React from "react";

const Title = ({ title }: { title: string }) => {
  return (
    <div className="flex  flex-col items-center gap-5" data-aos="fade-up">
      <h3 className="text-display-xxs md:text-display-xs lg:text-display-s">{title}</h3>
      <div className="h-1 w-20 bg-gradient-2 rounded-full"></div>
    </div>
  );
};

export default Title;
