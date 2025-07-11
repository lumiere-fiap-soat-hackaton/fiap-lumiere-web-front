import { Navigate, Outlet } from 'react-router';
import { CameraIcon } from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';
import SignOutButton from '@/modules/authentication/components/SignOutButton/SignOutButton';
import { RecordsProvider } from '@/modules/application/providers';
import globalStyles from '@/styles/globals.module.css';
import styles from './AppLayout.module.css';
import PageTransition from '@/components/pageTransition/PageTransition.tsx';

export const AppLayout = () => {
  const { user, isAuthorizing } = useAuth();

  if (isAuthorizing) {
    return <PageTransition />;
  }

  if (!isAuthorizing && !user) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <RecordsProvider>
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
    </RecordsProvider>
  );
};
