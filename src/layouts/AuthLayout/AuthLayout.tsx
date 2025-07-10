import { NavLink, Outlet, Navigate } from 'react-router';
import styles from './AuthLayout.module.css';
import { useAuth } from '@/contexts';

export const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // If the user is already authenticated, redirect to home
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className={styles.page_wrapper}>
      <header className={styles.page_header}>
        <ul className={styles.nav_links}>
          <li><NavLink to="/">Home</NavLink></li>
        </ul>
        <h1>Lumiere Web Front</h1>
      </header>
      <div className={styles.page_content}>
        <Outlet />
      </div>
    </div>
  );
};
