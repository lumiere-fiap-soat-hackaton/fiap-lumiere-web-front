import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useUserData } from '@/modules/authentication/hooks';
import { getGravatarUrl } from '@/utils/gravatar';

interface User {
  name?: string;
  email?: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { fetchAuthenticatedUserData } = useUserData();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshUserData = async () => {
    setIsLoading(true);
    try {
      const userData = await fetchAuthenticatedUserData();

      // If user doesn't have a picture, use Gravatar based on email
      if (userData && userData.email && !userData.picture) {
        userData.picture = getGravatarUrl(userData.email, 100);
      }

      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Authentication validation error:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    refreshUserData
  };

  return (
    <AuthContext.Provider value={value}>
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
