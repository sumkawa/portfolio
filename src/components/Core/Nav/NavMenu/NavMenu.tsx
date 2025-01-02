import React from 'react';
import { motion } from 'framer-motion';
import { easings } from '@/utils/animations';
import NavMenuItem from '../NavMenuItem/NavMenuItem';
import styles from './NavMenu.module.css';

function NavMenu() {
  const navItems = [
    { title: `Stuff I've learned`, href: '/blog/stanford' },
    { title: 'Misc. Writings', href: '/blog/writings' },
  ];

  return (
    <motion.nav
      className={styles.NavParent}
      initial={{ y: '-100%' }}
      animate={{
        y: 0,
        transition: { duration: 1, ease: easings.easeOutQuart },
      }}
      exit={{ y: '-100%', transition: { duration: 0.3 } }}
    >
      <motion.ul
        exit={{ opacity: 0, transition: { duration: 0 } }}
        className={styles.ul}
      >
        {navItems.map((item, idx) => (
          <NavMenuItem
            key={idx}
            index={idx + 1}
            title={item.title}
            href={item.href}
          />
        ))}
      </motion.ul>
    </motion.nav>
  );
}

export default NavMenu;
