import BrandsMarquee from "@/components/BrandsMarquee";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4">
      <Navbar />
      <Hero />
      <BrandsMarquee />
    </main>
  );
}
