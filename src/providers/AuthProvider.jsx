"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
const AuthContext = createContext({
    session: null,
    user: null,
    loading: true,
});
export const AuthProvider = ({ children }) => {
    var _a;
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const supabase = createClient();
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
            setLoading(false);
        };
        getSession();
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);
    const value = {
        session,
        user: (_a = session === null || session === void 0 ? void 0 : session.user) !== null && _a !== void 0 ? _a : null,
        loading,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
