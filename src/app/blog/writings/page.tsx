import React from 'react';
import Navbar from '@/components/Core/Nav/Navbar/Navbar';
import styles from './blog.module.css';
import BlogPostCard from '@/components/Blog/BlogPostCard/BlogPostCard';
import HorizontalBar from '@/components/Core/HorizontalBar/HorizontalBar';
import { promises as fs } from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import path from 'path';

export default async function BlogHome() {
  const filenames = await fs.readdir(path.join(process.cwd(), 'src/writings'));

  interface Frontmatter {
    title: string;
    date: string;
    description: string;
  }

  const writings = await Promise.all(
    filenames.map(async (filename) => {
      const content = await fs.readFile(
        path.join(process.cwd(), 'src/writings', filename),
        'utf-8'
      );
      const { frontmatter } = await compileMDX<Frontmatter>({
        source: content,
        options: {
          parseFrontmatter: true,
          mdxOptions: {
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
          },
        },
      });
      return {
        filename,
        slug: filename.replace('.mdx', ''),
        title: frontmatter.title,
        date: frontmatter.date,
        description: frontmatter.description,
      };
    })
  );

  return (
    <main className={styles.mainContent}>
      <Navbar />
      <div className={styles.overWrapper}>
        <div className={styles.wrapper}>
          <section className={styles.textWrapper}>
            <h1 className={styles.mainHeader}>
              Writings<p style={{ color: '#0165FC' }}>.</p>
            </h1>
            <HorizontalBar height={'1px'} width={'120px'} color={'#0165FC'} />
            <p className={styles.bodyText}>
              Every now and then I{"'"}ll have some random thoughts I quickly
              jot down.
            </p>
          </section>
          <section className={styles.blogContent}>
            {writings.map((post, idx) => (
              <React.Fragment key={post.slug}>
                <BlogPostCard
                  title={post.title}
                  date={post.date}
                  link={`/blog/writings/${post.slug}`}
                  blogType='writings'
                >
                  {post.description}
                </BlogPostCard>
                {idx < writings.length - 1 && (
                  <HorizontalBar
                    height={'1px'}
                    width={'100%'}
                    color={'#B9BBC6'}
                  />
                )}
              </React.Fragment>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
