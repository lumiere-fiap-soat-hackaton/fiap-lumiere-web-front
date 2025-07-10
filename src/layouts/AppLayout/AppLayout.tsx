import { Navigate, Outlet } from 'react-router';
import SignOutButton from '@/modules/authentication/components/SignOutButton/SignOutButton';
import styles from './AppLayout.module.css';
import { useAuth } from '@/contexts';

export const AppLayout = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

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
      <div className={styles.user_session}>
        <SignOutButton />
      </div>
      <header>
        <h2>🎥 Video Pictures - POC</h2>
        <div className={styles.user_session}>
          {user?.picture && <img src={user.picture} alt="Foto do perfil" />}
          <p className={styles.greetings}>Olá, {user?.name || user?.email || 'Usuário'}</p>  | <p>sair</p>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
