"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import LoginPage from './auth/login/page';
export default function HomePage() {
    const { session, loading } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!loading && session) {
            router.replace('/dashboard');
        }
    }, [session, loading, router]);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!session) {
        return <LoginPage />;
    }
    return null;
}
