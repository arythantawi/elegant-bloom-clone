import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";
import { GoldenFloral, FloralSide6, FloralExposure } from "./FloralDecorations";

gsap.registerPlugin(ScrollTrigger);

const LoveStorySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, { y: -30, opacity: 0, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" } });
      gsap.from(titleRef.current, { scale: 0.9, opacity: 0, duration: 0.7, delay: 0.1, ease: "back.out(1.7)", scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" } });
      gsap.from(dividerRef.current, { width: 0, opacity: 0, duration: 0.6, delay: 0.2, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const milestones = [
    { year: "2020", title: "Awal Pertemuan", subtitle: "The First Meeting", description: "Di sebuah kafe hangat di Malang, takdir mempertemukan kami dalam sebuah acara komunitas media.", color: "dusty-rose" },
    { year: "2021", title: "Perjalanan Cinta", subtitle: "The Journey of Love", description: "Di tepi danau saat golden hour, Oky mengungkapkan perasaannya dengan tulus.", color: "sage-green" },
    { year: "2024", title: "Kembali Bersama", subtitle: "Reuniting and Proposal", description: "Setelah perjalanan panjang, di malam yang tenang dengan cahaya bulan sebagai saksi, Oky berlutut dengan sebuah cincin.", color: "dusty-rose" },
    { year: "2026", title: "Hari Bahagia", subtitle: "Wedding Day", description: "Di bawah lengkungan mawar dengan fairy lights berkelip, dua hati resmi menjadi satu.", color: "sage-green" },
  ];

  return (
    <section ref={sectionRef} id="love-story-section" className="py-24 bg-cream relative overflow-hidden">
      <FloralDecoration position="top-right" size="md" className="opacity-30" />
      <FloralDecoration position="bottom-left" size="md" className="opacity-30" />
      <GoldenFloral position="left" size="md" className="opacity-35 top-1/4" />
      <FloralSide6 position="right" size="lg" className="opacity-40 bottom-1/4" />
      <SparklesDecoration count={6} />

      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p ref={headerRef} className="font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase">Perjalanan Cinta Kami</p>
          <h2 ref={titleRef} className="font-script text-5xl md:text-6xl mb-6"><span className="text-dusty-rose">Kisah</span> <span className="text-sage-green">Kami</span></h2>
          <div ref={dividerRef} className="section-divider w-24 mx-auto" />
        </div>

        <div ref={timelineRef} className="relative pl-8 border-l-2 border-dusty-rose/30">
          {milestones.map((milestone) => (
            <div key={milestone.year} className="timeline-item relative mb-12 last:mb-0">
              <div className={`timeline-dot absolute -left-[25px] w-4 h-4 rounded-full border-4 border-cream shadow-soft ${milestone.color === "dusty-rose" ? "bg-dusty-rose" : "bg-sage-green"}`} />
              <div className={`glass-card rounded-xl p-6 ml-4 ${milestone.color === "dusty-rose" ? "border-dusty-rose/20" : "border-sage-green/20"} shadow-soft`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-sm font-medium tracking-wider font-display px-3 py-1 rounded-full ${milestone.color === "dusty-rose" ? "text-dusty-rose bg-dusty-rose/10" : "text-sage-green bg-sage-green/10"}`}>{milestone.year}</span>
                  <span className="font-body text-xs text-muted-foreground italic">{milestone.subtitle}</span>
                </div>
                <h3 className="font-elegant text-xl md:text-2xl text-foreground mb-3">{milestone.title}</h3>
                <p className="font-body text-muted-foreground leading-relaxed">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveStorySection;
