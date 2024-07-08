"use client";
import BrandsMarquee from "@/components/BrandsMarquee";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Offerings from "@/components/Offerings";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Testimonials from "@/components/Testimonials";
import ContactUs from "@/components/ContactUs";
import About from "@/components/About";
import Influencers from "@/components/Influencers";
export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 150,
      once: true,
    });
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <Navbar />
      <Hero />
      <BrandsMarquee />
      <Offerings />
      <Testimonials />
      <Influencers />
      <About />
      <ContactUs />
    </main>
  );
}
