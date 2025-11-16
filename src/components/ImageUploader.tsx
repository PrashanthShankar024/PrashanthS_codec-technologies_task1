import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  isProcessing: boolean;
}

export const ImageUploader = ({ onImageSelect, isProcessing }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        "relative border-2 border-dashed rounded-lg p-12 transition-all",
        isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-border bg-card",
        isProcessing && "opacity-50 pointer-events-none"
      )}
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={isProcessing}
      />
      <div className="flex flex-col items-center gap-4 text-center">
        <div
          className="p-6 rounded-full bg-gradient-to-br from-primary to-accent"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          {isDragging ? (
            <ImageIcon className="w-8 h-8 text-primary-foreground" />
          ) : (
            <Upload className="w-8 h-8 text-primary-foreground" />
          )}
        </div>
        <div>
          <p className="text-lg font-semibold text-foreground mb-1">
            {isDragging ? "Drop your image here" : "Upload an image"}
          </p>
          <p className="text-sm text-muted-foreground">
            Drag and drop or click to browse
          </p>
        </div>
      </div>
    </div>
  );
};
