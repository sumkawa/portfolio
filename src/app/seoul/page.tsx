import React from 'react';
import styles from './page.module.css';
import Countdown from '@/components/Seoul/Countdown/Countdown';
import TimeTogether from '@/components/Seoul/TimeTogether/TimeTogether';
import PhotoCollage from '@/components/Seoul/PhotoCollage/PhotoCollage';
import FloatingHearts from '@/components/Seoul/FloatingHearts/FloatingHearts';

export default function SeoulPage() {
  return (
    <main className={styles.main}>
      <FloatingHearts />
      <div className={styles.gradientOverlay} />
      <div className={styles.content}>
        <div className={styles.frostedCard}>
          <header className={styles.header}>
            <h1 className={styles.title}>Seoul Mate?</h1>
            <p className={styles.subtitle}>I love you bebs :,)</p>
          </header>

          <div className={styles.countdownsContainer}>
            <div className={styles.countdownSection}>
              <p className={styles.countdownLabel}>Been together for</p>
              <TimeTogether startDate="2025-12-17T00:00:00" />
            </div>

            <div className={styles.countdownSection}>
              <p className={styles.countdownLabel}>Seoul Trip In</p>
              <Countdown targetDate="2026-03-21T17:00:00+09:00" />
            </div>
          </div>
        </div>

        <section className={styles.collageSection}>
          <PhotoCollage />
        </section>
      </div>
    </main>
  );
}
