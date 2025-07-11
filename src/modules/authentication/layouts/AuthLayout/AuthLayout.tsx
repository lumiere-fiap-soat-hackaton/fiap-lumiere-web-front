import { Navigate, Outlet } from 'react-router';
import { CameraIcon } from 'lucide-react';

import globalStyles from '@/styles/globals.module.css';
import styles from './AuthLayout.module.css';
import { useAuth } from '@/contexts/AuthContext.tsx';
import PageTransition from '@/components/pageTransition/PageTransition.tsx';

interface LayoutProps {
  showHeader?: boolean;
}

export const AuthLayout = ({ showHeader = true }: LayoutProps) => {
  const { user , isAuthorizing} = useAuth()

  if (isAuthorizing) {
    return <PageTransition />;
  }

  if (!isAuthorizing && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className={`${styles.layout} ${globalStyles.filmGrain}`}>
      {showHeader && (
        <header className={styles.header}>
          <div className={styles.headerContainer}>
            <div className={styles.headerContent}>
              <div className={styles.logoContainer}>
                <div className={styles.iconContainer}>
                  <CameraIcon className="w-8 h-8 text-yellow-400" />
                  <div className={styles.iconDot}></div>
                </div>
                <h1 className={styles.title}>
                  LUMIÈRE
                </h1>
              </div>
            </div>
          </div>
        </header>
      )}

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
