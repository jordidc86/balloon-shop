'use client';

import styles from './Compliance.module.css';

export default function CompliancePage() {
  const docs = [
    { id: '1', date: '2026-01-02', type: 'EASA Form 1', aircraft: 'D-OXXX', ref: 'IPC-V-2009', status: 'Signed' },
    { id: '2', date: '2025-12-15', type: 'Cert of Conformity', aircraft: 'D-OXXX', ref: 'MAT-22-1', status: 'Signed' },
    { id: '3', date: '2025-11-20', type: 'EASA Form 1', aircraft: 'D-OYYY', ref: 'IPC-H-1101', status: 'Legacy' },
  ];

  return (
    <main className={styles.main}>
      <div className="container">
        <header className={styles.header}>
          <h1>Compliance & Airworthiness</h1>
          <p>Official technical documentation and regulatory history.</p>
        </header>

        <section className={styles.registry}>
          <div className={styles.docHeader}>
            <h3>Document Repository</h3>
            <button className="btn btn-primary">Verify Digital Signature</button>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Aircraft</th>
                <th>Reference</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {docs.map(doc => (
                <tr key={doc.id}>
                  <td>{doc.date}</td>
                  <td><strong>{doc.type}</strong></td>
                  <td>{doc.aircraft}</td>
                  <td>{doc.ref}</td>
                  <td>
                    <span className={`${styles.status} ${doc.status === 'Signed' ? styles.signed : ''}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td>
                    <button className={styles.downloadBtn}>PDF Preview</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className={styles.generator}>
          <div className={styles.genContent}>
            <h3>Interactive Document Generator</h3>
            <p>Generate a new Certificate of Conformity for sub-components based on shelf-life data.</p>
            <div className={styles.genAction}>
              <select className={styles.select}>
                <option>Select Component...</option>
                <option>O-Ring P/N 2548</option>
                <option>Burner Valve P/N 8892</option>
              </select>
              <button className="btn btn-primary">Generate Draft</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
