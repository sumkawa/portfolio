import React from 'react';
import Navbar from '@/components/Core/Nav/Navbar/Navbar';
import HeroBackground from '../components/Homepage/HeroBackground';
import Stars from '../components/Homepage/Stars';
import styles from './page.module.css';
import Image from 'next/image';
import HeroGrid from '@/components/Homepage/HeroGrid/HeroGrid';

export default function Home() {
  return (
    <>
      <div className={styles.parallax}>
        <Navbar />
        {/* <div className={styles.main}>
        <HeroBackground />
        
      </div> */}
        {/* <div className={styles.hero}>
          <div className={styles.wrapper}>
            <h1 className={styles.heroTitle}>Hi I'm Summit!</h1>
          </div>
        </div> */}
        <Image
          src='/hero_homepage/background_1.svg'
          alt='Very Background Mountain'
          className={styles.background2}
          width={1920}
          height={1358}
          priority
        />
        <Image
          src='/hero_homepage/background_2.svg'
          alt='Very Background Mountain'
          className={styles.background2}
          width={1920}
          height={1358}
          priority
        />
        <Image
          src='/hero_homepage/background_3.svg'
          alt='Very Background Mountain'
          className={styles.background3}
          width={1920}
          height={1358}
          priority
        />
        <Image
          src='/hero_homepage/background_4.svg'
          alt='Very Background Mountain'
          className={styles.background4}
          width={1920}
          height={1358}
          priority
        />
        <Image
          src='/hero_homepage/foreground_5.svg'
          alt='Very Background Mountain'
          className={styles.foreground}
          width={1920}
          height={1358}
          priority
        />
      </div>
      <main className={styles.homepageText}>
        <div className={styles.scrollPast}>
          <p className={styles.subText}>
            Electrical engineer, DJ, and aspiring space cadet.
          </p>
        </div>
        <div className={styles.aboutMe}>
          <HeroGrid />
        </div>
      </main>
    </>
  );
}
