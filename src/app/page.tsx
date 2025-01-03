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
            Electrical engineer, DJ, and aspiring space cadet.
          </p>
        </div>
        <div className={styles.aboutMe}>
          <HeroGrid />
        </div>
      </section>
    </main>
  );
}

{
  /* <div>
            <div className={styles.info}>
              I'm a freshman at Stanford, originally from a Canadian city called
              Calgary. I love learning about everything, and I do my best to
              write about what I've learned. Outside of that, I'm a hobby
              pianist, skiier, and DJ.
            </div>
            <div className={styles.positions}>
              Currently: Researcher @ Stanford Radio Glaciology, Embedded
              Software for Stanford Space Initiative
              <br></br>
              Previous: Intern @ AuroraX, Biotech & Urological Researcher @
              Alberta Health Services, Team Canada Debate
            </div>
          </div>
          <div className={styles.links}>
            <a href='#about'>About Me</a>
            <a href='#blog'>Blog</a>
            <a href='#projects'>Projects</a>
            <a href='#contact'>Contact</a>
            <a
              href='https://linkedin.com/in/your-profile'
              target='_blank'
              rel='noopener noreferrer'
            >
              LinkedIn
            </a>
            <a
              href='https://github.com/your-profile'
              target='_blank'
              rel='noopener noreferrer'
            >
              GitHub
            </a>
            <a
              href='https://twitter.com/your-profile'
              target='_blank'
              rel='noopener noreferrer'
            >
              Twitter
            </a>
          </div> */
}
