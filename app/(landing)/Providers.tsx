import Aos from "aos";
import React, { useEffect } from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      offset: 150,
      once: true,
    });
  }, []);
  return <main className="flex min-h-screen flex-col items-center relative">{children}</main>;
};

export default Providers;
