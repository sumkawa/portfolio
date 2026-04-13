'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/components/Us/PasswordGate/PasswordGate.module.css';

const SESSION_KEY = 'fruitgame_auth';

export default function FruitgamePasswordGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem(SESSION_KEY) === '1') {
      setAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expected = process.env.NEXT_PUBLIC_FRUITGAME_PASSWORD;
    if (expected && input === expected) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setAuthenticated(true);
    } else {
      setError(true);
      setInput('');
      setTimeout(() => setError(false), 1200);
    }
  };

  if (!mounted) return null;

  if (authenticated) return <>{children}</>;

  return (
    <div className={styles.gate}>
      <p className={styles.symbol}>✦</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="fruit game"
          autoFocus
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          aria-label="Fruit game password"
        />
      </form>
      {error && <p className={styles.errorMsg}>try again</p>}
    </div>
  );
}
