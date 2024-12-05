import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/services/supabase/supabase';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  dueDate: z.string().optional(),
});

interface TaskManagerProps {
  jobId: string;
  tasks: Task[];
  onTasksUpdate: (tasks: Task[]) => void;
}

export const TaskManager: React.FC<TaskManagerProps> = ({ jobId, tasks, onTasksUpdate }) => {
  const { toast } = useToast();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      dueDate: '',
    },
  });

  const handleAddTask = async (data: z.infer<typeof taskSchema>) => {
    try {
      const { data: newTask, error } = await supabase
        .from('tasks')
        .insert([{ ...data, job_id: jobId }])
        .select()
        .single();

      if (error) throw error;

      onTasksUpdate([...tasks, newTask]);
      form.reset();
      toast({ title: 'Task added successfully' });
    } catch (error) {
      toast({ title: 'Error adding task', description: error.message, variant: 'destructive' });
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    form.setValue('title', task.title);
    form.setValue('description', task.description || '');
    form.setValue('dueDate', task.due_date || '');
  };

  const handleUpdateTask = async (data: z.infer<typeof taskSchema>) => {
    if (!editingTask) return;

    try {
      const { data: updatedTask, error } = await supabase
        .from('tasks')
        .update(data)
        .eq('id', editingTask.id)
        .select()
        .single();

      if (error) throw error;

      onTasksUpdate(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
      setEditingTask(null);
      form.reset();
      toast({ title: 'Task updated successfully' });
    } catch (error) {
      toast({ title: 'Error updating task', description: error.message, variant: 'destructive' });
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      const { data: updatedTask, error } = await supabase
        .from('tasks')
        .update({ completed: !task.completed })
        .eq('id', task.id)
        .select()
        .single();

      if (error) throw error;

      onTasksUpdate(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      toast({ title: 'Task status updated' });
    } catch (error) {
      toast({ title: 'Error updating task status', description: error.message, variant: 'destructive' });
    }
  };

  return (
    <div>
      <h3 className="font-medium mb-4">Tasks</h3>
      <form onSubmit={form.handleSubmit(editingTask ? handleUpdateTask : handleAddTask)} className="space-y-4">
        <Input placeholder="Task Title" {...form.register('title')} />
        <Input placeholder="Description" {...form.register('description')} />
        <Input type="date" {...form.register('dueDate')} />
        <Button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</Button>
      </form>
      <ul className="mt-4 space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between p-2 border rounded">
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task)}
                className="mr-2"
              />
              <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
            </div>
            <Button variant="link" onClick={() => handleEditTask(task)}>
              Edit
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}; 