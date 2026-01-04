import Link from 'next/link';
import styles from './AviationNavbar.module.css';

export default function AviationNavbar() {
  return (
    <nav className={styles.nav}>
      <div className={`${styles.container} container`}>
        <div className={styles.logoAndFleet}>
          <Link href="/" className={styles.logo}>
            AIRPARTS <span className={styles.pro}>PRO</span>
          </Link>
          <div className={styles.fleetSelector}>
            <span className={styles.statusDot}></span>
            <span className={styles.fleetId}>D-OXXX (Schroeder G-Series)</span>
          </div>
        </div>
        
        <div className={styles.links}>
          <Link href="/catalog" className={styles.link}>Catalog</Link>
          <Link href="/schematics" className={styles.link}>Schematics</Link>
          <Link href="/compliance" className={styles.link}>Compliance</Link>
          <Link href="/aog" className={`${styles.link} ${styles.aog}`}>AOG Support</Link>
        </div>

        <div className={styles.userSection}>
          <button className={styles.accountBtn}>JP</button>
        </div>
      </div>
    </nav>
  );
}
