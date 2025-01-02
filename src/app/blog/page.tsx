import React from 'react';
import Navbar from '@/components/Core/Nav/Navbar/Navbar';
import styles from './blog.module.css';

const BlogHome = () => {
  return (
    <main className={styles.mainContent}>
      <Navbar />
      <div className={styles.wrapper}>
        <section>
          <h1>Stanford Blog</h1>
          <p>
            Welcome to the Stanford blog! Here, we’ll explore all things related
            to Stanford, its events, and more!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            semper, mi porttitor cursus porta, mauris massa pharetra orci.
          </p>
        </section>
      </div>
    </main>
  );
};

export default BlogHome;
