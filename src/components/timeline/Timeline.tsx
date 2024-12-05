import React from 'react';
import { KanbanItem } from '@/components/kanban/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Calendar } from 'lucide-react';

interface TimelineProps {
  applications: KanbanItem[];
}

const Timeline: React.FC<TimelineProps> = ({ applications }) => {
  const sortedApplications = [...applications].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="space-y-8">
      {sortedApplications.map((app) => (
        <Card key={app.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">{app.positionTitle}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {app.companyName}
                </CardDescription>
              </div>
              <Badge>{app.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Last updated: {new Date(app.updatedAt).toLocaleDateString()}
            </div>
            {app.interviews.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Interview History</h4>
                <div className="space-y-2">
                  {app.interviews.map((interview) => (
                    <div
                      key={interview.id}
                      className="text-sm text-muted-foreground"
                    >
                      {new Date(interview.date).toLocaleDateString()} -{' '}
                      {interview.format} Interview
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Timeline;