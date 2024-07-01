import { useState, useEffect } from "react";

const useScreenSize = () => {
  const isClient = typeof window === "object"; // Check if window is defined

  const [screenSize, setScreenSize] = useState({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const handleLoad = () => {
      handleResize();
      window.addEventListener("resize", handleResize);
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
