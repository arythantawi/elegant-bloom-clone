import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import couple1 from "@/assets/couple-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";
gsap.registerPlugin(ScrollTrigger);
const GallerySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryImages = [{
    src: couple1,
    alt: "Oky dan Mita - Foto 1",
    caption: "Our First Meeting"
  }, {
    src: gallery2,
    alt: "Oky dan Mita - Foto 2",
    caption: "Love Blossoms"
  }, {
    src: gallery3,
    alt: "Oky dan Mita - Foto 3",
    caption: "Pre-Wedding"
  }, {
    src: gallery4,
    alt: "Oky dan Mita - Foto 4",
    caption: "Our Special Day"
  }, {
    src: gallery5,
    alt: "Oky dan Mita - Foto 5",
    caption: "Beautiful Moments"
  }, {
    src: gallery6,
    alt: "Oky dan Mita - Foto 6",
    caption: "Together Forever"
  }, {
    src: gallery7,
    alt: "Oky dan Mita - Foto 7",
    caption: "Sweet Memories"
  }];
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.fromTo(headerRef.current, {
        y: 40,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
      gsap.fromTo(titleRef.current, {
        scale: 0.85,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
      gsap.fromTo(dividerRef.current, {
        scaleX: 0,
        opacity: 0
      }, {
        scaleX: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      // Gallery items stagger with rotation effect
      if (galleryRef.current) {
        const figures = galleryRef.current.querySelectorAll('.swaying-figure');
        gsap.fromTo(figures, {
          y: 80,
          opacity: 0,
          scale: 0.8,
          rotation: -5
        }, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return <section ref={sectionRef} id="gallery-section" className="py-24 bg-gradient-to-b from-cream via-blush-pink/20 to-cream relative overflow-hidden">
      <FloralDecoration position="top-left" size="md" className="opacity-60" variant={1} />
      <FloralDecoration position="bottom-right" size="md" className="opacity-60" variant={2} />
      <SparklesDecoration count={5} />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <p ref={headerRef} className="font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase">Momen Bahagia</p>
          <h2 ref={titleRef} className="font-script text-5xl md:text-6xl mb-6"><span className="text-sage-green">Galeri</span> <span className="text-dusty-rose">Kami</span></h2>
          <div ref={dividerRef} className="section-divider w-24 mx-auto origin-center" />
        </div>

        <div ref={galleryRef} className="swaying-gallery">
          {galleryImages.map((image, index) => <figure key={index} className="swaying-figure">
              <img src={image.src} alt={image.alt} loading="lazy" />
              <figcaption>{image.caption}</figcaption>
            </figure>)}
        </div>

        
      </div>
    </section>;
};
export default GallerySection;