import Image from 'next/image';
import styles from './HeroBackground.module.css';
import HomepageTitle from '../HomepageTitle';
import ScrollArrow from '@/components/Core/ScrollArrow/ScrollArrow';
import React from 'react';

function HeroBackground() {
  return (
    <>
      {/* Background1 (sky) - static, no parallax transform, lowest z-index */}
      <Image
        src='/hero_homepage/background_1.png'
        alt='Sky Background'
        className={styles.background1}
        width={1920}
        height={1358}
        priority
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <Image
        src='/hero_homepage/background_2.svg'
        alt='Very Background Mountain'
        className={styles.background2}
        width={1920}
        height={1358}
        priority
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <Image
        src='/hero_homepage/background_3.svg'
        alt='Background Mountain'
        className={styles.background3}
        width={1920}
        height={1358}
        priority
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <Image
        src='/hero_homepage/background_4.svg'
        alt='Closer Mountain'
        className={styles.background4}
        width={1920}
        height={1358}
        priority
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <Image
        src='/hero_homepage/foreground_5.svg'
        alt='Foreground Mountain'
        className={styles.foreground}
        width={1920}
        height={1358}
        priority
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <HomepageTitle />
      <ScrollArrow />
    </>
  );
}

export default HeroBackground;
