'use client';
import React from 'react';
import styles from './Navbar.module.css';
import NavMenuToggle from '../NavMenuToggle/NavMenuToggle';
import NavMenu from '../NavMenu/NavMenu';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <>
      <AnimatePresence>{menuOpen && <NavMenu />}</AnimatePresence>
      <div className={styles.NavWrapper}>
        <Link href='/' className={styles.Logo} passHref>
          <Image
            src='/logo/logo.svg'
            width={48}
            height={48}
            alt="Summit's Logo"
          />
        </Link>
        {/* <BigScreenNav /> */}
        <div className={styles.separator} />
        <NavMenuToggle menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
    </>
  );
}

export default Navbar;
