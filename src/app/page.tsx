import React from 'react';
import Navbar from '@/components/Core/Nav/Navbar/Navbar';
import HeroBackground from '../components/Homepage/HeroBackground';
import Stars from '../components/Homepage/Stars';
import styles from './page.module.css';
import HeroGrid from '@/components/Homepage/HeroGrid/HeroGrid';

export default function Home() {
  return (
    <main className={styles.wrapper}>
      <Navbar />
      <div className={styles.main}>
        <HeroBackground />
        <Stars />
      </div>

      <section className={styles.homepageText}>
        <div className={styles.scrollPast}>
          <p className={styles.subText}>
            Systems CS & EE @ Stanford
          </p>
        </div>
        <div className={styles.aboutMe}>
          <HeroGrid />
        </div>
      </section>
    </main>
  );
}
