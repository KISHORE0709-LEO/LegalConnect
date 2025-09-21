import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Upload, Image, Eye } from 'lucide-react';
import { T } from './T';

interface ImageUploadProps {
  onAnalysis?: (result: any) => void;
}

export function ImageUpload({ onAnalysis }: ImageUploadProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIsAnalyzing(true);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90));
    }, 200);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      clearInterval(progressInterval);
      setProgress(100);
      setResult(data);
      
      if (onAnalysis) {
        onAnalysis(data);
      }
    } catch (error) {
      console.error('Image analysis failed:', error);
      clearInterval(progressInterval);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const triggerUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = handleImageUpload;
    input.click();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="h-5 w-5" />
          <T>Image Analysis</T>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!selectedImage ? (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
            onClick={triggerUpload}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">
              <T>Click to upload an image for analysis</T>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={selectedImage} 
                alt="Uploaded" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2"
                onClick={triggerUpload}
              >
                <T>Change</T>
              </Button>
            </div>

            {isAnalyzing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span><T>Analyzing image...</T></span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}

            {result && (
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <T>Analysis Results</T>
                </h4>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">{result.analysis}</p>
                </div>
                {result.classifications && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium"><T>Classifications:</T></p>
                    {result.classifications.slice(0, 3).map((item: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.label}</span>
                        <span className="text-gray-500">
                          {(item.score * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}