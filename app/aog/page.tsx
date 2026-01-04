'use client';

import { useState } from 'react';
import styles from './AOG.module.css';

export default function AOGPage() {
  const [activeRequest, setActiveRequest] = useState(false);

  return (
    <main className={styles.main}>
      <div className="container">
        <header className={styles.header}>
          <span className={styles.aogBadge}>Urgent Support</span>
          <h1>AOG Logistics Dashboard</h1>
          <p>Real-time technical support and priority shipping for grounded aircraft.</p>
        </header>

        {!activeRequest ? (
          <div className={styles.initContainer}>
            <div className={styles.card}>
              <h2>No Active AOG Cases</h2>
              <p>Is an aircraft currently grounded? Activate the AOG flow to trigger priority logistics and engineering support.</p>
              <button 
                className="btn btn-aog" 
                onClick={() => setActiveRequest(true)}
              >
                Declare AOG Emergency
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.activeAog}>
            <div className={styles.tracker}>
              <div className={styles.trackerHeader}>
                <h3>Case #AOG-2026-081 (D-OYYY)</h3>
                <span className={styles.liveStatus}>Filing Logistics...</span>
              </div>
              
              <div className={styles.steps}>
                <div className={`${styles.step} ${styles.completed}`}>
                  <div className={styles.dot}></div>
                  <div className={styles.stepContent}>
                    <strong>Case Opened</strong>
                    <span>12:45 UTC</span>
                  </div>
                </div>
                <div className={`${styles.step} ${styles.current}`}>
                  <div className={styles.dot}></div>
                  <div className={styles.stepContent}>
                    <strong>Part Procurement (MK-21 Valve)</strong>
                    <span>Warehouse Madrid - Preparing for pickup</span>
                  </div>
                </div>
                <div className={styles.step}>
                  <div className={styles.dot}></div>
                  <div className={styles.stepContent}>
                    <strong>Priority Flight Assignment</strong>
                    <span>Estimated Flight: DHL892 (Vigo {'->'} Frankfurt)</span>
                  </div>
                </div>
                <div className={styles.step}>
                  <div className={styles.dot}></div>
                  <div className={styles.stepContent}>
                    <strong>Dispatch to Site</strong>
                    <span>ETA: 19:30 UTC</span>
                  </div>
                </div>
              </div>
            </div>

            <aside className={styles.logisticsInfo}>
              <div className={styles.infoBox}>
                <h4>Duty Engineer</h4>
                <p>Thomas Weber (Mobile: +49 171 2345678)</p>
                <button className={styles.actionBtn}>Call Support</button>
              </div>
              <div className={styles.infoBox}>
                <h4>Weather for Repair Site (Heidelburg)</h4>
                <p>Status: Clear / Wind: 5kt</p>
                <span className={styles.weatherOk}>Favorable for outside repair</span>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
