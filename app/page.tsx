import Link from 'next/link';
import styles from './Home.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.badge}>Aviation Logistics 4.0</span>
            <h1 className={styles.title}>Precision Parts for <br/><span>Vertical Excellence.</span></h1>
            <p className={styles.subtitle}>
              The digital twin for Schroeder Balloons maintenance. Integrated IPC schematics, 
              automated EASA certification, and AOG global response.
            </p>
            <div className={styles.actions}>
              <Link href="/dashboard" className="btn btn-primary">Open Dashboards</Link>
              <Link href="/schematics" className={styles.secondaryBtn}>Explore Schematics</Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.icon}>✈️</div>
              <h3>My Fleet</h3>
              <p>Filter the catalog automatically based on your specific S/N and airworthiness manuals.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.icon}>🔍</div>
              <h3>Smart Schematic</h3>
              <p>Identify parts instantly using interactive exploded views of burners and baskets.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.icon}>📜</div>
              <h3>EASA Form 1</h3>
              <p>Download signed technical documentation instantly upon order confirmation.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
