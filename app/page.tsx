import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <Navbar />
      <Hero />
    </main>
  );
}
