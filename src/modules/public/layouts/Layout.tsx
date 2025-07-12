import styles from './Layout.module.css';
import globalStyles from '@/styles/globals.module.css';
import React, { type ReactNode } from 'react';
import { CameraIcon } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showHeader = true }) => {
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
        {children}
      </main>
    </div>
  );
};

export default Layout;
