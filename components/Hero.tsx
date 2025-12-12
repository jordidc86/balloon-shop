import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.imageOverlay}></div>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Keep Your Adventure <br />
                        <span className={styles.highlight}>Airworthy</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Official spare parts and maintenance supplies for Schroeder Fire Balloons.
                        Engineered in Germany, delivered worldwide.
                    </p>
                    <div className={styles.actions}>
                        <Link href="#shop" className="btn btn-primary">
                            Browse Components
                        </Link>
                        <Link href="https://schroederballon.de/en/technical-support/" target="_blank" className={styles.secondaryLink}>
                            Download Manuals →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
