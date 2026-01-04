'use client';

import { useState } from 'react';
import styles from './Schematics.module.css';
import Link from 'next/link';

export default function SchematicsPage() {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const parts = [
    { id: '1', name: 'Burner Frame', sku: '25414', pos: { x: 50, y: 50, w: 300, h: 200 } },
    { id: '2', name: 'Main Valve Handle', sku: '25868', pos: { x: 100, y: 150, w: 40, h: 80 } },
    { id: '3', name: 'Piezo Igniter', sku: '2548', pos: { x: 160, y: 180, w: 30, h: 30 } },
  ];

  return (
    <main className={styles.main}>
      <div className="container">
        <header className={styles.header}>
          <h1>Burner - MK-21 Quad</h1>
          <p>IPC Section 4.2 - Control Assembly</p>
        </header>

        <div className={styles.explorer}>
          <div className={styles.canvas}>
            {/* SVG Illustration of a burner (simplified for demo) */}
            <svg viewBox="0 0 500 400" className={styles.svg}>
              <rect x="50" y="50" width="300" height="200" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />
              {parts.map(p => (
                <rect
                  key={p.id}
                  x={p.pos.x}
                  y={p.pos.y}
                  width={p.pos.w}
                  height={p.pos.h}
                  className={`${styles.box} ${hoveredPart === p.id ? styles.active : ''}`}
                  onMouseEnter={() => setHoveredPart(p.id)}
                  onMouseLeave={() => setHoveredPart(null)}
                  fill="transparent"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                  strokeDasharray="4"
                />
              ))}
              <text x="200" y="40" textAnchor="middle" fill="currentColor">Schroeder MK-21 Quad Burner</text>
            </svg>
          </div>

          <aside className={styles.sidebar}>
            <h3>Parts List</h3>
            <div className={styles.partsList}>
              {parts.map(p => (
                <div 
                  key={p.id} 
                  className={`${styles.partItem} ${hoveredPart === p.id ? styles.activeItem : ''}`}
                  onMouseEnter={() => setHoveredPart(p.id)}
                  onMouseLeave={() => setHoveredPart(null)}
                >
                  <div className={styles.partInfo}>
                    <span className={styles.sku}>#{p.sku}</span>
                    <span className={styles.name}>{p.name}</span>
                  </div>
                  <Link href={`/catalog?search=${p.sku}`} className={styles.addBtn}>+</Link>
                </div>
              ))}
            </div>
            
            <div className={styles.aiNudge}>
              <h4>AI Recommendation</h4>
              <p>Maintenance logic suggests replacing all <strong>O-Rings</strong> when servicing the Main Valve.</p>
              <button className="btn btn-primary" style={{width: '100%', marginTop: '1rem'}}>Add Repair Kit (€78.50)</button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
