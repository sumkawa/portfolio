import Image from 'next/image';
import styles from './HeroBackground.module.css';
import HomepageTitle from '../HomepageTitle';
import ScrollArrow from '@/components/Core/ScrollArrow/ScrollArrow';
import React from 'react';

function HeroBackground() {
  return (
    <div className={styles.parallaxContainer}>
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
      <HomepageTitle />
      <ScrollArrow />
    </div>
  );
}

export default HeroBackground;
