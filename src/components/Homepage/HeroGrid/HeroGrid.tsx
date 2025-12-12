'use client';
import React from 'react';
import styles from './HeroGrid.module.css';

function HeroGrid() {
  return (
    <div className={styles.gridParent}>
      <div className={styles.currentColumn}>
        <h2 className={styles.columnTitle}>I{"'"}m currently...</h2>
        <div className={styles.gridText}>
          <ul>
            <li>Incoming Backend SWE @ Ramp</li>
            <li>Poker-ing</li>
            <li>Freestyle skiing</li>
            <li>Building my own Redis</li>
          </ul>
        </div>
      </div>
      <div className={styles.previousColumn}>
        <h2 className={styles.columnTitle}>Previously...</h2>
        <div className={styles.gridText}>
          <ul>
            <li>Payments SWE @ Nitra</li>
            <li>Fullstack SWE @ Karma</li>
            <li>FE and ML SWE @ AuroraX Physics</li>
            <li>Team Canada Debate</li>
            <li>Researcher @ Alberta Precision Labs</li>
            <li>Researcher @ Dr. Kaler's Lab, Alberta Health Services</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HeroGrid;
