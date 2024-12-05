import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KanbanItem } from './types';
import { format } from 'date-fns';
import { Building2, Calendar, MapPin, User } from 'lucide-react';
import { TaskManager } from '@/components/tasks/TaskManager';

interface JobDetailsDialogProps {
  job: KanbanItem | null;
  open: boolean;
  onClose: () => void;
}

const JobDetailsDialog: React.FC<JobDetailsDialogProps> = ({
  job,
  open,
  onClose,
}) => {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {job.positionTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-gray-500" />
            <span>{job.companyName}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <span>{job.location}</span>
          </div>
          {job.applicationDeadline && (
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span>
                Due: {format(new Date(job.applicationDeadline), 'PPP')}
              </span>
            </div>
          )}
          {job.recruiter && (
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              <span>{job.recruiter.name}</span>
            </div>
          )}
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="interviews">
              Interviews ({job.interviews.length})
            </TabsTrigger>
            <TabsTrigger value="tasks">Tasks ({job.tasks.length})</TabsTrigger>
            <TabsTrigger value="documents">
              Documents ({job.documents.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Notes</h3>
                <p className="text-gray-600">{job.notes || 'No notes added'}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="interviews" className="mt-4">
            {job.interviews.length === 0 ? (
              <p className="text-gray-500">No interviews scheduled</p>
            ) : (
              <div className="space-y-4">
                {job.interviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="border rounded-lg p-4 space-y-2"
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium">
                        {format(new Date(interview.date), 'PPP')} at{' '}
                        {interview.time}
                      </h4>
                      <span className="capitalize">{interview.format}</span>
                    </div>
                    {interview.notes && (
                      <p className="text-gray-600">{interview.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="tasks" className="mt-4">
            <TaskManager
              jobId={job.id}
              tasks={job.tasks}
              onTasksUpdate={(updatedTasks) => {
                // Update the job's tasks in the state
                job.tasks = updatedTasks;
              }}
            />
          </TabsContent>

          <TabsContent value="documents" className="mt-4">
            {job.documents.length === 0 ? (
              <p className="text-gray-500">No documents uploaded</p>
            ) : (
              <div className="space-y-4">
                {job.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="border rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-medium">{doc.name}</h4>
                      <p className="text-sm text-gray-500 capitalize">
                        {doc.type.replace('_', ' ')}
                      </p>
                    </div>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsDialog;