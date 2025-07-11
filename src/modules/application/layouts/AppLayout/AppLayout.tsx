import { Navigate, Outlet, useLocation } from 'react-router';
import { CameraIcon } from 'lucide-react';

import { useAuth } from '@/contexts';

import styles from './AppLayout.module.css';
import SignOutButton from '@/modules/authentication/components/SignOutButton/SignOutButton.tsx';
import PageTransition from '@/components/pageTransition/PageTransition.tsx';
import globalStyles from '@/styles/globals.module.css';

export const AppLayout = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <PageTransition />
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return (
    <div className={`${styles.layout} ${globalStyles.filmGrain}`}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.greetingContainer}>
            {user?.picture && <img className={styles.userAvatar} src={user.picture} alt="Foto do perfil" />}
            <p className={styles.greetings}>{user?.name || user?.email || 'Usuário'}</p> | <SignOutButton />
          </div>
          <div className={styles.headerContent}>
            <div className={styles.logoContainer}>
              <div className={styles.iconContainer}>
                <CameraIcon size={48} className="w-8 h-8 text-yellow-400" />
                <div className={styles.iconDot}></div>
              </div>
              <h1 className={styles.title}>Lumière</h1>
            </div>
          </div>
        </div>

      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
