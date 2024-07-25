"use client";
import Aos from "aos";
import React, { useEffect } from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      offset: 150,
      once: true,
    });
    Aos.refresh();
  }, []);
  return <div>{children}</div>;
};

export default Providers;
