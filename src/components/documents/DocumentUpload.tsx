import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Document } from '@/components/kanban/types';

interface DocumentUploadProps {
  onUpload: (document: Omit<Document, 'id' | 'uploadedAt'>) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUpload }) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [type, setType] = React.useState<'resume' | 'cover_letter' | 'other'>(
    'resume'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    // In a real application, you would upload the file to a storage service
    // and get back a URL. For now, we'll create a fake URL
    const fakeUrl = URL.createObjectURL(file);

    onUpload({
      name: file.name,
      type,
      url: fakeUrl,
    });

    setFile(null);
    setType('resume');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="document">Document</Label>
        <Input
          id="document"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="type">Document Type</Label>
        <Select value={type} onValueChange={(value: any) => setType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select document type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="resume">Resume</SelectItem>
            <SelectItem value="cover_letter">Cover Letter</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={!file}>
        Upload Document
      </Button>
    </form>
  );
};

export default DocumentUpload;