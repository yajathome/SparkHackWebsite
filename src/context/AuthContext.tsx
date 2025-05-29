import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, User } from '../lib/supabase';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const session = localStorage.getItem('user');
      if (session) {
        const userData = JSON.parse(session);
        setUser(userData);
        setIsAdmin(userData.role === 'admin');
      }
      setLoading(false);
    };
    
    checkUser();
  }, []);
  
  const signIn = async (username: string, password: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .maybeSingle();
    
    if (error) throw error;
    if (!data) throw new Error('Invalid credentials');
    
    const user = {
      id: data.id,
      username: data.username,
      role: data.role
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    setIsAdmin(user.role === 'admin');
  };
  
  const signUp = async (username: string, password: string) => {
    const { data: existingUser } = await supabase
      .from('users')
      .select('username')
      .eq('username', username)
      .maybeSingle();
    
    if (existingUser) {
      throw new Error('Username already exists');
    }
    
    const { data, error } = await supabase
      .from('users')
      .insert([
        { username, password, role: 'user' }
      ])
      .select()
      .maybeSingle();
    
    if (error) throw error;
    
    if (data) {
      await signIn(username, password);
    }
  };
  
  const signOut = async () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAdmin(false);
  };
  
  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin
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