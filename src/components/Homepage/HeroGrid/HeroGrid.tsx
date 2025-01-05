'use client';
import React from 'react';
import styles from './HeroGrid.module.css';
import Link from 'next/link';
import { motion, MotionConfig } from 'framer-motion';

function HeroGrid() {
  return (
    <div className={styles.gridParent}>
      <div className={styles.div1}>
        I{"'"}m currently...
        <div></div>
      </div>
      <div className={styles.div2}>
        Work
        <br></br>
        <div className={styles.gridText}>
          Current:
          <ul>
            <li>Embedded @ Stanford Space Initiative</li>
            <li>EE & Physics Research @ Stanford Radio Glaciology</li>
          </ul>
          <br></br>
          Previous:
          <ul>
            <li>SWE @ AuroraX Physics</li>
            <li>Team Canada Debate</li>
            <li>Researcher @ Alberta Precision Labs</li>
            <li>Researcher @ Dr. Kaler{"'"}s Lab, Alberta Health Services</li>
          </ul>
        </div>
      </div>
      <MotionConfig transition={{ duration: 0.125 }}>
        <Link className={styles.div3} href={'/blog/learnings'} passHref>
          <motion.div
            className={styles.buttonLink}
            whileHover={{ rotate: '10deg' }}
            whileTap={{ scale: 0.9 }}
          >
            Cool Ideas
          </motion.div>
        </Link>
        <Link className={styles.div4} href={'/blog/writings'} passHref>
          <motion.div
            className={styles.buttonLink}
            whileHover={{ rotate: '10deg' }}
            whileTap={{ scale: 0.9 }}
          >
            Writings
          </motion.div>
        </Link>
      </MotionConfig>
    </div>
  );
}

export default HeroGrid;
