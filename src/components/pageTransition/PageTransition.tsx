
import React from 'react';
import styles from './PageTransition.module.css';
import CameraIcon from '@/components/CameraIcon.tsx';

interface PageTransitionProps {
  isVisible?: boolean;
}

const PageTransition: React.FC<PageTransitionProps> = ({ isVisible = true }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <CameraIcon className={styles.cameraIcon} />
          <div className={styles.filmStrip}>
            <div className={styles.filmHole}></div>
            <div className={styles.filmHole}></div>
            <div className={styles.filmHole}></div>
            <div className={styles.filmHole}></div>
          </div>
        </div>
        
        <div className={styles.loadingText}>
          <span className={styles.letter}>C</span>
          <span className={styles.letter}>A</span>
          <span className={styles.letter}>R</span>
          <span className={styles.letter}>R</span>
          <span className={styles.letter}>E</span>
          <span className={styles.letter}>G</span>
          <span className={styles.letter}>A</span>
          <span className={styles.letter}>N</span>
          <span className={styles.letter}>D</span>
          <span className={styles.letter}>O</span>
          <span className={styles.dots}>...</span>
        </div>
      </div>
    </div>
  );
};

export default PageTransition;
