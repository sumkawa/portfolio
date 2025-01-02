import React from 'react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import styles from './NavMenuItem.module.css';
import { motion } from 'framer-motion';
import {
  arrowMotion,
  dividerMotion,
  itemContentMotion,
} from '@/utils/animations';
import Link from 'next/link';

interface NavMenuItemProps {
  index: number;
  title: string;
  href: string;
}

const NavMenuItem: React.FC<NavMenuItemProps> = ({ index, title, href }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  const pointerEvents = isLoading ? 'none' : 'auto';
  return (
    <Link href={href} passHref style={{ textDecoration: 'none' }}>
      <motion.li
        className={styles.navMenuItem}
        initial='initial'
        animate='animate'
        whileHover='hover'
        whileTap='hover'
        style={{ pointerEvents, listStyle: 'none' }}
        onAnimationComplete={() => setIsLoading(false)}
      >
        <div className={styles.wrapper}>
          <div className={styles.background}></div>
          <motion.span className={styles.index} variants={itemContentMotion}>
            {index.toLocaleString('en-US', { minimumIntegerDigits: 2 })}
          </motion.span>
          <h1 className={styles.title}>{title}</h1>
          <motion.div className={styles.arrow} variants={arrowMotion}>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_708_2)'>
                <path
                  d='M19.9729 5.09847C19.9729 4.35473 19.3914 3.81383 18.7424 3.81383C18.0797 3.81383 17.5252 4.3953 17.5252 5.04439V10.0342L17.7687 16.3492L15.5375 13.8341L2.10953 0.406126C1.86613 0.16272 1.56862 0.0410156 1.2576 0.0410156C0.581473 0.0410156 0 0.663056 0 1.31214C0 1.59611 0.135226 1.92066 0.378634 2.16407L13.7795 15.5785L16.2948 17.7963L9.69571 17.5798H4.98985C4.35428 17.5798 3.77281 18.1343 3.77281 18.7834C3.77281 19.4324 4.28666 20.0004 5.04394 20.0004H18.6477C19.459 20.0004 19.9594 19.473 19.9594 18.7023L19.9729 5.09847Z'
                  fill='white'
                  fillOpacity='0.85'
                />
              </g>
              <defs>
                <clipPath id='clip0_708_2'>
                  <rect width='19.9729' height='20' fill='white' />
                </clipPath>
              </defs>
            </svg>
          </motion.div>
          <motion.div className={styles.mobileArrow}>
            <ArrowRightIcon width='20px' height='20px' />
          </motion.div>
          <motion.div
            className={styles.bottomLine}
            variants={dividerMotion}
          ></motion.div>
        </div>
      </motion.li>
    </Link>
  );
};

export default NavMenuItem;
