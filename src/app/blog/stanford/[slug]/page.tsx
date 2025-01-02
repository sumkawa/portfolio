import { compileMDX } from 'next-mdx-remote/rsc';
import { promises as fs } from 'fs';
import path from 'path';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import styles from './stanford.module.css';
import Navbar from '@/components/Core/Nav/Navbar/Navbar';
import HorizontalBar from '@/components/Core/HorizontalBar/HorizontalBar';

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const content = await fs.readFile(
    path.join(process.cwd(), 'src/stanford_classes', `${params.slug}.mdx`),
    'utf-8'
  );

  interface Frontmatter {
    title: string;
    date: string;
  }

  const data = await compileMDX<Frontmatter>({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    },
  });

  return (
    <main className={styles.mainContent}>
      <Navbar />
      <div className={styles.overWrapper}>
        <div className={styles.wrapper}>
          <section className={styles.textWrapper}>
            <div className={styles.date}>{data.frontmatter.date}</div>
            <h1 className={styles.mainHeader}>{data.frontmatter.title}</h1>
            <HorizontalBar height={'1px'} width={'120px'} color={'#C41E3A'} />
            <div className='prose'>{data.content}</div>
          </section>
        </div>
      </div>
    </main>
  );
}
