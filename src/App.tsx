import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import KanbanBoard from './components/kanban/KanbanBoard';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';
import Timeline from './components/timeline/Timeline';
import DocumentList from './components/documents/DocumentList';
import DocumentUpload from './components/documents/DocumentUpload';
import { initialBoardData } from './components/kanban/data';
import { useAuth } from '@/components/context/AuthContext';
import { SignInForm } from '@/components/auth/SignInForm';
import { Loader2 } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';

const App: React.FC = () => {
  const [boardData, setBoardData] = React.useState(initialBoardData);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container max-w-md mx-auto py-16">
        <SignInForm />
      </div>
    );
  }

  // Calculate analytics data
  const analytics = {
    totalApplications: boardData.columns.reduce(
      (total, col) => total + col.items.length,
      0
    ),
    applicationsByStatus: boardData.columns.map((col) => ({
      status: col.name,
      count: col.items.length,
    })),
    applicationsByCompany: Object.entries(
      boardData.columns
        .flatMap((col) => col.items)
        .reduce((acc, item) => {
          acc[item.companyName] = (acc[item.companyName] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
    ).map(([company, count]) => ({ company, count })),
    responseRates: boardData.columns.map((col) => ({
      status: col.name,
      rate: Math.round(
        (col.items.filter((item) => item.interviews.length > 0).length /
          Math.max(col.items.length, 1)) *
          100
      ),
    })),
  };

  // Aggregate all documents across all applications
  const allDocuments = boardData.columns
    .flatMap((col) => col.items)
    .flatMap((item) => item.documents);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between">

      <h1 className="text-3xl font-bold mb-8">Job Application Tracker</h1>
      <ThemeToggle />
      </div>
      
      <Tabs defaultValue="board" className="space-y-4">
        <TabsList>
          <TabsTrigger value="board">Kanban Board</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="board">
          <KanbanBoard />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsDashboard {...analytics} />
        </TabsContent>

        <TabsContent value="timeline">
          <Timeline
            applications={boardData.columns.flatMap((col) => col.items)}
          />
        </TabsContent>

        <TabsContent value="documents" className="space-y-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold mb-4">Upload Document</h2>
              <DocumentUpload
                onUpload={(doc) => {
                  // In a real app, this would be handled by the backend
                  console.log('Document uploaded:', doc);
                }}
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4">Documents</h2>
              <DocumentList
                documents={allDocuments}
                onDelete={(id) => {
                  // In a real app, this would be handled by the backend
                  console.log('Delete document:', id);
                }}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default App;