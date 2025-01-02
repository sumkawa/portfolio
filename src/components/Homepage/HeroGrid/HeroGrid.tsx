import React from 'react';
import styles from './HeroGrid.module.css';

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
      <div className={styles.div3}>Cool Ideas</div>
      <div className={styles.div4}>Writings</div>
    </div>
  );
}

export default HeroGrid;
