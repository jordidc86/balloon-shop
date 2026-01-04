'use client';

import { useState } from 'react';
import styles from './Dashboard.module.css';

export default function FleetDashboard() {
  const [fleet] = useState([
    { id: 1, reg: 'D-OXXX', model: 'Schroeder G-Series', sn: '1234', status: 'Airworthy', nextInsp: '15h' },
    { id: 2, reg: 'D-OYYY', model: 'Schroeder Fire Balloon', sn: '5678', status: 'Maintenance', nextInsp: 'AOG' },
  ]);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>My Fleet Operations</h1>
        <button className="btn btn-primary">Add Aircraft</button>
      </header>

      <section className={styles.stats}>
        <div className={styles.statCard}>
          <h3>Active Fleet</h3>
          <p className={styles.statValue}>{fleet.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Maintenance Alerts</h3>
          <p className={`${styles.statValue} ${styles.alert}`}>1</p>
        </div>
        <div className={styles.statCard}>
          <h3>Pending Certs</h3>
          <p className={styles.statValue}>3</p>
        </div>
      </section>

      <section className={styles.fleetList}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Registration</th>
              <th>Model</th>
              <th>Serial Number</th>
              <th>Status</th>
              <th>Condition</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fleet.map(ac => (
              <tr key={ac.id}>
                <td className={styles.reg}>{ac.reg}</td>
                <td>{ac.model}</td>
                <td>{ac.sn}</td>
                <td>
                  <span className={`${styles.status} ${ac.status === 'Airworthy' ? styles.green : styles.red}`}>
                    {ac.status}
                  </span>
                </td>
                <td className={styles.insp}>
                  {ac.nextInsp === 'AOG' ? (
                    <span className={styles.aogAlert}>AOG - Critical Parts Needed</span>
                  ) : (
                    `Next Insp in ${ac.nextInsp}`
                  )}
                </td>
                <td>
                  <button className={styles.actionBtn}>View IPC</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
