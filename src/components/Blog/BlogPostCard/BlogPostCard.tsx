import React from 'react';
import styles from './BlogPostCard.module.css';
import Link from 'next/link';
import HorizontalBar from '@/components/Core/HorizontalBar/HorizontalBar';

interface BlogPostCardProps {
  title: string;
  children: string;
  link: string;
  date: string;
  blogType: 'stanford' | 'writings';
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  title,
  children,
  link,
  date,
  blogType,
}) => {
  const isStanford = blogType === 'stanford';
  const barColor = isStanford ? '#C41E3A' : '#0165FC';
  const dateColor = isStanford ? '#FF917F' : '#cee3ff';

  return (
    <div className={styles.card}>
      <div className={styles.date} style={{ color: dateColor }}>
        {date}
        <HorizontalBar width={'140px'} height={'4px'} color={barColor} />
      </div>
      <div className={styles.text}>
        <Link href={link} className={styles.header} passHref>
          {title}
        </Link>
        <div className={styles.desc}>{children}</div>
        <div className={styles.readMore}>
          <Link href={link} passHref>
            <span className={styles.link}>
              Read more
              <svg
                className={styles.arrow}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke={barColor}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='5' y1='12' x2='19' y2='12' />
                <polyline points='12 5 19 12 12 19' />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
