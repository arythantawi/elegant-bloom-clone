import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Check, Heart, Users } from "lucide-react";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";

const RSVPSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", attendance: "", guests: "1", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({ title: "Terima Kasih! 💕", description: "RSVP Anda telah berhasil dikirim. Kami menantikan kehadiran Anda!" });
    setFormData({ name: "", email: "", attendance: "", guests: "1", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="rsvp-section" className="py-24 bg-gradient-to-b from-cream via-dusty-rose/10 to-cream relative overflow-hidden">
      <FloralDecoration position="top-left" size="md" className="opacity-30" />
      <FloralDecoration position="bottom-right" size="md" className="opacity-30" />
      <SparklesDecoration count={4} />

      <div className="container max-w-2xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <p className="font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase">Konfirmasi Kehadiran</p>
          <h2 className="font-script text-5xl md:text-6xl mb-6"><span className="text-dusty-rose">RSVP</span></h2>
          <div className="section-divider mb-6 w-24 mx-auto" />
          <p className="text-muted-foreground max-w-md mx-auto">Kehadiran Anda akan menjadi kebahagiaan terbesar bagi kami.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 md:p-10 touch-lift border-dusty-rose/20">
          <div className="space-y-6">
            <div><label className="block text-sm font-medium text-foreground mb-2 font-display">Nama Lengkap</label><Input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Masukkan nama Anda" required className="bg-cream/50 border-dusty-rose/30" /></div>
            <div><label className="block text-sm font-medium text-foreground mb-2 font-display">Email</label><Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@example.com" required className="bg-cream/50 border-dusty-rose/30" /></div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-3 font-display">Konfirmasi Kehadiran</label>
              <div className="grid grid-cols-2 gap-4">
                <button type="button" onClick={() => setFormData({ ...formData, attendance: "hadir" })} className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 touch-bounce ${formData.attendance === "hadir" ? "border-sage-green bg-sage-green/20 text-foreground scale-105" : "border-border/50 bg-cream/30 text-muted-foreground"}`}><Check className={`w-6 h-6 ${formData.attendance === "hadir" ? "text-sage-green" : ""}`} /><span className="font-medium font-display">Ya, Hadir</span></button>
                <button type="button" onClick={() => setFormData({ ...formData, attendance: "tidak" })} className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 touch-bounce ${formData.attendance === "tidak" ? "border-dusty-rose bg-dusty-rose/20 text-foreground scale-105" : "border-border/50 bg-cream/30 text-muted-foreground"}`}><Heart className={`w-6 h-6 ${formData.attendance === "tidak" ? "text-dusty-rose" : ""}`} /><span className="font-medium font-display">Maaf, Tidak Bisa</span></button>
              </div>
            </div>
            {formData.attendance === "hadir" && (<div><label className="block text-sm font-medium text-foreground mb-2 font-display"><Users className="w-4 h-4 inline mr-2 text-sage-green" />Jumlah Tamu</label><select value={formData.guests} onChange={(e) => setFormData({ ...formData, guests: e.target.value })} className="w-full p-3 rounded-lg bg-cream/50 border border-sage-green/30"><option value="1">1 Orang</option><option value="2">2 Orang</option><option value="3">3 Orang</option><option value="4">4 Orang</option></select></div>)}
            <div><label className="block text-sm font-medium text-foreground mb-2 font-display">Ucapan & Doa</label><Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tulis ucapan dan doa untuk kedua mempelai..." rows={4} className="bg-cream/50 border-dusty-rose/30 resize-none" /></div>
            <Button type="submit" disabled={isSubmitting || !formData.attendance} className="w-full py-6 bg-gradient-to-r from-dusty-rose to-mauve hover:from-dusty-rose/90 hover:to-mauve/90 text-cream font-medium text-lg rounded-xl touch-bounce disabled:opacity-50">{isSubmitting ? <span className="flex items-center gap-2"><div className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />Mengirim...</span> : <span className="flex items-center gap-2 font-display"><Heart className="w-5 h-5" />Kirim RSVP</span>}</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RSVPSection;
