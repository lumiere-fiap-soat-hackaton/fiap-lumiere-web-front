import reactLogo from '@/assets/logo.svg';
import styles from './Landing.module.css';
import { NavLink } from 'react-router';

export const Landing = () => {
  return (
    <div className={styles.page_wrapper}>
      <header className={styles.page_header}>
        <ul className={styles.nav_links}>
          <li><NavLink to="/sign-in">Sign In</NavLink></li>
          <li><NavLink to="/sign-up">Sign Up</NavLink></li>
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
