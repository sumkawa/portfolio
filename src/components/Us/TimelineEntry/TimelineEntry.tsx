'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { easings } from '@/utils/animations';
import styles from './TimelineEntry.module.css';

interface Frontmatter {
  date: string;
  location: string;
  photo?: string;
  preview: string;
}

interface TimelineEntryProps {
  frontmatter: Frontmatter;
  children: React.ReactNode;
}

export default function TimelineEntry({ frontmatter, children }: TimelineEntryProps) {
  const [expanded, setExpanded] = useState(false);

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

        {frontmatter.photo && (
          <div className={styles.photoWrapper}>
            <Image
              src={frontmatter.photo}
              alt={`${frontmatter.date} — ${frontmatter.location}`}
              width={560}
              height={400}
              className={styles.photo}
              sizes="(max-width: 600px) 100vw, 560px"
            />
          </div>
        )}

        <p className={styles.preview}>{frontmatter.preview}</p>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              className={styles.letterBody}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: easings.easeOutQuart }}
            >
              <div className={`prose ${styles.prose}`}>{children}</div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          className={styles.toggle}
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {expanded ? 'close ↑' : 'read more ↓'}
        </button>
      </div>
    </motion.article>
  );
}
