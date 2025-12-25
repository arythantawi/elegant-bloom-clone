import { useState, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import gsap from "gsap";
import ConfettiEffect from "./ConfettiEffect";
import FloralDecoration from "./FloralDecoration";
import couplePrewedding from "@/assets/couple-prewedding.png";

interface EnvelopeOpeningProps {
  onOpen: () => void;
  guestName?: string;
}

const EnvelopeOpening = ({
  onOpen,
  guestName
}: EnvelopeOpeningProps) => {
  const [isFullyOpen, setIsFullyOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations
      const tl = gsap.timeline();

      // Image scale in
      tl.from(imageRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });

      // Header fade up
      tl.from(headerRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5");

      // Footer fade up
      tl.from(footerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6");

      // Sparkles twinkle
      if (sparklesRef.current) {
        const sparkles = sparklesRef.current.querySelectorAll('.sparkle-item');
        sparkles.forEach((sparkle, i) => {
          gsap.to(sparkle, {
            opacity: 0.3,
            scale: 0.8,
            rotation: 180,
            duration: 1.5 + i * 0.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.3
          });
        });
      }
    });

    // Auto open after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(true);

      // Animate overlay
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.7,
        ease: "power2.inOut",
        onComplete: () => {
          setIsFullyOpen(true);
          setTimeout(() => onOpen(), 800);
        }
      });
    }, 5000);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [onOpen]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-gradient-to-b from-cream via-warm-cream to-cream flex items-center justify-center overflow-hidden">
      <ConfettiEffect isActive={showConfetti} />

      {/* Background Photo */}
      <div className="absolute inset-0">
        <img ref={imageRef} alt="Couple Prewedding" className="w-full h-full object-cover" src={couplePrewedding} />
      </div>

      {/* Floral Decorations */}
      <FloralDecoration position="top-left" size="lg" className="opacity-50" />
      <FloralDecoration position="top-right" size="md" className="opacity-40" />
      <FloralDecoration position="bottom-left" size="md" className="opacity-40" />
      <FloralDecoration position="bottom-right" size="lg" className="opacity-50" />

      {/* Sparkles */}
      <div ref={sparklesRef}>
        {[...Array(6)].map((_, i) => (
          <Sparkles
            key={i}
            className="sparkle-item absolute text-dusty-rose/40"
            style={{
              left: `${10 + i * 15}%`,
              top: `${15 + i % 3 * 25}%`,
              width: `${14 + i % 3 * 6}px`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div ref={headerRef} className="absolute top-8 left-0 right-0 text-center">
        <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-1 font-display">
          The Wedding of
        </p>
      </div>

      {/* Footer with Guest Name */}
      <div ref={footerRef} className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-sm text-muted-foreground tracking-widest font-display">
          Kepada Yth: <span className="font-script text-xl text-foreground">{guestName || "Tamu Undangan"}</span>
        </p>
      </div>

      {/* Overlay for transition */}
      <div ref={overlayRef} className="absolute inset-0 bg-cream pointer-events-none" style={{
        opacity: 0
      }} />
    </div>
  );
};

export default EnvelopeOpening;
