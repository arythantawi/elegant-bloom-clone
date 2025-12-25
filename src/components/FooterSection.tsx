import { Heart, Instagram, Mail } from "lucide-react";
import FloralDecoration from "./FloralDecoration";

const FooterSection = () => {
  return (
    <footer id="footer-section" className="py-16 bg-foreground text-cream relative overflow-hidden">
      <FloralDecoration position="top-left" size="sm" className="opacity-20" />
      <FloralDecoration position="top-right" size="sm" className="opacity-20" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dusty-rose/50 to-transparent" />

      <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="font-script text-5xl md:text-6xl mb-4">
          <span className="text-dusty-rose">Oky</span> & <span className="text-sage-green">Mita</span>
        </h2>

        <p className="text-cream/60 mb-8 font-elegant text-xl italic">16 - 17 Januari 2026</p>

        <blockquote className="max-w-lg mx-auto mb-10">
          <p className="text-cream/80 italic leading-relaxed font-display">"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang."</p>
          <cite className="block mt-4 text-dusty-rose text-sm font-display">— QS. Ar-Rum: 21</cite>
        </blockquote>

        <div className="flex items-center justify-center gap-6 mb-10">
          <a href="#" className="w-12 h-12 rounded-full bg-cream/10 hover:bg-dusty-rose/30 flex items-center justify-center touch-bounce transition-colors"><Instagram className="w-5 h-5" /></a>
          <a href="mailto:oky.mita@wedding.com" className="w-12 h-12 rounded-full bg-cream/10 hover:bg-sage-green/30 flex items-center justify-center touch-bounce transition-colors"><Mail className="w-5 h-5" /></a>
        </div>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-dusty-rose/50 to-transparent mx-auto mb-8" />

        <p className="text-cream/40 text-sm flex items-center justify-center gap-2">Made with <Heart className="w-4 h-4 text-dusty-rose fill-dusty-rose animate-pulse" /> by Oky & Mita</p>
        <p className="text-cream/30 text-xs mt-2">© 2026 All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default FooterSection;
