import { useState, useCallback } from "react";
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface DocumentUploadProps {
  onUploadComplete?: (documentId: string) => void;
}

export const DocumentUpload = ({ onUploadComplete }: DocumentUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus('idle');

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUploadProgress(100);
      setUploadStatus('success');
      onUploadComplete?.(`doc_${Date.now()}`);
    } catch (error) {
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
      setTimeout(() => {
        setUploadProgress(0);
        setUploadStatus('idle');
      }, 3000);
    }
  };

  return (
    <Card className={`
      relative overflow-hidden transition-all duration-300 ease-smooth
      ${isDragging ? 'bg-primary/10 border-primary shadow-glow' : 'bg-card hover:shadow-medium'}
      ${isUploading ? 'animate-pulse-glow' : 'animate-fade-in-up'}
    `}>
      <div
        className="p-8 text-center"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary shadow-medium">
          {uploadStatus === 'success' ? (
            <CheckCircle className="h-8 w-8 text-white" />
          ) : uploadStatus === 'error' ? (
            <AlertCircle className="h-8 w-8 text-white" />
          ) : (
            <Upload className="h-8 w-8 text-white" />
          )}
        </div>

        <h3 className="mb-2 text-lg font-semibold text-foreground">
          {uploadStatus === 'success' 
            ? 'Document Uploaded Successfully!' 
            : uploadStatus === 'error'
            ? 'Upload Failed'
            : 'Upload Legal Document'
          }
        </h3>
        
        <p className="mb-6 text-sm text-muted-foreground">
          {uploadStatus === 'success' 
            ? 'Your document is being processed and analyzed.'
            : uploadStatus === 'error'
            ? 'Please try again or contact support.'
            : 'Drag & drop your PDF, Word document, or scan here'
          }
        </p>

        {isUploading && (
          <div className="mb-4">
            <Progress value={uploadProgress} className="h-2 animate-fade-in" />
            <p className="mt-2 text-xs text-muted-foreground">
              Processing document... {uploadProgress}%
            </p>
          </div>
        )}

        {!isUploading && uploadStatus === 'idle' && (
          <div>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              onChange={handleFileSelect}
            />
            <Button 
              asChild
              variant="outline"
              className="mb-3 bg-glass-bg backdrop-blur-sm border-glass-border hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <label htmlFor="file-upload" className="cursor-pointer">
                <FileText className="mr-2 h-4 w-4" />
                Choose File
              </label>
            </Button>
            <p className="text-xs text-muted-foreground">
              Supports PDF, Word, and image formats
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};