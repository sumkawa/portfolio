import { compileMDX } from 'next-mdx-remote/rsc';
import { promises as fs } from 'fs';
import path from 'path';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import styles from './stanford.module.css';
import Navbar from '@/components/Core/Nav/Navbar/Navbar';
import HorizontalBar from '@/components/Core/HorizontalBar/HorizontalBar';

interface Frontmatter {
  title: string;
  date: string;
}

type tParams = Promise<{ slug: string[] }>;

export default async function ProjectPage(props: { params: tParams }) {
  const { slug } = await props.params;
  const content = await fs.readFile(
    path.join(process.cwd(), 'src/stanford_classes', `${slug}.mdx`),
    'utf-8'
  );

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

export async function generateStaticParams() {
  const files = await fs.readdir(
    path.join(process.cwd(), 'src/stanford_classes')
  );
  const slugs = files.map((file) => ({
    slug: file.replace(/\.mdx$/, ''),
  }));

  return slugs.map((slug) => ({
    params: slug,
  }));
}
