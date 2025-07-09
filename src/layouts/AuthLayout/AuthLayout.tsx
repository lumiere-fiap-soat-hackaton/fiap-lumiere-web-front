import { NavLink, Outlet } from 'react-router';
import styles from './AuthLayout.module.css';

export const AuthLayout = () => {
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
