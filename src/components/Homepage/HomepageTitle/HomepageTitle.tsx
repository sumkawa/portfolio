'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styles from './HomepageTitle.module.css';

function HomepageTitle() {
  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
        }}
      >
        <p className={styles.Title}>
          {"Hi! I'm"} <a className={styles.TitleName}>Summit</a>
        </p>
      </motion.div>
    </>
  );
}

export default HomepageTitle;
