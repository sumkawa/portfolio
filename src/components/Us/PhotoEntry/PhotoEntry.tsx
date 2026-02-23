'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { easings } from '@/utils/animations';
import styles from './PhotoEntry.module.css';

interface PhotoEntryProps {
  frontmatter: {
    date: string;
    location?: string;
    photo: string;
    caption?: string;
  };
}

export default function PhotoEntry({ frontmatter }: PhotoEntryProps) {
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

        <div className={styles.photoWrapper}>
          <Image
            src={frontmatter.photo}
            alt={frontmatter.caption ?? `${frontmatter.date}`}
            width={560}
            height={400}
            className={styles.photo}
            sizes="(max-width: 600px) 100vw, 560px"
          />
        </div>

        {frontmatter.caption && (
          <p className={styles.caption}>{frontmatter.caption}</p>
        )}
      </div>
    </motion.article>
  );
}
