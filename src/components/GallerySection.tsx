import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import venue from "@/assets/venue.jpg";
import hero from "@/assets/hero-wedding.jpg";
import couplePrewedding from "@/assets/couple-prewedding.png";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";

gsap.registerPlugin(ScrollTrigger);

const GallerySection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const galleryImages = [
    { src: couple1, alt: "Oky dan Mita - Foto 1", caption: "Our First Meeting" },
    { src: couple2, alt: "Oky dan Mita - Foto 2", caption: "Love Blossoms" },
    { src: couplePrewedding, alt: "Pre-wedding", caption: "Pre-Wedding" },
    { src: venue, alt: "Venue pernikahan", caption: "Our Special Day" },
    { src: hero, alt: "Dekorasi pernikahan", caption: "Beautiful Moments" },
    { src: couple1, alt: "Oky dan Mita - Foto 3", caption: "Together Forever" },
    { src: couple2, alt: "Oky dan Mita - Foto 4", caption: "Sweet Memories" },
    { src: couplePrewedding, alt: "Pre-wedding 2", caption: "Happiness" },
  ];

  return (
    <section ref={sectionRef} id="gallery-section" className="py-24 bg-gradient-to-b from-cream via-blush-pink/20 to-cream relative overflow-hidden">
      <FloralDecoration position="top-left" size="md" className="opacity-60" variant={1} />
      <FloralDecoration position="bottom-right" size="md" className="opacity-60" variant={2} />
      <SparklesDecoration count={5} />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <p className="font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase">Momen Bahagia</p>
          <h2 className="font-script text-5xl md:text-6xl mb-6"><span className="text-sage-green">Galeri</span> <span className="text-dusty-rose">Kami</span></h2>
          <div className="section-divider w-24 mx-auto" />
        </div>

        <div className="swaying-gallery">
          {galleryImages.map((image, index) => (
            <figure key={index} className="swaying-figure">
              <img src={image.src} alt={image.alt} loading="lazy" />
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-8">✨ Foto bergoyang perlahan seperti tertiup angin</p>
      </div>
    </section>
  );
};

export default GallerySection;
