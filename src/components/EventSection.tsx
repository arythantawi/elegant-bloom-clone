import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Clock, MapPin } from "lucide-react";
import venueImage from "@/assets/venue.jpg";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";

gsap.registerPlugin(ScrollTrigger);

const EventSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const events = [
    { title: "Akad Nikah", date: "16 Januari 2026", time: "07:00 WIB", location: "Kediaman Mempelai Wanita", address: "Pd. Kobong, Kedungrejo, Kec. Rowokangkung, Kabupaten Lumajang, Jawa Timur", color: "dusty-rose" },
    { title: "Resepsi", date: "17 Januari 2026", time: "13:00 WIB", location: "Kediaman Mempelai Wanita", address: "Pd. Kobong, Kedungrejo, Kec. Rowokangkung, Kabupaten Lumajang, Jawa Timur", color: "sage-green" },
  ];

  return (
    <section ref={sectionRef} id="event-section" className="py-24 bg-gradient-to-b from-cream via-soft-taupe/30 to-cream relative overflow-hidden">
      <FloralDecoration position="top-right" size="md" className="opacity-40" />
      <FloralDecoration position="bottom-left" size="md" className="opacity-40" />
      <SparklesDecoration count={5} />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase">Bergabunglah Bersama Kami</p>
          <h2 className="font-script text-5xl md:text-6xl mb-6"><span className="text-dusty-rose">Detail</span> <span className="text-sage-green">Acara</span></h2>
          <div className="section-divider w-24 mx-auto" />
        </div>

        <div className="mb-16">
          <div className="relative photo-frame photo-frame-rounded max-w-4xl mx-auto touch-lift overflow-hidden">
            <img src={venueImage} alt="Wedding venue" className="w-full h-[280px] md:h-[380px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <p className="font-script text-3xl md:text-4xl text-cream">Rowokangkung, Lumajang</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {events.map((event) => (
            <div key={event.title} className={`event-card glass-card rounded-2xl p-8 text-center touch-lift ${event.color === "dusty-rose" ? "border-dusty-rose/20" : "border-sage-green/20"}`}>
              <div className={`decorative-line w-16 h-1 mx-auto mb-6 rounded-full ${event.color === "dusty-rose" ? "bg-gradient-to-r from-dusty-rose via-mauve to-dusty-rose" : "bg-gradient-to-r from-sage-green via-olive-green to-sage-green"}`} />
              <h3 className={`font-script text-4xl mb-6 ${event.color === "dusty-rose" ? "text-dusty-rose" : "text-sage-green"}`}>{event.title}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <Calendar className={`w-5 h-5 ${event.color === "dusty-rose" ? "text-dusty-rose" : "text-sage-green"}`} />
                  <span className="font-display">{event.date}</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <Clock className={`w-5 h-5 ${event.color === "dusty-rose" ? "text-dusty-rose" : "text-sage-green"}`} />
                  <span className="font-display">{event.time}</span>
                </div>
                <div className="pt-4 border-t border-border/30">
                  <div className="flex items-start justify-center gap-3 text-muted-foreground">
                    <MapPin className={`w-5 h-5 mt-0.5 flex-shrink-0 ${event.color === "dusty-rose" ? "text-dusty-rose" : "text-sage-green"}`} />
                    <div>
                      <p className="font-medium text-foreground">{event.location}</p>
                      <p className="text-sm mt-1">{event.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              <a href="https://maps.google.com/?q=Q8F6+5XG,+Pd.+Kobong,+Kedungrejo,+Rowokangkung,+Lumajang" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full text-sm font-medium touch-bounce ${event.color === "dusty-rose" ? "bg-dusty-rose/20 hover:bg-dusty-rose/30 text-foreground" : "bg-sage-green/20 hover:bg-sage-green/30 text-foreground"}`}>
                <MapPin className="w-4 h-4" />Lihat Peta
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventSection;
