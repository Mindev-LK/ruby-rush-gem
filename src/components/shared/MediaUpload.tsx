
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: 'image' | 'video';
}

interface MediaUploadProps {
  maxImages?: number;
  maxVideoSize?: number; // in MB
  onFilesChange: (files: MediaFile[]) => void;
}

export const MediaUpload = ({ maxImages = 10, maxVideoSize = 100, onFilesChange }: MediaUploadProps) => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<MediaFile | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newFiles: MediaFile[] = [];

    files.forEach((file) => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if (isImage && mediaFiles.filter(f => f.type === 'image').length < maxImages) {
        const preview = URL.createObjectURL(file);
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview,
          type: 'image'
        });
      } else if (isVideo && file.size <= maxVideoSize * 1024 * 1024 && !mediaFiles.find(f => f.type === 'video')) {
        const preview = URL.createObjectURL(file);
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview,
          type: 'video'
        });
      }
    });

    const updatedFiles = [...mediaFiles, ...newFiles];
    setMediaFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const removeFile = (id: string) => {
    const updatedFiles = mediaFiles.filter(file => file.id !== id);
    setMediaFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const openPreview = (file: MediaFile) => {
    setPreviewFile(file);
    setPreviewOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <label htmlFor="media-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Upload images and videos
              </span>
              <span className="mt-1 block text-sm text-gray-500">
                Max {maxImages} images (JPG, PNG, WEBP) and 1 video (MP4, MOV, max {maxVideoSize}MB)
              </span>
            </label>
            <input
              id="media-upload"
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {mediaFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mediaFiles.map((file) => (
            <Card key={file.id} className="relative">
              <CardContent className="p-2">
                {file.type === 'image' ? (
                  <img
                    src={file.preview}
                    alt="Upload preview"
                    className="w-full h-24 object-cover rounded cursor-pointer"
                    onClick={() => openPreview(file)}
                  />
                ) : (
                  <video
                    src={file.preview}
                    className="w-full h-24 object-cover rounded cursor-pointer"
                    onClick={() => openPreview(file)}
                  />
                )}
                <div className="absolute top-1 right-1 flex space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-6 h-6 p-0"
                    onClick={() => openPreview(file)}
                  >
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-6 h-6 p-0"
                    onClick={() => removeFile(file.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Media Preview</DialogTitle>
          </DialogHeader>
          {previewFile && (
            <div className="max-h-96 overflow-auto">
              {previewFile.type === 'image' ? (
                <img
                  src={previewFile.preview}
                  alt="Preview"
                  className="w-full h-auto rounded"
                />
              ) : (
                <video
                  src={previewFile.preview}
                  controls
                  className="w-full h-auto rounded"
                />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
