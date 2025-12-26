import { useState } from "react";
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
import MiniAudioPlayer from "@/components/MiniAudioPlayer";
import { useGuestName } from "@/hooks/useGuestName";

const Index = () => {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const { guestName, isLoading } = useGuestName();

  // Wait for guest name to load before showing envelope
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-dusty-rose border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-display text-sm tracking-widest">Loading...</p>
        </div>
      </div>
    );
  }

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
        
        {/* Mini Audio Player */}
        {isEnvelopeOpened && <MiniAudioPlayer />}
      </main>
    </>
  );
};

export default Index;
