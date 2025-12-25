import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloralDecoration from "./FloralDecoration";

gsap.registerPlugin(ScrollTrigger);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const blocksRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const weddingDate = new Date("2026-01-16T07:00:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Title scale in
      gsap.from(titleRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Time blocks stagger
      if (blocksRef.current) {
        const blocks = blocksRef.current.querySelectorAll('.time-block');
        gsap.from(blocks, {
          y: 50,
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: blocksRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // Divider width animation
      gsap.from(dividerRef.current, {
        width: 0,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: dividerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const timeBlocks = [
    { value: timeLeft.days, label: "Hari" },
    { value: timeLeft.hours, label: "Jam" },
    { value: timeLeft.minutes, label: "Menit" },
    { value: timeLeft.seconds, label: "Detik" },
  ];

  return (
    <section
      ref={sectionRef}
      id="countdown-section"
      className="py-24 bg-gradient-to-b from-cream via-blush-pink/20 to-cream relative overflow-hidden"
    >
      <FloralDecoration position="top-left" size="sm" className="opacity-30" />
      <FloralDecoration position="bottom-right" size="sm" className="opacity-30" />

      <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
        <div>
          <p ref={headerRef} className="font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase">
            Menuju Hari Bahagia
          </p>
          <h2 ref={titleRef} className="font-script text-5xl md:text-6xl mb-12">
            <span className="text-sage-green">Hitung Mundur</span>
          </h2>
        </div>

        <div
          ref={blocksRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {timeBlocks.map((block) => (
            <div
              key={block.label}
              className="time-block glass-card rounded-2xl p-6 md:p-8 touch-bounce border-dusty-rose/20"
            >
              <span className="font-elegant text-4xl md:text-5xl lg:text-6xl font-light text-dusty-rose block mb-2">
                {String(block.value).padStart(2, "0")}
              </span>
              <span className="text-sm tracking-widest text-muted-foreground uppercase font-display">
                {block.label}
              </span>
            </div>
          ))}
        </div>

        <div ref={dividerRef} className="mt-12 section-divider w-24 mx-auto" />
      </div>
    </section>
  );
};

export default CountdownSection;
