import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Check, Heart, Users, MessageCircle } from "lucide-react";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { id } from "date-fns/locale";

gsap.registerPlugin(ScrollTrigger);

interface RSVPData {
  id: string;
  name: string;
  email: string;
  attendance: string;
  guests: number;
  message: string | null;
  created_at: string;
}

const RSVPSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", attendance: "", guests: "1", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wishes, setWishes] = useState<RSVPData[]>([]);
  const { toast } = useToast();

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const wishesRef = useRef<HTMLDivElement>(null);

  // Fetch existing wishes
  useEffect(() => {
    const fetchWishes = async () => {
      const { data, error } = await supabase
        .from('rsvp')
        .select('*')
        .not('message', 'is', null)
        .neq('message', '')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setWishes(data);
      }
    };

    fetchWishes();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('rsvp-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'rsvp'
        },
        (payload) => {
          const newRsvp = payload.new as RSVPData;
          if (newRsvp.message && newRsvp.message.trim() !== '') {
            setWishes(prev => [newRsvp, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from('rsvp').insert({
      name: formData.name.trim(),
      email: formData.email.trim(),
      attendance: formData.attendance,
      guests: formData.attendance === 'hadir' ? parseInt(formData.guests) : 1,
      message: formData.message.trim() || null
    });

    if (error) {
      toast({ 
        title: "Gagal! ❌", 
        description: "Terjadi kesalahan saat mengirim RSVP. Silakan coba lagi.",
        variant: "destructive"
      });
    } else {
      toast({ 
        title: "Terima Kasih! 💕", 
        description: "RSVP Anda telah berhasil dikirim. Kami menantikan kehadiran Anda!" 
      });
      setFormData({ name: "", email: "", attendance: "", guests: "1", message: "" });
    }
    
    setIsSubmitting(false);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.fromTo(headerRef.current, 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out", 
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: "top 80%", 
            toggleActions: "play none none reverse" 
          } 
        }
      );

      gsap.fromTo(titleRef.current, 
        { scale: 0.85, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1, 
          ease: "back.out(1.7)", 
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: "top 75%", 
            toggleActions: "play none none reverse" 
          } 
        }
      );

      gsap.fromTo(dividerRef.current, 
        { scaleX: 0, opacity: 0 },
        { 
          scaleX: 1, 
          opacity: 1, 
          duration: 1, 
          ease: "power2.out", 
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: "top 70%", 
            toggleActions: "play none none reverse" 
          } 
        }
      );

      gsap.fromTo(descRef.current, 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out", 
          scrollTrigger: { 
            trigger: descRef.current, 
            start: "top 85%", 
            toggleActions: "play none none reverse" 
          } 
        }
      );

      // Form animation
      gsap.fromTo(formRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Form fields stagger
      if (formRef.current) {
        const fields = formRef.current.querySelectorAll('.form-field');
        gsap.fromTo(fields,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Wishes section animation
      if (wishesRef.current) {
        gsap.fromTo(wishesRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wishesRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="rsvp-section" className="py-24 bg-gradient-to-b from-cream via-dusty-rose/10 to-cream relative overflow-hidden">
      <FloralDecoration position="top-left" size="md" className="opacity-30" />
      <FloralDecoration position="bottom-right" size="md" className="opacity-30" />
      <SparklesDecoration count={4} />

      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <p ref={headerRef} className="font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase">Konfirmasi Kehadiran</p>
          <h2 ref={titleRef} className="font-script text-5xl md:text-6xl mb-6"><span className="text-dusty-rose">RSVP</span></h2>
          <div ref={dividerRef} className="section-divider mb-6 w-24 mx-auto origin-center" />
          <p ref={descRef} className="text-muted-foreground max-w-md mx-auto">Kehadiran Anda akan menjadi kebahagiaan terbesar bagi kami.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 md:p-10 touch-lift border-dusty-rose/20">
            <div className="space-y-6">
              <div className="form-field">
                <label className="block text-sm font-medium text-foreground mb-2 font-display">Nama Lengkap</label>
                <Input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Masukkan nama Anda" required className="bg-cream/50 border-dusty-rose/30" />
              </div>
              <div className="form-field">
                <label className="block text-sm font-medium text-foreground mb-2 font-display">Email</label>
                <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@example.com" required className="bg-cream/50 border-dusty-rose/30" />
              </div>
              <div className="form-field">
                <label className="block text-sm font-medium text-foreground mb-3 font-display">Konfirmasi Kehadiran</label>
                <div className="grid grid-cols-2 gap-4">
                  <button type="button" onClick={() => setFormData({ ...formData, attendance: "hadir" })} className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 touch-bounce ${formData.attendance === "hadir" ? "border-sage-green bg-sage-green/20 text-foreground scale-105" : "border-border/50 bg-cream/30 text-muted-foreground"}`}><Check className={`w-6 h-6 ${formData.attendance === "hadir" ? "text-sage-green" : ""}`} /><span className="font-medium font-display">Ya, Hadir</span></button>
                  <button type="button" onClick={() => setFormData({ ...formData, attendance: "tidak" })} className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 touch-bounce ${formData.attendance === "tidak" ? "border-dusty-rose bg-dusty-rose/20 text-foreground scale-105" : "border-border/50 bg-cream/30 text-muted-foreground"}`}><Heart className={`w-6 h-6 ${formData.attendance === "tidak" ? "text-dusty-rose" : ""}`} /><span className="font-medium font-display">Maaf, Tidak Bisa</span></button>
                </div>
              </div>
              {formData.attendance === "hadir" && (
                <div className="form-field">
                  <label className="block text-sm font-medium text-foreground mb-2 font-display"><Users className="w-4 h-4 inline mr-2 text-sage-green" />Jumlah Tamu</label>
                  <select value={formData.guests} onChange={(e) => setFormData({ ...formData, guests: e.target.value })} className="w-full p-3 rounded-lg bg-cream/50 border border-sage-green/30">
                    <option value="1">1 Orang</option>
                    <option value="2">2 Orang</option>
                    <option value="3">3 Orang</option>
                    <option value="4">4 Orang</option>
                  </select>
                </div>
              )}
              <div className="form-field">
                <label className="block text-sm font-medium text-foreground mb-2 font-display">Ucapan & Doa</label>
                <Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tulis ucapan dan doa untuk kedua mempelai..." rows={4} className="bg-cream/50 border-dusty-rose/30 resize-none" />
              </div>
              <Button type="submit" disabled={isSubmitting || !formData.attendance} className="w-full py-6 bg-gradient-to-r from-dusty-rose to-mauve hover:from-dusty-rose/90 hover:to-mauve/90 text-cream font-medium text-lg rounded-xl touch-bounce disabled:opacity-50">
                {isSubmitting ? <span className="flex items-center gap-2"><div className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />Mengirim...</span> : <span className="flex items-center gap-2 font-display"><Heart className="w-5 h-5" />Kirim RSVP</span>}
              </Button>
            </div>
          </form>

          {/* Wishes Display */}
          <div ref={wishesRef} className="glass-card rounded-2xl p-8 border-dusty-rose/20">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-6 h-6 text-dusty-rose" />
              <h3 className="font-display text-xl text-foreground">Ucapan & Doa</h3>
              <span className="ml-auto text-sm text-muted-foreground bg-dusty-rose/20 px-3 py-1 rounded-full">
                {wishes.length} ucapan
              </span>
            </div>
            
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-dusty-rose/30 scrollbar-track-transparent">
              {wishes.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Heart className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p className="font-display">Jadilah yang pertama memberikan ucapan!</p>
                </div>
              ) : (
                wishes.map((wish, index) => (
                  <div 
                    key={wish.id} 
                    className="bg-cream/50 rounded-xl p-4 border border-dusty-rose/20 transition-all duration-300 hover:shadow-md"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-dusty-rose to-mauve flex items-center justify-center text-cream font-display text-sm flex-shrink-0">
                        {wish.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-display font-medium text-foreground">{wish.name}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${wish.attendance === 'hadir' ? 'bg-sage-green/20 text-sage-green' : 'bg-dusty-rose/20 text-dusty-rose'}`}>
                            {wish.attendance === 'hadir' ? 'Hadir' : 'Tidak Hadir'}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{wish.message}</p>
                        <p className="text-xs text-muted-foreground/60 mt-2">
                          {format(new Date(wish.created_at), "d MMMM yyyy, HH:mm", { locale: id })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;
