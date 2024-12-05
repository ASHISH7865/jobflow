import React from 'react';
import { Document } from '@/components/kanban/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FileText, Download, Trash2 } from 'lucide-react';

interface DocumentListProps {
  documents: Document[];
  onDelete: (id: string) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({ documents, onDelete }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Upload Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((doc) => (
          <TableRow key={doc.id}>
            <TableCell className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {doc.name}
            </TableCell>
            <TableCell className="capitalize">{doc.type.replace('_', ' ')}</TableCell>
            <TableCell>
              {new Date(doc.uploadedAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <a href={doc.url} download target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(doc.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DocumentList;