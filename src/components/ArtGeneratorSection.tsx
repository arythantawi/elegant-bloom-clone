import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Download, Sparkles, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";

const artStyles = [
  { value: 'romantic', label: '💕 Romantic' },
  { value: 'wedding', label: '💒 Wedding' },
  { value: 'watercolor', label: '🎨 Watercolor' },
  { value: 'oil-painting', label: '🖼️ Oil Painting' },
  { value: 'digital-art', label: '✨ Digital Art' },
  { value: 'anime', label: '🌸 Anime' },
  { value: 'vintage', label: '📷 Vintage' },
];

const ArtGeneratorSection = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("romantic");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Masukkan deskripsi gambar yang ingin dibuat");
      return;
    }

    setIsLoading(true);
    setGeneratedImage(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-art', {
        body: { prompt, style }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Gagal generate gambar');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.image) {
        setGeneratedImage(data.image);
        toast.success("Gambar berhasil dibuat! ✨");
      } else {
        throw new Error('Tidak ada gambar yang dihasilkan');
      }
    } catch (error) {
      console.error('Error generating art:', error);
      toast.error(error instanceof Error ? error.message : 'Gagal membuat gambar');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `wedding-art-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Gambar berhasil diunduh!");
  };

  return (
    <section id="art-generator" className="py-24 bg-gradient-to-b from-cream via-blush-pink/30 to-cream relative overflow-hidden">
      <FloralDecoration position="top-left" size="md" className="opacity-50" variant={3} />
      <FloralDecoration position="bottom-right" size="md" className="opacity-50" variant={4} />
      <SparklesDecoration count={8} />

      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <p className="font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase">
            AI Art Generator
          </p>
          <h2 className="font-script text-5xl md:text-6xl mb-6">
            <span className="text-sage-green">Buat</span>{" "}
            <span className="text-dusty-rose">Karya Seni</span>
          </h2>
          <div className="section-divider w-24 mx-auto" />
          <p className="text-muted-foreground mt-6 max-w-lg mx-auto">
            Buat gambar artistik unik dengan AI. Masukkan deskripsi dan pilih gaya yang diinginkan.
          </p>
        </div>

        {/* Generator Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-elegant border border-dusty-rose/20">
          <div className="space-y-6">
            {/* Prompt Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Deskripsi Gambar
              </label>
              <Input
                placeholder="Contoh: Pasangan romantis di taman bunga dengan sunset"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-cream/50 border-dusty-rose/30 focus:border-dusty-rose"
                disabled={isLoading}
              />
            </div>

            {/* Style Select */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Gaya Seni
              </label>
              <Select value={style} onValueChange={setStyle} disabled={isLoading}>
                <SelectTrigger className="bg-cream/50 border-dusty-rose/30">
                  <SelectValue placeholder="Pilih gaya" />
                </SelectTrigger>
                <SelectContent>
                  {artStyles.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="w-full bg-gradient-to-r from-dusty-rose to-sage-green hover:opacity-90 text-white font-semibold py-6 text-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Membuat Karya Seni...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Art
                </>
              )}
            </Button>
          </div>

          {/* Generated Image Display */}
          {generatedImage && (
            <div className="mt-8 animate-fade-in">
              <div className="relative rounded-2xl overflow-hidden shadow-elegant border-4 border-white">
                <img
                  src={generatedImage}
                  alt="Generated Art"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
              <Button
                onClick={handleDownload}
                variant="outline"
                className="w-full mt-4 border-dusty-rose text-dusty-rose hover:bg-dusty-rose hover:text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Gambar
              </Button>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="mt-8 flex flex-col items-center justify-center py-12">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-dusty-rose/30 animate-pulse" />
                <ImageIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-dusty-rose animate-bounce" />
              </div>
              <p className="mt-4 text-muted-foreground text-sm animate-pulse">
                AI sedang membuat karya seni untuk Anda...
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ArtGeneratorSection;
