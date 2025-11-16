import { useState } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { ImagePreview } from "@/components/ImagePreview";
import { ClassificationResults } from "@/components/ClassificationResults";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { classifyImage, type ClassificationResult } from "@/lib/imageClassifier";
import { toast } from "sonner";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [results, setResults] = useState<ClassificationResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setImageUrl(URL.createObjectURL(file));
    setResults([]);
  };

  const handleClear = () => {
    setSelectedImage(null);
    setImageUrl("");
    setResults([]);
  };

  const handleClassify = async () => {
    if (!imageUrl) return;

    setIsProcessing(true);
    setIsModelLoading(true);
    
    try {
      toast.info("Loading AI model... This may take a moment on first use.");
      const predictions = await classifyImage(imageUrl);
      setResults(predictions);
      toast.success("Classification complete!");
    } catch (error) {
      console.error("Classification error:", error);
      toast.error("Failed to classify image. Please try again.");
    } finally {
      setIsProcessing(false);
      setIsModelLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "var(--gradient-hero)",
            filter: "blur(100px)",
          }}
        />
        <div className="relative container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                {/* AI-Powered */}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Image Recognition
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload any image and let our AI model identify objects with real-time predictions
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Upload Section */}
            <div className="space-y-6">
              <ImageUploader
                onImageSelect={handleImageSelect}
                isProcessing={isProcessing}
              />
              
              {imageUrl && (
                <div className="space-y-4">
                  <ImagePreview imageUrl={imageUrl} onClear={handleClear} />
                  <Button
                    onClick={handleClassify}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {isModelLoading ? "Loading Model..." : "Analyzing..."}
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Classify Image
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>

            {/* Results Section */}
            <div>
              {results.length > 0 && (
                <div
                  className="p-6 rounded-lg bg-card border border-border"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <ClassificationResults results={results} />
                </div>
              )}
              
              {!imageUrl && !results.length && (
                <div className="h-full flex items-center justify-center p-8 text-center">
                  <div>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      Upload an image to see classification results
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-12 p-6 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">How it works</h3>
            <p className="text-sm text-muted-foreground">
              This app uses MobileNetV4, a state-of-the-art image classification model
              running directly in your browser with WebGPU acceleration. No data is sent
              to external servers - everything happens locally for maximum privacy and speed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
