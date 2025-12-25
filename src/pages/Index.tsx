import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import CoupleSection from "@/components/CoupleSection";
import CountdownSection from "@/components/CountdownSection";
import LoveStorySection from "@/components/LoveStorySection";
import EventSection from "@/components/EventSection";
import GallerySection from "@/components/GallerySection";
import ArtGeneratorSection from "@/components/ArtGeneratorSection";
import GiftSection from "@/components/GiftSection";
import RSVPSection from "@/components/RSVPSection";
import FooterSection from "@/components/FooterSection";
import EnvelopeOpening from "@/components/EnvelopeOpening";

const Index = () => {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [searchParams] = useSearchParams();

  const guestName = searchParams.get("to")?.replace(/_/g, " ") || undefined;

  return (
    <>
      {!isEnvelopeOpened && (
        <EnvelopeOpening
          onOpen={() => setIsEnvelopeOpened(true)}
          guestName={guestName}
        />
      )}

      <main
        className={`min-h-screen bg-cream transition-opacity duration-700 ${
          isEnvelopeOpened ? "opacity-100" : "opacity-0"
        }`}
      >
        <HeroSection guestName={guestName} />
        <CoupleSection />
        <CountdownSection />
        <LoveStorySection />
        <EventSection />
        <GallerySection />
        <ArtGeneratorSection />
        <GiftSection />
        <RSVPSection />
        <FooterSection />
      </main>
    </>
  );
};

export default Index;
