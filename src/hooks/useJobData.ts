import { useEffect, useState } from 'react';
import { supabase } from '@/services/supabase/supabase';
import { Job } from '@/services/supabase/database.types';
import { useAuth } from '@/components/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export function useJobData() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Initial fetch
    fetchJobs();

    // Set up real-time subscription
    const subscription = supabase
      .channel('jobs')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'jobs',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setJobs((current) => [...current, payload.new as Job]);
          } else if (payload.eventType === 'UPDATE') {
            setJobs((current) =>
              current.map((job) =>
                job.id === payload.new.id ? (payload.new as Job) : job
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setJobs((current) =>
              current.filter((job) => job.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  async function fetchJobs() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch jobs.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return { jobs, loading };
}