import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Instagram, Mail } from "lucide-react";
import FloralDecoration from "./FloralDecoration";

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        // Names animation
        gsap.fromTo(contentRef.current.querySelector('.footer-names'),
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Date
        gsap.fromTo(contentRef.current.querySelector('.footer-date'),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Quote
        gsap.fromTo(contentRef.current.querySelector('.footer-quote'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Social links
        const socialLinks = contentRef.current.querySelectorAll('.social-link');
        gsap.fromTo(socialLinks,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Footer credit
        gsap.fromTo(contentRef.current.querySelector('.footer-credit'),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} id="footer-section" className="py-16 bg-foreground text-cream relative overflow-hidden">
      <FloralDecoration position="top-left" size="sm" className="opacity-20" />
      <FloralDecoration position="top-right" size="sm" className="opacity-20" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dusty-rose/50 to-transparent" />

      <div ref={contentRef} className="container max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="footer-names font-script text-5xl md:text-6xl mb-4">
          <span className="text-dusty-rose">Oky</span> & <span className="text-sage-green">Mita</span>
        </h2>

        <p className="footer-date text-cream/60 mb-8 font-elegant text-xl italic">16 - 17 Januari 2026</p>

        <blockquote className="footer-quote max-w-lg mx-auto mb-10">
          <p className="text-cream/80 italic leading-relaxed font-display">"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang."</p>
          <cite className="block mt-4 text-dusty-rose text-sm font-display">— QS. Ar-Rum: 21</cite>
        </blockquote>

        <div className="flex items-center justify-center gap-6 mb-10">
          <a href="#" className="social-link w-12 h-12 rounded-full bg-cream/10 hover:bg-dusty-rose/30 flex items-center justify-center touch-bounce transition-colors"><Instagram className="w-5 h-5" /></a>
          <a href="mailto:oky.mita@wedding.com" className="social-link w-12 h-12 rounded-full bg-cream/10 hover:bg-sage-green/30 flex items-center justify-center touch-bounce transition-colors"><Mail className="w-5 h-5" /></a>
        </div>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-dusty-rose/50 to-transparent mx-auto mb-8" />

        <div className="footer-credit">
          <p className="text-cream/40 text-sm flex items-center justify-center gap-2">Made with <Heart className="w-4 h-4 text-dusty-rose fill-dusty-rose animate-pulse" /> by Oky & Mita</p>
          <p className="text-cream/30 text-xs mt-2">© 2026 All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
