import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Download, Sparkles, Upload, Image as ImageIcon, X } from "lucide-react";
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
  { value: 'sketch', label: '✏️ Sketch' },
  { value: 'pop-art', label: '🎭 Pop Art' },
];

const ArtGeneratorSection = () => {
  const [style, setStyle] = useState("romantic");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Pilih file gambar yang valid");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 10MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
      setGeneratedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setGeneratedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGenerate = async () => {
    if (!uploadedImage) {
      toast.error("Upload foto terlebih dahulu");
      return;
    }

    setIsLoading(true);
    setGeneratedImage(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-art', {
        body: { imageData: uploadedImage, style }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Gagal transform gambar');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.image) {
        setGeneratedImage(data.image);
        toast.success("Foto berhasil diubah menjadi karya seni! ✨");
      } else {
        throw new Error('Tidak ada gambar yang dihasilkan');
      }
    } catch (error) {
      console.error('Error generating art:', error);
      toast.error(error instanceof Error ? error.message : 'Gagal membuat art');
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
            AI Photo Art
          </p>
          <h2 className="font-script text-5xl md:text-6xl mb-6">
            <span className="text-sage-green">Ubah Foto</span>{" "}
            <span className="text-dusty-rose">Jadi Seni</span>
          </h2>
          <div className="section-divider w-24 mx-auto" />
          <p className="text-muted-foreground mt-6 max-w-lg mx-auto">
            Upload foto Anda dan ubah menjadi karya seni dengan berbagai gaya artistik
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-elegant border border-dusty-rose/20">
          <div className="space-y-6">
            {/* Upload Area */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Upload Foto
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={isLoading}
              />
              
              {!uploadedImage ? (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className="w-full h-48 border-2 border-dashed border-dusty-rose/40 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-dusty-rose hover:bg-dusty-rose/5 transition-all cursor-pointer"
                >
                  <Upload className="w-10 h-10 text-dusty-rose/60" />
                  <p className="text-muted-foreground text-sm">
                    Klik untuk upload foto
                  </p>
                  <p className="text-muted-foreground/60 text-xs">
                    JPG, PNG, WEBP (max 10MB)
                  </p>
                </button>
              ) : (
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-48 object-cover rounded-2xl"
                  />
                  <button
                    onClick={handleRemoveImage}
                    disabled={isLoading}
                    className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
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
              disabled={isLoading || !uploadedImage}
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
                  Transform ke Art
                </>
              )}
            </Button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="mt-8 flex flex-col items-center justify-center py-12">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-dusty-rose/30 animate-pulse" />
                <ImageIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-dusty-rose animate-bounce" />
              </div>
              <p className="mt-4 text-muted-foreground text-sm animate-pulse">
                AI sedang mengubah foto Anda menjadi karya seni...
              </p>
            </div>
          )}

          {/* Generated Image Display */}
          {generatedImage && !isLoading && (
            <div className="mt-8 animate-fade-in">
              <p className="text-sm font-medium text-foreground mb-3">Hasil:</p>
              <div className="relative rounded-2xl overflow-hidden shadow-elegant border-4 border-white">
                <img
                  src={generatedImage}
                  alt="Generated Art"
                  className="w-full h-auto"
                />
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
        </div>
      </div>
    </section>
  );
};

export default ArtGeneratorSection;
