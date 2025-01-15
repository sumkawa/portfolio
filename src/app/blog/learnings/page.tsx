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
  const filenames = await fs.readdir(
    path.join(process.cwd(), 'src/stanford_classes')
  );

  interface Frontmatter {
    title: string;
    date: string;
    description: string;
  }

  const stanford = await Promise.all(
    filenames.map(async (filename) => {
      const content = await fs.readFile(
        path.join(process.cwd(), 'src/stanford_classes', filename),
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
              Cool Stuff I{"'"}ve Learned<p style={{ color: '#C41E3A' }}>.</p>
            </h1>
            <HorizontalBar height={'1px'} width={'120px'} color={'#C41E3A'} />
            <p className={styles.bodyText}>
              I love learning but don{"'"}t like forgetting what I{"'"}ve
              learned. Here I do my best to document interesting and useful
              stuff from courses I{"'"}ve taken and other sources.
            </p>
          </section>
          <section className={styles.blogContent}>
            {stanford.map((post, idx) => (
              <React.Fragment key={post.slug}>
                <BlogPostCard
                  title={post.title}
                  date={post.date}
                  link={`/blog/learnings/${post.slug}`}
                  blogType='stanford'
                >
                  {post.description}
                </BlogPostCard>
                {idx < stanford.length - 1 && (
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
