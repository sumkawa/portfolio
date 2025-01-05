'use client';
import React from 'react';
import Link from 'next/link';
import styles from './BigScreenNav.module.css';
import { motion, MotionConfig } from 'framer-motion';

function BigScreenNav() {
  return (
    <MotionConfig transition={{ duration: 0.125, ease: 'easeInOut' }}>
      <div className={styles.navBigScreen}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link href='/blog/writings' className={styles.navBigItem} passHref>
            Writings
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link href='/blog/learnings' className={styles.navBigItem} passHref>
            Stuff I{"'"}ve Learned
          </Link>
        </motion.div>
      </div>
    </MotionConfig>
  );
}

export default BigScreenNav;
