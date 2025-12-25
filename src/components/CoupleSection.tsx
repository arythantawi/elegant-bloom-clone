import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";
import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";

gsap.registerPlugin(ScrollTrigger);

const CoupleSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const groomRef = useRef<HTMLDivElement>(null);
  const brideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.from(headerRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(titleRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.7,
        delay: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(dividerRef.current, {
        width: 0,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Groom card slide in from left
      gsap.from(groomRef.current, {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: groomRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Bride card slide in from right
      gsap.from(brideRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: brideRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="couple-section"
      className="py-24 bg-gradient-to-b from-cream via-warm-cream/50 to-cream relative overflow-hidden"
    >
      {/* Floral decorations */}
      <FloralDecoration position="left" size="sm" className="opacity-60" variant={3} />
      <FloralDecoration position="right" size="sm" className="opacity-60" variant={4} />

      <SparklesDecoration count={4} />

      <div className="container max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p ref={headerRef} className="font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase">
            Bismillahirrahmanirrahim
          </p>
          <h2 ref={titleRef} className="font-script text-5xl md:text-6xl mb-6">
            <span className="text-dusty-rose">Mempelai</span>
          </h2>
          <div ref={dividerRef} className="section-divider w-24 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          {/* Groom Card */}
          <figure ref={groomRef} className="profile-card group">
            <img
              src={couple1}
              alt="Oky Dwi Prasetyo"
              className="profile-card-bg"
            />
            <img
              src={couple1}
              alt="Oky Dwi Prasetyo"
              className="profile-card-avatar"
            />
            <figcaption className="profile-card-caption">
              <h3 className="profile-card-name">
                Oky Dwi Prasetyo, S.Kom
                <span>Putra kedua dari</span>
              </h3>
              <div className="profile-card-parents">
                <span className="text-foreground/90 font-medium">(Alm.) Sulaiman</span>
                <span className="text-dusty-rose font-script text-xl mx-2">&</span>
                <span className="text-foreground/90 font-medium">Suji Rahayu</span>
              </div>
            </figcaption>
          </figure>

          {/* Bride Card */}
          <figure ref={brideRef} className="profile-card group">
            <img
              src={couple2}
              alt="Mita Berliana"
              className="profile-card-bg"
            />
            <img
              src={couple2}
              alt="Mita Berliana"
              className="profile-card-avatar"
            />
            <figcaption className="profile-card-caption">
              <h3 className="profile-card-name">
                Mita Berliana, S.Si, M.Si
                <span>Putri kedua dari</span>
              </h3>
              <div className="profile-card-parents">
                <span className="text-foreground/90 font-medium">Agus Bambang Dwi Purwanto</span>
                <span className="text-sage-green font-script text-xl mx-2">&</span>
                <span className="text-foreground/90 font-medium">Uchuda</span>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default CoupleSection;
