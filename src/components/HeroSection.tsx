import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "@/assets/hero-wedding.jpg";
import coupleImage from "@/assets/couple-1.jpg";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";
import { FloralSide4, Floral5, FloralExposure, GoldenFloral } from "./FloralDecorations";
gsap.registerPlugin(ScrollTrigger);
interface HeroSectionProps {
  guestName?: string;
}
const HeroSection = ({
  guestName
}: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const floralsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out"
        }
      });

      // Floral decorations scale in
      if (floralsRef.current) {
        const florals = floralsRef.current.querySelectorAll('.floral-item');
        tl.from(florals, {
          scale: 0.5,
          opacity: 0,
          duration: 1,
          stagger: 0.1
        }, 0);
      }

      // Tagline animation
      tl.from(taglineRef.current, {
        y: -50,
        opacity: 0,
        duration: 1
      }, 0.3);

      // Date badge
      tl.from(dateRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.7
      }, 0.5);

      // Names
      tl.from(namesRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7
      }, 0.6);

      // Gallery grid
      if (galleryRef.current) {
        const photos = galleryRef.current.querySelectorAll('.photo-item');
        tl.from(photos, {
          y: 50,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          stagger: 0.1
        }, 0.7);
      }

      // Guest name
      if (guestRef.current) {
        tl.from(guestRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.7
        }, 1);
      }

      // Scroll indicator
      tl.from(scrollIndicatorRef.current, {
        opacity: 0,
        duration: 1
      }, 1.2);

      // Pulsing scroll indicator
      gsap.to(scrollIndicatorRef.current?.querySelector('.scroll-line'), {
        opacity: 0.3,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Parallax effect on scroll
      gsap.to(taglineRef.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        }
      });
      gsap.to(galleryRef.current, {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream">
      {/* Background with soft texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-warm-cream to-cream opacity-90" />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30" style={{
      backgroundImage: `radial-gradient(circle at 20% 50%, hsl(10, 35%, 72%, 0.15) 0%, transparent 50%),
                          radial-gradient(circle at 80% 30%, hsl(100, 20%, 50%, 0.1) 0%, transparent 40%),
                          radial-gradient(circle at 60% 80%, hsl(10, 35%, 72%, 0.1) 0%, transparent 45%)`
    }} />

      {/* Floral Decorations */}
      <div ref={floralsRef}>
        <FloralDecoration position="top-left" size="lg" className="floral-item opacity-70" />
        <FloralDecoration position="top-right" size="md" className="floral-item opacity-60" />
        <FloralDecoration position="bottom-left" size="md" className="floral-item opacity-50" />
        <FloralDecoration position="bottom-right" size="lg" className="floral-item opacity-70" />
        <FloralSide4 position="left" size="lg" className="floral-item opacity-60" />
        <Floral5 position="right" size="md" className="floral-item opacity-50" />
        <GoldenFloral position="top-right" size="sm" className="floral-item opacity-40 top-20 right-4" />
        <FloralExposure position="bottom-left" size="sm" className="floral-item opacity-50 bottom-20 left-4" />
      </div>

      {/* Sparkle decorations */}
      <SparklesDecoration count={8} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-16">
        {/* Main Tagline */}
        <div ref={taglineRef} className="mb-8">
          <h1 className="font-script text-5xl md:text-7xl lg:text-8xl mb-4">
            <span className="text-dusty-rose">Dua Hati</span>
            {" "}
            <span className="text-sage-green">Satu Cerita</span>
          </h1>
        </div>

        {/* Date Badge */}
        <div ref={dateRef} className="mb-6">
          <div className="inline-flex items-center gap-3 px-6 py-2 border-2 border-dusty-rose/40 rounded-lg bg-cream/80 backdrop-blur-sm">
            <span className="font-elegant text-lg md:text-xl text-foreground tracking-wider">
              16/01/2026
            </span>
          </div>
        </div>

        {/* Names */}
        <div ref={namesRef} className="mb-10">
          <p className="font-display text-xl md:text-2xl text-muted-foreground tracking-[0.3em] uppercase">
            Oky Dwi Prasetyo & Mita Berliana
          </p>
        </div>

        {/* Photo Gallery Grid */}
        <div ref={galleryRef} className="grid grid-cols-12 gap-3 md:gap-4 max-w-3xl mx-auto mb-10">
          {/* Main large photo */}
          <div className="photo-item col-span-5 row-span-2">
            <div className="photo-frame photo-frame-rounded h-full overflow-hidden touch-lift">
              <img src={coupleImage} alt="Oky & Mita" className="w-full h-full object-cover min-h-[200px] md:min-h-[300px]" />
            </div>
          </div>

          {/* Arch photo */}
          <div className="photo-item col-span-4">
            <div className="photo-frame photo-frame-arch h-32 md:h-40 overflow-hidden touch-lift">
              <img src={heroImage} alt="Wedding decoration" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Small square photo */}
          <div className="photo-item col-span-3">
            <div className="photo-frame photo-frame-rounded h-32 md:h-40 overflow-hidden touch-lift">
              <img src={heroImage} alt="Wedding detail" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Circle photo */}
          <div className="photo-item col-span-3">
            <div className="photo-frame photo-frame-circle w-24 h-24 md:w-28 md:h-28 mx-auto overflow-hidden touch-lift">
              <img src={heroImage} alt="Wedding rings" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Bottom photos */}
          
        </div>

        {/* Guest Name */}
        {guestName && <div ref={guestRef} className="mt-8">
            
            
          </div>}

        {/* Scroll Indicator */}
        <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-muted-foreground touch-bounce cursor-pointer">
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;