import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';
import SignOutButton from '@/components/SignOutButton/SignOutButton.tsx';
import styles from './AppLayout.module.css';

export const AppLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        const response = await fetch('API_BASE_URL/auth/user-data', {
          method: 'GET',
          credentials: 'include',
        });

        setIsAuthenticated(response.ok);
      } catch (error) {
        console.error('Authentication validation error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateAuth();
  }, []);

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
    <div className={styles.page_wrapper}>
      <header className={styles.page_header}>
        <ul className={styles.nav_links}>
          <li><SignOutButton /></li>
        </ul>
      </header>
      <div className={styles.page_content}>
        <Outlet />
      </div>
    </div>
  );
};
