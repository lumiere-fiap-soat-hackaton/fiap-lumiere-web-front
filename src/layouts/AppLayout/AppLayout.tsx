import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';

import { useUserData } from '@/modules/authentication/hooks';
import SignOutButton from '@/modules/authentication/components/SignOutButton/SignOutButton';
import styles from './AppLayout.module.css';

const user = JSON.parse(localStorage.getItem('user') || '{}');

export const AppLayout = () => {
  const { fetchAuthenticatedUserData } = useUserData();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        await fetchAuthenticatedUserData();

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Authentication validation error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateAuth();
  }, [fetchAuthenticatedUserData]);

  if (isLoading) {
    return (
      <div className={styles.page_wrapper}>
        <div className={styles.page_content}>
          <h3>Loading...</h3>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div className={styles.app_layout}>
      <p className={styles.greetings}>Olá, {user?.name || user?.email || 'Usuário'}</p>
      <header>
        {user?.picture && <img src={user.picture} alt="Foto do perfil" />}

        <h2>🎥 Video Pictures - POC</h2>
        <SignOutButton />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
