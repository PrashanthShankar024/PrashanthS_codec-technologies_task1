import { pipeline, env } from "@huggingface/transformers";

// Configure transformers to use local models
env.allowLocalModels = false;

let classifier: any = null;

export interface ClassificationResult {
  label: string;
  score: number;
}

export const initializeClassifier = async () => {
  if (classifier) return classifier;
  
  console.log("Loading image classification model...");
  classifier = await pipeline(
    "image-classification",
    "onnx-community/mobilenetv4_conv_small.e2400_r224_in1k",
    { device: "webgpu" }
  );
  console.log("Model loaded successfully!");
  
  return classifier;
};

export const classifyImage = async (imageUrl: string): Promise<ClassificationResult[]> => {
  if (!classifier) {
    await initializeClassifier();
  }
  
  const results = await classifier(imageUrl, { topk: 5 });
  return results.map((result: any) => ({
    label: result.label,
    score: result.score,
  }));
};
