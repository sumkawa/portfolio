'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './TimeTogether.module.css';

interface TimeTogetherProps {
  startDate: string;
}

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function TimeTogether({ startDate }: TimeTogetherProps) {
  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed | null>(null);

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const difference = now - start;

      if (difference < 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    setTimeElapsed(calculateTimeElapsed());

    const timer = setInterval(() => {
      setTimeElapsed(calculateTimeElapsed());
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate]);

  if (!timeElapsed) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  const timeUnits = [
    { value: timeElapsed.days, label: 'Days' },
    { value: timeElapsed.hours, label: 'Hours' },
    { value: timeElapsed.minutes, label: 'Minutes' },
    { value: timeElapsed.seconds, label: 'Seconds' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.counter}>
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            className={styles.timeUnit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.span
              className={styles.number}
              key={unit.value}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {String(unit.value).padStart(2, '0')}
            </motion.span>
            <span className={styles.label}>{unit.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
