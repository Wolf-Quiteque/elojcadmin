'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { createClient } from '@/lib/supabase/client';

export default function TeacherGuard({ children }) {
  const { session, loading } = useAuth();
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkRole = async () => {
      if (loading) return;
      if (!session) {
        router.replace('/auth/login');
        return;
      }
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      if (data?.role !== 'teacher') {
        router.replace('/');
        return;
      }
      setAuthorized(true);
    };
    checkRole();
  }, [loading, session, supabase, router]);

  if (loading || !authorized) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
