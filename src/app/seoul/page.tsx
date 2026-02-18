import React from 'react';
import styles from './page.module.css';
import Countdown from '@/components/Seoul/Countdown/Countdown';
import TimeTogether from '@/components/Seoul/TimeTogether/TimeTogether';
import PhotoCollage from '@/components/Seoul/PhotoCollage/PhotoCollage';
import FloatingHearts from '@/components/Seoul/FloatingHearts/FloatingHearts';

export default function SeoulPage() {
  return (
    <main className={styles.main}>
      <FloatingHearts />
      <div className={styles.gradientOverlay} />
      <div className={styles.content}>
        <div className={styles.frostedCard}>
          <header className={styles.header}>
            <h1 className={styles.title}>Seoul Mate?</h1>
            <p className={styles.subtitle}>I love you bebs :,)</p>
          </header>

          <div className={styles.countdownsContainer}>
            <div className={styles.countdownSection}>
              <p className={styles.countdownLabel}>Been together for</p>
              <TimeTogether startDate="2025-12-17T00:00:00" />
            </div>

            <div className={styles.countdownSection}>
              <p className={styles.countdownLabel}>Seoul Trip In</p>
              <Countdown targetDate="2026-03-21T17:00:00+09:00" />
            </div>
          </div>
        </div>

        <section className={styles.letterSection}>
          <div className={styles.letter}>
            <div className={styles.letterBody}>
              <p>
              Hi bebe,
              <br />
              </p>
              <p>
              It’s 5:10 ish AM in Calgary and I can’t sleep since I might miss my flight otherwise, and anyways I thought I might as well just type up something small.
              </p>
              <p>
              I've been thinking a lot recently about what it means to be committed and what it means to be "ready" for a relationship. That phrasing implies a binary state - I'm either ready, or I'm not, with the latter having disastrous consequences for our relationship.
              </p>
              <p>
              This lingered, though, and I wondered why. I think it's because being ready isn't a switch that you flip: it's something that you practice everyday. I think commitment is built through actions, not feelings and talks, which is why we always feel like it's a recurring discussion. It's because I think it always will be, because the way we build trust and readiness is through the little actions of love we show each other everyday.
              </p>
              <p>
              You can probably tell but I wrote that portion in my journal before I came over this past weekend. And after the 15% cooked stuff, I think I continue to largely agree. I’m realizing we’re not perfect, and that I need to be less petty and care less about childish notions of “winning” in a relationship.
              </p>
              <p>
              Truth is that I’m winning whenever I’m with you. Because you make me the happiest person on the planet. I miss you so much, and I want to be better about expressing that (and not be so petty about it). You make my life better in a way that’s steady and real. I miss you, and I want to be better at just saying that without being petty.
              </p>
              <p>
              One day we’ll close the distance. Until then I’ll always be grateful across thousands of kilometres for the meaning you give me.
              </p>
              <p>
              I love you more than you think, and probably more than you’ll ever be able to know.
              </p>
              Summit
            </div>
            <p className={styles.letterClosing}>
              <span className={styles.signature}>Summit</span>
            </p>
          </div>
        </section>

        <section className={styles.collageSection}>
          <PhotoCollage />
        </section>
      </div>
    </main>
  );
}
