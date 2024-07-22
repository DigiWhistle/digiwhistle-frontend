import BrandsMarquee from "@/components/landing-page/BrandsMarquee";
import Hero from "@/components/landing-page/Hero";
import Navbar from "@/components/landing-page/Navbar";
import Offerings from "@/components/landing-page/Offerings";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Testimonials from "@/components/landing-page/Testimonials";
import ContactUs from "@/components/landing-page/ContactUs";
import About from "@/components/landing-page/About";
import Influencers from "@/components/landing-page/Influencers";
import Providers from "../Providers";
export default function Home() {
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
