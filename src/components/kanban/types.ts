export type Priority = 'low' | 'medium' | 'high';

export interface Contact {
  name: string;
  email?: string;
  phone?: string;
  role: string;
}

export interface Interview {
  id: string;
  date: string;
  time: string;
  format: 'phone' | 'video' | 'onsite';
  participants: Contact[];
  notes?: string;
  feedback?: string;
}

export interface Task {
  id: string;
  title: string;
  dueDate?: string;
  completed: boolean;
  description?: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'resume' | 'cover_letter' | 'other';
  url: string;
  uploadedAt: string;
}

export interface KanbanItem {
  id: string;
  companyName: string;
  positionTitle: string;
  status: string;
  priority: Priority;
  location: string;
  salary?: string;
  applicationDeadline?: string;
  recruiter?: Contact;
  interviews: Interview[];
  tasks: Task[];
  documents: Document[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface KanbanColumn {
  id: string;
  name: string;
  items: KanbanItem[];
}

export interface BoardData {
  columns: KanbanColumn[];
}