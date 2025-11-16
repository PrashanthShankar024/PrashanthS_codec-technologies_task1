import { X } from "lucide-react";
import { Button } from "./ui/button";

interface ImagePreviewProps {
  imageUrl: string;
  onClear: () => void;
}

export const ImagePreview = ({ imageUrl, onClear }: ImagePreviewProps) => {
  return (
    <div className="relative group">
      <div
        className="rounded-lg overflow-hidden border border-border"
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        <img
          src={imageUrl}
          alt="Preview"
          className="w-full h-auto max-h-[400px] object-contain bg-muted"
        />
      </div>
      <Button
        onClick={onClear}
        size="icon"
        variant="destructive"
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};
