'use client';

import React, { useState, useEffect } from 'react';
import styles from './PasswordGate.module.css';

const SESSION_KEY = 'us_auth';

export default function PasswordGate({ children }: { children: React.ReactNode }) {
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
    if (input === process.env.NEXT_PUBLIC_US_PASSWORD) {
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
          placeholder="password"
          autoFocus
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          aria-label="password"
        />
      </form>
      {error && <p className={styles.errorMsg}>try again</p>}
    </div>
  );
}
