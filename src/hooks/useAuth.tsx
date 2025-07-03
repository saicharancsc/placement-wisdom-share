
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      
      // If user just signed up/in, ensure they exist in users table
      if (session?.user && _event === 'SIGNED_IN') {
        try {
          // Check if user exists in users table
          const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('id', session.user.id)
            .single();
          
          // If user doesn't exist, create them
          if (!existingUser) {
            const { error: insertError } = await supabase
              .from('users')
              .insert({
                id: session.user.id,
                email: session.user.email!,
                name: session.user.user_metadata?.name || session.user.email!,
              });
            
            if (insertError) {
              console.error('Error creating user record:', insertError);
            }
          }
        } catch (error) {
          console.error('Error checking/creating user:', error);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    toast({
      title: "Success",
      description: "Account created! Please check your email to confirm your account before signing in.",
    });
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Show more user-friendly error messages
      let errorMessage = error.message;
      if (error.message === 'Email not confirmed') {
        errorMessage = 'Please check your email and click the confirmation link before signing in.';
      } else if (error.message === 'Invalid login credentials') {
        errorMessage = 'Invalid email or password. Please check your credentials and try again.';
      }
      
      toast({
        title: "Sign In Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }

    toast({
      title: "Welcome back!",
      description: "Successfully signed in.",
    });
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
