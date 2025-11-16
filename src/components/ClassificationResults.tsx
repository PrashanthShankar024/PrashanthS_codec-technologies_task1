import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface ClassificationResult {
  label: string;
  score: number;
}

interface ClassificationResultsProps {
  results: ClassificationResult[];
}

export const ClassificationResults = ({ results }: ClassificationResultsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-foreground mb-4">
        Classification Results
      </h3>
      <div className="space-y-3">
        {results.map((result, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-foreground capitalize">
                {result.label}
              </span>
              <Badge
                variant={index === 0 ? "default" : "secondary"}
                className={index === 0 ? "bg-gradient-to-r from-primary to-accent" : ""}
              >
                {(result.score * 100).toFixed(1)}%
              </Badge>
            </div>
            <Progress value={result.score * 100} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  );
};
