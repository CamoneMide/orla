import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Capabilities } from "@/components/sections/Capabilities";
import { Rooms } from "@/components/sections/Rooms";
import { Signals } from "@/components/sections/Signals";
import { Materials } from "@/components/sections/Materials";
import { Bento } from "@/components/sections/Bento";
import { Faq } from "@/components/sections/Faq";
import { QuickStats } from "@/components/sections/QuickStats";
import { Pricing } from "@/components/sections/Pricing";
import { Reviews } from "@/components/sections/Reviews";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Capabilities />
      <Rooms />
      <Signals />
      <Materials />
      <Bento />
      <Faq />
      <QuickStats />
      <Pricing />
      <Reviews />
    </>
  );
}
