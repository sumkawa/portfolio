import { compileMDX } from 'next-mdx-remote/rsc';
import { promises as fs } from 'fs';
import path from 'path';
import styles from './page.module.css';
import PasswordGate from '@/components/Us/PasswordGate/PasswordGate';
import TimelineEntry from '@/components/Us/TimelineEntry/TimelineEntry';
import TextEntry from '@/components/Us/TextEntry/TextEntry';
import PhotoEntry from '@/components/Us/PhotoEntry/PhotoEntry';

interface Frontmatter {
  type?: 'letter' | 'text' | 'photo';
  date: string;
  location?: string;
  // letter
  photo?: string;
  preview?: string;
  // text
  text?: string;
  // photo
  caption?: string;
}

async function getEntries() {
  const dir = path.join(process.cwd(), 'src/us-letters');
  let files: string[];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }

  const parseDateFromFilename = (filename: string) => {
    const match = filename.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (!match) return 0;
    return parseInt(match[1]) * 10000 + parseInt(match[2]) * 100 + parseInt(match[3]);
  };

  const mdxFiles = files
    .filter((f) => f.endsWith('.mdx'))
    .sort((a, b) => parseDateFromFilename(b) - parseDateFromFilename(a));

  const entries = await Promise.all(
    mdxFiles.map(async (filename) => {
      const source = await fs.readFile(path.join(dir, filename), 'utf-8');
      const { content, frontmatter } = await compileMDX<Frontmatter>({
        source,
        options: { parseFrontmatter: true },
      });
      return { frontmatter, content };
    })
  );

  return entries;
}

export default async function UsPage() {
  const entries = await getEntries();

  return (
    <PasswordGate>
      <main className={styles.main}>
        <header className={styles.pageHeader}>
          <h1 className={styles.title}>us</h1>
          <div className={styles.rule} />
        </header>

        <div className={styles.timeline}>
          {entries.map(({ frontmatter, content }, i) => {
            const type = frontmatter.type ?? 'letter';

            if (type === 'text') {
              return (
                <TextEntry
                  key={i}
                  frontmatter={{
                    date: frontmatter.date,
                    location: frontmatter.location,
                    text: frontmatter.text ?? '',
                  }}
                />
              );
            }

            if (type === 'photo') {
              return (
                <PhotoEntry
                  key={i}
                  frontmatter={{
                    date: frontmatter.date,
                    location: frontmatter.location,
                    photo: frontmatter.photo ?? '',
                    caption: frontmatter.caption,
                  }}
                />
              );
            }

            return (
              <TimelineEntry
                key={i}
                frontmatter={{
                  date: frontmatter.date,
                  location: frontmatter.location ?? '',
                  photo: frontmatter.photo,
                  preview: frontmatter.preview ?? '',
                }}
              >
                {content}
              </TimelineEntry>
            );
          })}
        </div>
      </main>
    </PasswordGate>
  );
}
