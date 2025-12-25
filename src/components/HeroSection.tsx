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
            <p className="caption-text text-[8px] md:text-[10px] text-cream/80 tracking-wide mt-0.5 opacity-0 translate-y-2 leading-tight">
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

      // Handwritten SVG path animation
      const handwrittenPaths = document.querySelectorAll('.handwritten-path');
      if (handwrittenPaths.length > 0) {
        tl.to(handwrittenPaths, {
          strokeDashoffset: 0,
          duration: 3,
          stagger: 0.8,
          ease: "power2.inOut",
        }, 0.3);
      }

      // Tagline animation (for parallax)
      tl.from(taglineRef.current, {
        y: -50,
        opacity: 0,
        duration: 1
      }, 0.1);

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
          <svg 
            viewBox="0 0 310 110" 
            className="w-full max-w-3xl mx-auto h-auto"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="taglineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--dusty-rose))" />
                <stop offset="50%" stopColor="hsl(var(--sage-green))" />
                <stop offset="100%" stopColor="hsl(var(--dusty-rose))" />
              </linearGradient>
              <clipPath id="duaHatiClip">
                <path d="M0 45.26L0 9.47L12.33 9.47Q16.50 9.47 18.70 9.99Q21.78 10.69 23.95 12.55Q26.78 14.94 28.19 18.66Q29.59 22.39 29.59 27.17Q29.59 31.25 28.64 34.40Q27.69 37.55 26.20 39.61Q24.71 41.67 22.94 42.86Q21.17 44.04 18.66 44.65Q16.16 45.26 12.92 45.26L0 45.26M4.74 41.04L12.38 41.04Q15.92 41.04 17.93 40.38Q19.95 39.72 21.14 38.53Q22.83 36.84 23.77 34.00Q24.71 31.15 24.71 27.10Q24.71 21.48 22.86 18.47Q21.02 15.45 18.38 14.43Q16.48 13.70 12.26 13.70L4.74 13.70L4.74 41.04ZM52.54 45.26L52.54 41.46Q49.51 45.85 44.31 45.85Q42.02 45.85 40.03 44.97Q38.04 44.09 37.07 42.76Q36.11 41.43 35.72 39.50Q35.45 38.21 35.45 35.40L35.45 19.34L39.84 19.34L39.84 33.72Q39.84 37.16 40.11 38.35Q40.53 40.09 41.87 41.08Q43.21 42.07 45.19 42.07Q47.17 42.07 48.90 41.05Q50.63 40.04 51.35 38.29Q52.08 36.55 52.08 33.23L52.08 19.34L56.47 19.34L56.47 45.26L52.54 45.26ZM80.27 42.07Q77.83 44.14 75.57 45.00Q73.32 45.85 70.73 45.85Q66.46 45.85 64.16 43.76Q61.87 41.67 61.87 38.43Q61.87 36.52 62.73 34.95Q63.60 33.37 65.00 32.42Q66.41 31.47 68.16 30.98Q69.46 30.64 72.07 30.32Q77.39 29.69 79.91 28.81Q79.93 27.91 79.93 27.66Q79.93 24.98 78.69 23.88Q77.00 22.39 73.68 22.39Q70.58 22.39 69.10 23.47Q67.63 24.56 66.92 27.32L62.62 26.73Q63.21 23.97 64.55 22.28Q65.89 20.58 68.43 19.67Q70.97 18.75 74.32 18.75Q77.64 18.75 79.71 19.53Q81.79 20.31 82.76 21.50Q83.74 22.68 84.13 24.49Q84.35 25.61 84.35 28.54L84.35 34.40Q84.35 40.53 84.63 42.15Q84.91 43.77 85.74 45.26L81.15 45.26Q80.47 43.90 80.27 42.07M79.91 32.25Q77.51 33.23 72.73 33.91Q70.02 34.30 68.90 34.79Q67.77 35.28 67.16 36.22Q66.55 37.16 66.55 38.31Q66.55 40.06 67.88 41.24Q69.21 42.41 71.78 42.41Q74.32 42.41 76.29 41.30Q78.27 40.19 79.20 38.26Q79.91 36.77 79.91 33.86L79.91 32.25ZM105.76 45.26L105.76 9.47L110.50 9.47L110.50 24.17L129.10 24.17L129.10 9.47L133.84 9.47L133.84 45.26L129.10 45.26L129.10 28.39L110.50 28.39L110.50 45.26L105.76 45.26ZM158.08 42.07Q155.64 44.14 153.38 45.00Q151.12 45.85 148.54 45.85Q144.26 45.85 141.97 43.76Q139.67 41.67 139.67 38.43Q139.67 36.52 140.54 34.95Q141.41 33.37 142.81 32.42Q144.21 31.47 145.97 30.98Q147.27 30.64 149.88 30.32Q155.20 29.69 157.71 28.81Q157.74 27.91 157.74 27.66Q157.74 24.98 156.49 23.88Q154.81 22.39 151.49 22.39Q148.39 22.39 146.91 23.47Q145.43 24.56 144.73 27.32L140.43 26.73Q141.02 23.97 142.36 22.28Q143.70 20.58 146.24 19.67Q148.78 18.75 152.12 18.75Q155.44 18.75 157.52 19.53Q159.59 20.31 160.57 21.50Q161.55 22.68 161.94 24.49Q162.16 25.61 162.16 28.54L162.16 34.40Q162.16 40.53 162.44 42.15Q162.72 43.77 163.55 45.26L158.96 45.26Q158.28 43.90 158.08 42.07M157.71 32.25Q155.32 33.23 150.54 33.91Q147.83 34.30 146.70 34.79Q145.58 35.28 144.97 36.22Q144.36 37.16 144.36 38.31Q144.36 40.06 145.69 41.24Q147.02 42.41 149.58 42.41Q152.12 42.41 154.10 41.30Q156.08 40.19 157.01 38.26Q157.71 36.77 157.71 33.86L157.71 32.25ZM178.56 41.33L179.20 45.21Q177.34 45.61 175.88 45.61Q173.49 45.61 172.17 44.85Q170.85 44.09 170.31 42.86Q169.78 41.63 169.78 37.67L169.78 22.75L166.55 22.75L166.55 19.34L169.78 19.34L169.78 12.92L174.15 10.28L174.15 19.34L178.56 19.34L178.56 22.75L174.15 22.75L174.15 37.92Q174.15 39.79 174.38 40.33Q174.61 40.87 175.13 41.19Q175.66 41.50 176.64 41.50Q177.37 41.50 178.56 41.33ZM182.89 14.53L182.89 9.47L187.28 9.47L187.28 14.53L182.89 14.53M182.89 45.26L182.89 19.34L187.28 19.34L187.28 45.26L182.89 45.26Z" />
              </clipPath>
              <clipPath id="satuCeritaClip">
                <path d="M0 33.76L4.47 33.37Q4.79 36.06 5.94 37.78Q7.10 39.50 9.55 40.56Q11.99 41.63 15.04 41.63Q17.75 41.63 19.82 40.82Q21.90 40.01 22.91 38.61Q23.93 37.21 23.93 35.55Q23.93 33.86 22.95 32.60Q21.97 31.35 19.73 30.49Q18.29 29.93 13.35 28.75Q8.42 27.56 6.45 26.51Q3.88 25.17 2.62 23.18Q1.37 21.19 1.37 18.73Q1.37 16.02 2.91 13.66Q4.44 11.30 7.40 10.08Q10.35 8.86 13.96 8.86Q17.94 8.86 20.98 10.14Q24.02 11.43 25.66 13.92Q27.29 16.41 27.42 19.56L22.88 19.90Q22.51 16.50 20.40 14.77Q18.29 13.04 14.16 13.04Q9.86 13.04 7.90 14.61Q5.93 16.19 5.93 18.41Q5.93 20.34 7.32 21.58Q8.69 22.83 14.47 24.13Q20.24 25.44 22.39 26.42Q25.51 27.86 27.00 30.07Q28.49 32.28 28.49 35.16Q28.49 38.01 26.86 40.54Q25.22 43.07 22.16 44.47Q19.09 45.87 15.26 45.87Q10.40 45.87 7.12 44.46Q3.83 43.04 1.97 40.20Q0.10 37.35 0 33.76ZM51.32 42.07Q48.88 44.14 46.62 45.00Q44.36 45.85 41.77 45.85Q37.50 45.85 35.21 43.76Q32.91 41.67 32.91 38.43Q32.91 36.52 33.78 34.95Q34.64 33.37 36.05 32.42Q37.45 31.47 39.21 30.98Q40.50 30.64 43.12 30.32Q48.44 29.69 50.95 28.81Q50.98 27.91 50.98 27.66Q50.98 24.98 49.73 23.88Q48.05 22.39 44.73 22.39Q41.63 22.39 40.15 23.47Q38.67 24.56 37.96 27.32L33.67 26.73Q34.25 23.97 35.60 22.28Q36.94 20.58 39.48 19.67Q42.02 18.75 45.36 18.75Q48.68 18.75 50.76 19.53Q52.83 20.31 53.81 21.50Q54.79 22.68 55.18 24.49Q55.40 25.61 55.40 28.54L55.40 34.40Q55.40 40.53 55.68 42.15Q55.96 43.77 56.79 45.26L52.20 45.26Q51.51 43.90 51.32 42.07M50.95 32.25Q48.56 33.23 43.77 33.91Q41.06 34.30 39.94 34.79Q38.82 35.28 38.21 36.22Q37.60 37.16 37.60 38.31Q37.60 40.06 38.93 41.24Q40.26 42.41 42.82 42.41Q45.36 42.41 47.34 41.30Q49.32 40.19 50.24 38.26Q50.95 36.77 50.95 33.86L50.95 32.25ZM71.80 41.33L72.44 45.21Q70.58 45.61 69.12 45.61Q66.72 45.61 65.41 44.85Q64.09 44.09 63.55 42.86Q63.01 41.63 63.01 37.67L63.01 22.75L59.79 22.75L59.79 19.34L63.01 19.34L63.01 12.92L67.38 10.28L67.38 19.34L71.80 19.34L71.80 22.75L67.38 22.75L67.38 37.92Q67.38 39.79 67.61 40.33Q67.85 40.87 68.37 41.19Q68.90 41.50 69.87 41.50Q70.61 41.50 71.80 41.33ZM93.09 45.26L93.09 41.46Q90.06 45.85 84.86 45.85Q82.57 45.85 80.58 44.97Q78.59 44.09 77.62 42.76Q76.66 41.43 76.27 39.50Q76.00 38.21 76.00 35.40L76.00 19.34L80.40 19.34L80.40 33.72Q80.40 37.16 80.66 38.35Q81.08 40.09 82.42 41.08Q83.76 42.07 85.74 42.07Q87.72 42.07 89.45 41.05Q91.19 40.04 91.91 38.29Q92.63 36.55 92.63 33.23L92.63 19.34L97.02 19.34L97.02 45.26L93.09 45.26ZM143.90 32.71L148.63 33.91Q147.14 39.75 143.27 42.81Q139.40 45.87 133.81 45.87Q128.03 45.87 124.40 43.52Q120.78 41.16 118.88 36.69Q116.99 32.23 116.99 27.10Q116.99 21.51 119.13 17.35Q121.26 13.18 125.21 11.02Q129.15 8.86 133.89 8.86Q139.26 8.86 142.92 11.60Q146.58 14.33 148.02 19.29L143.36 20.39Q142.11 16.48 139.75 14.70Q137.38 12.92 133.79 12.92Q129.66 12.92 126.89 14.89Q124.12 16.87 123.00 20.20Q121.88 23.54 121.88 27.08Q121.88 31.64 123.21 35.05Q124.54 38.45 127.34 40.14Q130.15 41.82 133.42 41.82Q137.40 41.82 140.16 39.53Q142.92 37.23 143.90 32.71ZM171.66 36.91L176.20 37.48Q175.12 41.46 172.22 43.65Q169.31 45.85 164.79 45.85Q159.11 45.85 155.77 42.35Q152.44 38.84 152.44 32.52Q152.44 25.98 155.81 22.36Q159.18 18.75 164.55 18.75Q169.75 18.75 173.05 22.29Q176.34 25.83 176.34 32.25Q176.34 32.64 176.32 33.42L156.98 33.42Q157.23 37.70 159.40 39.97Q161.57 42.24 164.82 42.24Q167.24 42.24 168.95 40.97Q170.65 39.70 171.66 36.91M157.23 29.81L171.70 29.81Q171.41 26.54 170.04 24.90Q167.94 22.36 164.60 22.36Q161.57 22.36 159.51 24.39Q157.45 26.42 157.23 29.81ZM181.67 45.26L181.67 19.34L185.62 19.34L185.62 23.27Q187.13 20.51 188.42 19.63Q189.70 18.75 191.24 18.75Q193.46 18.75 195.75 20.17L194.24 24.24Q192.63 23.29 191.02 23.29Q189.58 23.29 188.43 24.16Q187.28 25.02 186.79 26.56Q186.06 28.91 186.06 31.69L186.06 45.26L181.67 45.26ZM198.39 14.53L198.39 9.47L202.78 9.47L202.78 14.53L198.39 14.53M198.39 45.26L198.39 19.34L202.78 19.34L202.78 45.26L198.39 45.26ZM219.07 41.33L219.70 45.21Q217.85 45.61 216.38 45.61Q213.99 45.61 212.67 44.85Q211.35 44.09 210.82 42.86Q210.28 41.63 210.28 37.67L210.28 22.75L207.06 22.75L207.06 19.34L210.28 19.34L210.28 12.92L214.65 10.28L214.65 19.34L219.07 19.34L219.07 22.75L214.65 22.75L214.65 37.92Q214.65 39.79 214.88 40.33Q215.11 40.87 215.64 41.19Q216.16 41.50 217.14 41.50Q217.87 41.50 219.07 41.33ZM240.28 42.07Q237.84 44.14 235.58 45.00Q233.33 45.85 230.74 45.85Q226.46 45.85 224.17 43.76Q221.88 41.67 221.88 38.43Q221.88 36.52 222.74 34.95Q223.61 33.37 225.01 32.42Q226.42 31.47 228.17 30.98Q229.47 30.64 232.08 30.32Q237.40 29.69 239.92 28.81Q239.94 27.91 239.94 27.66Q239.94 24.98 238.70 23.88Q237.01 22.39 233.69 22.39Q230.59 22.39 229.11 23.47Q227.64 24.56 226.93 27.32L222.63 26.73Q223.22 23.97 224.56 22.28Q225.90 20.58 228.44 19.67Q230.98 18.75 234.33 18.75Q237.65 18.75 239.72 19.53Q241.80 20.31 242.77 21.50Q243.75 22.68 244.14 24.49Q244.36 25.61 244.36 28.54L244.36 34.40Q244.36 40.53 244.64 42.15Q244.92 43.77 245.75 45.26L241.16 45.26Q240.48 43.90 240.28 42.07M239.92 32.25Q237.52 33.23 232.74 33.91Q230.03 34.30 228.91 34.79Q227.78 35.28 227.17 36.22Q226.56 37.16 226.56 38.31Q226.56 40.06 227.89 41.24Q229.22 42.41 231.79 42.41Q234.33 42.41 236.30 41.30Q238.28 40.19 239.21 38.26Q239.92 36.77 239.92 33.86L239.92 32.25Z" />
              </clipPath>
            </defs>
            
            {/* Dua Hati - Line 1 */}
            <g transform="translate(60, 5) scale(0.58)">
              <path 
                className="handwritten-path"
                clipPath="url(#duaHatiClip)" 
                d="M0 27 Q50 27 100 27 Q150 27 187 27 M0 27 L187 45" 
                fill="none" 
                stroke="url(#taglineGradient)" 
                strokeWidth="55"
                style={{
                  strokeDasharray: 2000,
                  strokeDashoffset: 2000,
                }}
              />
            </g>
            
            {/* Satu Cerita - Line 2 */}
            <g transform="translate(30, 58) scale(0.58)">
              <path 
                className="handwritten-path"
                clipPath="url(#satuCeritaClip)" 
                d="M0 27 Q60 27 120 27 Q180 27 245 27 M0 27 L245 45" 
                fill="none" 
                stroke="url(#taglineGradient)" 
                strokeWidth="55"
                style={{
                  strokeDasharray: 2500,
                  strokeDashoffset: 2500,
                }}
              />
            </g>
          </svg>
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
              caption="After Engagement 2025"
              location="Gartenhütte. Kaffee und Aussicht - Trawas"
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