'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './FloatingHearts.module.css';

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  swayAmount: number;
  initialRotation: number;
}

function SakuraPetal({ size, opacity, id }: { size: number; opacity: number; id: number }) {
  const gradientId = `petalGradient-${id}`;
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 12 17"
      style={{ opacity }}
    >
      <path
        d="M6 0 C2 3, 0 7, 0 11 C0 14, 2.5 17, 6 17 C9.5 17, 12 14, 12 11 C12 7, 10 3, 6 0"
        fill={`url(#${gradientId})`}
      />
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd4dc" />
          <stop offset="50%" stopColor="#ffb7c5" />
          <stop offset="100%" stopColor="#ffa0b4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function FloatingHearts() {
  const [mounted, setMounted] = useState(false);
  const [windowHeight, setWindowHeight] = useState(800);

  useEffect(() => {
    setMounted(true);
    setWindowHeight(window.innerHeight);
  }, []);

  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 12 + Math.random() * 10,
      size: 8 + Math.random() * 10,
      opacity: 0.5 + Math.random() * 0.4,
      swayAmount: 20 + Math.random() * 40,
      initialRotation: Math.random() * 360,
    }));
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.container}>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className={styles.petal}
          style={{
            left: `${petal.x}%`,
          }}
          animate={{
            y: [-50, windowHeight + 50],
            x: [0, petal.swayAmount, -petal.swayAmount, petal.swayAmount / 2, 0],
            rotate: [petal.initialRotation, petal.initialRotation + 360],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
            x: {
              duration: petal.duration,
              ease: 'easeInOut',
              repeat: Infinity,
            },
          }}
        >
          <SakuraPetal size={petal.size} opacity={petal.opacity} id={petal.id} />
        </motion.div>
      ))}
    </div>
  );
}
