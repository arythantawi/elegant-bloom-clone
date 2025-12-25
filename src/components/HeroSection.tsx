import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroPhoto1 from "@/assets/hero-photo-1.png";
import heroPhoto2 from "@/assets/hero-photo-2.png";
import heroPhoto3 from "@/assets/hero-photo-3.png";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";
import { FloralSide4, Floral5, FloralExposure, GoldenFloral } from "./FloralDecorations";
gsap.registerPlugin(ScrollTrigger);
interface HeroSectionProps {
  guestName?: string;
}

interface PhotoWithCaptionProps {
  src: string;
  alt: string;
  caption: string;
  location: string;
  isMain?: boolean;
  rotation?: "left" | "right" | "none";
}

const PhotoWithCaption = ({
  src,
  alt,
  caption,
  location,
  isMain = false,
  rotation = "none",
}: PhotoWithCaptionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (captionRef.current) {
      gsap.to(captionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.to(captionRef.current.querySelector(".caption-bg"), {
        scaleY: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(captionRef.current.querySelectorAll(".caption-text"), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.15,
        ease: "power2.out",
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (captionRef.current) {
      gsap.to(captionRef.current.querySelectorAll(".caption-text"), {
        opacity: 0,
        y: 8,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
      });
      gsap.to(captionRef.current.querySelector(".caption-bg"), {
        scaleY: 0,
        duration: 0.4,
        delay: 0.1,
        ease: "power2.in",
      });
      gsap.to(captionRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.4,
        delay: 0.15,
        ease: "power2.in",
      });
    }
  }, []);

  const rotationClass =
    rotation === "left"
      ? "-rotate-3 hover:rotate-0"
      : rotation === "right"
      ? "rotate-3 hover:rotate-0"
      : "";

  if (isMain) {
    return (
      <div
        ref={containerRef}
        className="photo-item relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-cream/50 transform hover:scale-[1.02] transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-t from-dusty-rose/20 via-transparent to-sage-green/10 z-10 pointer-events-none" />
          <img src={src} alt={alt} className="w-full h-full object-cover" />
          {/* Caption overlay */}
          <div
            ref={captionRef}
            className="absolute bottom-0 left-0 right-0 z-20 opacity-0 translate-y-3"
          >
            <div className="caption-bg absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/50 to-transparent origin-bottom scale-y-0" />
            <div className="relative p-4 md:p-6 text-center">
              <p className="caption-text font-script text-xl md:text-2xl text-cream opacity-0 translate-y-2">
                {caption}
              </p>
              <p className="caption-text text-xs md:text-sm text-cream/80 tracking-widest uppercase mt-1 opacity-0 translate-y-2">
                {location}
              </p>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-dusty-rose/60 rounded-tl-lg" />
        <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-dusty-rose/60 rounded-tr-lg" />
        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-sage-green/60 rounded-bl-lg" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-sage-green/60 rounded-br-lg" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="photo-item relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative w-36 h-44 md:w-44 md:h-56 rounded-2xl overflow-hidden shadow-xl border-2 border-cream/40 transform ${rotationClass} transition-all duration-500 group-hover:shadow-2xl`}
      >
        <div
          className={`absolute inset-0 ${
            rotation === "left"
              ? "bg-gradient-to-br from-sage-green/15"
              : "bg-gradient-to-bl from-dusty-rose/15"
          } to-transparent z-10 pointer-events-none`}
        />
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Caption overlay */}
        <div
          ref={captionRef}
          className="absolute bottom-0 left-0 right-0 z-20 opacity-0 translate-y-2"
        >
          <div className="caption-bg absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent origin-bottom scale-y-0" />
          <div className="relative p-3 text-center">
            <p className="caption-text font-script text-base md:text-lg text-cream opacity-0 translate-y-2">
              {caption}
            </p>
            <p className="caption-text text-[10px] md:text-xs text-cream/80 tracking-wider uppercase mt-0.5 opacity-0 translate-y-2">
              {location}
            </p>
          </div>
        </div>
      </div>
      {/* Floating sparkle */}
      <div
        className={`absolute ${
          rotation === "left" ? "-top-2 -right-2" : "-bottom-2 -left-2"
        } w-4 h-4 ${
          rotation === "left" ? "text-dusty-rose" : "text-sage-green"
        } opacity-60`}
      >
        ✦
      </div>
    </div>
  );
};

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
  
  // Typing effect state
  const [displayedName, setDisplayedName] = useState("");
  const fullName = "Oky Dwi Prasetyo & Mita Berliana";
  const [showCursor, setShowCursor] = useState(true);
  // Typing effect for names
  useEffect(() => {
    let currentIndex = 0;
    const typingDelay = 2000; // Wait before starting typing
    
    const startTyping = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullName.length) {
          setDisplayedName(fullName.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          // Keep cursor blinking for a bit then hide
          setTimeout(() => setShowCursor(false), 1500);
        }
      }, 80); // Speed of typing
      
      return () => clearInterval(typingInterval);
    }, typingDelay);
    
    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    
    return () => {
      clearTimeout(startTyping);
      clearInterval(cursorInterval);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 2.2,
        },
      });

      // Floral decorations scale in - extra smooth
      if (floralsRef.current) {
        const florals = floralsRef.current.querySelectorAll(".floral-item");
        tl.from(
          florals,
          {
            scale: 0.78,
            opacity: 0,
            duration: 2.8,
            stagger: 0.22,
            ease: "power2.out",
          },
          0
        );
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

      // Gallery grid with slow, smooth staggered entrance and floating animation
      if (galleryRef.current) {
        const photos = galleryRef.current.querySelectorAll(".photo-item");

        // Initial entrance animation - slower and smoother
        tl.from(
          photos,
          {
            y: 80,
            opacity: 0,
            scale: 0.92,
            rotateY: -6,
            duration: 3.2,
            stagger: 0.6,
            ease: "power3.out",
          },
          0.9
        );

        // Continuous floating animation - gentler and slower
        photos.forEach((photo, index) => {
          gsap.to(photo, {
            y: index % 2 === 0 ? -4 : 4,
            duration: 7 + index * 0.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.45,
          });
        });
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
        y: -22,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2.8,
        },
      });
      gsap.to(galleryRef.current, {
        y: -14,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2.8,
        },
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

        {/* Names with Typing Effect */}
        <div ref={namesRef} className="mb-10 min-h-[2rem]">
          <p className="font-display text-xl md:text-2xl text-muted-foreground tracking-[0.2em] uppercase">
            {displayedName}
            <span 
              className={`inline-block w-0.5 h-5 md:h-6 bg-dusty-rose ml-1 align-middle transition-opacity duration-100 ${
                showCursor && displayedName.length < fullName.length ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </p>
        </div>

        {/* Aesthetic 3-Photo Gallery */}
        <div ref={galleryRef} className="flex flex-col items-center gap-6 max-w-3xl mx-auto mb-10">
          {/* Main Center Photo - Large with elegant frame */}
          <PhotoWithCaption
            src={heroPhoto1}
            alt="Oky & Mita"
            caption="Kencan Pertama 2024"
            location="JOKOPI - Dinoyo Surabaya"
            isMain
          />
          
          {/* Two Side Photos */}
          <div className="flex gap-4 md:gap-6">
            {/* Left Photo - Rotated slightly */}
            <PhotoWithCaption
              src={heroPhoto2}
              alt="Our moments"
              caption="Sweet Memories"
              location="Surabaya"
              rotation="left"
            />
            
            {/* Right Photo - Rotated opposite */}
            <PhotoWithCaption
              src={heroPhoto3}
              alt="Together forever"
              caption="Before Married 2025"
              location="Roketto Coffee & Co - Malang"
              rotation="right"
            />
          </div>
        </div>

        {/* Guest Name */}
        {guestName && <div ref={guestRef} className="mt-8">
            <p className="text-muted-foreground text-sm tracking-widest uppercase mb-2">Kepada Yth.</p>
            <p className="font-script text-3xl md:text-4xl text-dusty-rose">
              {guestName}
            </p>
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