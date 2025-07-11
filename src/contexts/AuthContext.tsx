import React, { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { useSignIn, useSignOut, useSignUp } from '@/modules/authentication/hooks';
import { useUserData } from '@/hooks/useUserData';

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  step: number;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<boolean>;
  verify: ( code: string) => Promise<boolean>;
  signOut: () => Promise<boolean>;
  isAuthorizing: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const { signInWithEmailAndPassword } = useSignIn();
    const { signOutAuthenticatedUser } = useSignOut();
    const { fetchAuthenticatedUserData } = useUserData();
    const { signUpWithEmailAndPassword, sendSignUpVerificationCode } = useSignUp();

    const [step, setStep] = useState(1);

    const [user, setUser] = useState<User | null>(null);
    const [isAuthorizing, setIsAuthorizing] = useState(true);

    useEffect(() => {
      //const savedUser = localStorage.getItem('lumiere-user');
      /*if (savedUser) {
        setUser(JSON.parse(savedUser));
      }*/
      setIsAuthorizing(true);

      fetchAuthenticatedUserData()
        .then((userData) => {
          setUser(userData as unknown as User);
        })
        .catch((error) => {
          setUser(null);
          console.log(error);
        })
        .finally(() => {
          setIsAuthorizing(false);
        });
    }, []);

    const signIn = async (username: string, password: string): Promise<boolean> => {
      //setIsAuthorizing(true);

      const success = await signInWithEmailAndPassword(username, password);
      if (!success) {
        //setIsAuthorizing(false);
        return success;
      }

      const userData = await fetchAuthenticatedUserData();
      if (!userData) {
        // setIsAuthorizing(false);
        return false;
      }

      setUser(userData as unknown as User);
      //setIsAuthorizing(false);
      return success;
    };

    const signUp = async (username: string, password: string): Promise<boolean> => {
      //setIsAuthorizing(true);

      const success = await signUpWithEmailAndPassword(username, password);
      //setIsAuthorizing(false);
      localStorage.setItem('lumiere-pending-user', username);
      setStep(2);
      return success;
    };

    const verify = async (code: string): Promise<boolean> => {
      //setIsAuthorizing(true);

      const pendingUser = localStorage.getItem('lumiere-pending-user');
      const success = await sendSignUpVerificationCode(pendingUser as string, code);
      //setIsAuthorizing(false);

      if (!success) return false;
      localStorage.removeItem('lumiere-pending-user');
      return true;
    };

    const signOut = async () => {
      setIsAuthorizing(true);

      const success = await signOutAuthenticatedUser();
      if (!success) return false;

      setUser(null);
      setIsAuthorizing(false);
      return success;
    };

    return (
      <AuthContext.Provider value={{
        user,
        step,
        signIn,
        signUp,
        verify,
        signOut,
        isAuthorizing,
      }}>
        {children}
      </AuthContext.Provider>
    );
  }
;
