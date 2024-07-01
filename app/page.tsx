"use client";
import BrandsMarquee from "@/components/BrandsMarquee";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Offerings from "@/components/Offerings";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    AOS.init({
      offset: 150,
      once: true,
    });
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center gap-4">
      <Navbar />
      <Hero />
      <BrandsMarquee />
      <Offerings />
    </main>
  );
}
