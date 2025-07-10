import reactLogo from '@/assets/logo.svg';
import styles from './Landing.module.css';
import { NavLink } from 'react-router';
import { useAuth } from '@/contexts';
import SignOutButton from '@/modules/authentication/components/SignOutButton/SignOutButton';

export const Landing = () => {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className={styles.page_wrapper}>
      <header className={styles.page_header}>
        <ul className={styles.nav_links}>
          {isLoading ? (
            <li>Loading...</li>
          ) : isAuthenticated ? (
            <>
              <li><NavLink to="/home">Go to App</NavLink></li>
              <li><SignOutButton /></li>
            </>
          ) : (
            <>
              <li><NavLink to="/sign-in">Sign In</NavLink></li>
              <li><NavLink to="/sign-up">Sign Up</NavLink></li>
            </>
          )}
        </ul>
      </header>
      <div className={styles.page_content}>
        <span>
          <img src={reactLogo} className="logo" alt="React logo" />
        </span>
        <h1>Lumiere LandingPage</h1>
      </div>
    </div>
  );
};
