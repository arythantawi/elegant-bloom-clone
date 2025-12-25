import { useEffect, useRef, useState } from "react";
import { Gift, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";

const GiftSection = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const bankAccounts = [
    { bank: "BCA", accountNumber: "1234567890", accountName: "Oky Dwi Prasetyo", color: "dusty-rose", gradient: "from-dusty-rose to-mauve" },
    { bank: "Mandiri", accountNumber: "0987654321", accountName: "Mita Berliana", color: "sage-green", gradient: "from-sage-green to-olive-green" },
  ];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Nomor rekening berhasil disalin!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="gift-section" className="py-24 bg-gradient-to-b from-cream via-soft-taupe/20 to-cream relative overflow-hidden">
      <FloralDecoration position="top-right" size="md" className="opacity-30" />
      <FloralDecoration position="bottom-left" size="md" className="opacity-30" />
      <SparklesDecoration count={4} />

      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Gift className="w-12 h-12 text-dusty-rose mx-auto mb-4" />
          <p className="font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase">Kirim Hadiah</p>
          <h2 className="font-script text-5xl md:text-6xl mb-6"><span className="text-sage-green">Wedding</span> <span className="text-dusty-rose">Gift</span></h2>
          <div className="section-divider mb-6 w-24 mx-auto" />
          <p className="text-muted-foreground max-w-lg mx-auto">Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado secara cashless.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {bankAccounts.map((account, index) => (
            <div key={account.bank} className={`gift-card glass-card rounded-2xl p-8 text-center touch-lift ${account.color === "dusty-rose" ? "border-dusty-rose/20" : "border-sage-green/20"}`}>
              <div className={`bank-logo w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br ${account.gradient} flex items-center justify-center shadow-lg touch-bounce`}>
                <span className="text-cream font-bold text-lg font-display">{account.bank}</span>
              </div>
              <h3 className="font-elegant text-2xl text-foreground mb-4">{account.bank}</h3>
              <div className={`bg-cream/60 rounded-xl p-4 mb-4 border ${account.color === "dusty-rose" ? "border-dusty-rose/20" : "border-sage-green/20"}`}>
                <p className="font-mono text-xl text-foreground tracking-wider">{account.accountNumber}</p>
              </div>
              <p className="text-muted-foreground mb-6">a.n. <span className="text-foreground font-medium">{account.accountName}</span></p>
              <button onClick={() => copyToClipboard(account.accountNumber, index)} className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium touch-bounce ${account.color === "dusty-rose" ? "bg-dusty-rose/20 hover:bg-dusty-rose/30 text-foreground" : "bg-sage-green/20 hover:bg-sage-green/30 text-foreground"}`}>
                {copiedIndex === index ? (<><Check className="w-4 h-4 text-sage-green" />Tersalin!</>) : (<><Copy className="w-4 h-4" />Salin Nomor</>)}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftSection;
