'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { easings } from '@/utils/animations';
import styles from './TextEntry.module.css';

interface TextEntryProps {
  frontmatter: {
    date: string;
    location?: string;
    text: string;
  };
}

export default function TextEntry({ frontmatter }: TextEntryProps) {
  return (
    <motion.article
      className={styles.entry}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: easings.easeOutQuart }}
    >
      <div className={styles.dotConnector}>
        <span className={styles.dot} />
      </div>

      <div className={styles.body}>
        <header className={styles.header}>
          <span className={styles.date}>{frontmatter.date}</span>
          {frontmatter.location && (
            <>
              <span className={styles.separator}>·</span>
              <span className={styles.location}>{frontmatter.location}</span>
            </>
          )}
        </header>

        <p className={styles.text}>{frontmatter.text}</p>
      </div>
    </motion.article>
  );
}
