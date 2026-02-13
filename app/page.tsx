import styles from './Home.module.css';

type BalloonListing = {
  id: number;
  title: string;
  location: string;
  price: string;
  year: number;
  envelopeHours: number;
  basket: string;
  burner: string;
  status: 'Disponible' | 'Reservado';
  image: string;
};

const listings: BalloonListing[] = [
  {
    id: 1,
    title: 'Cameron Z-160 (ideal escuela)',
    location: 'Segovia, España',
    price: '24.500 €',
    year: 2012,
    envelopeHours: 410,
    basket: 'Cameron O-90 (4 plazas)',
    burner: 'MK-32 doble',
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'Kubicek BB45XR (vuelo turístico)',
    location: 'Braga, Portugal',
    price: '38.900 €',
    year: 2017,
    envelopeHours: 280,
    basket: 'Ultramagic M-105 (5 plazas)',
    burner: 'Vapor principal + respaldo',
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1497283302273-a7d2d7c0f9c0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    title: 'Lindstrand LBL-90 (pack completo)',
    location: 'Lyon, Francia',
    price: '19.800 €',
    year: 2009,
    envelopeHours: 560,
    basket: 'Lindstrand sport (3 plazas)',
    burner: 'Sistema sencillo revisado 2025',
    status: 'Reservado',
    image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    title: 'Ultramagic C7-180 (gran volumen)',
    location: 'Toledo, España',
    price: '44.200 €',
    year: 2019,
    envelopeHours: 190,
    basket: 'Ultramagic N-133 (7 plazas)',
    burner: 'Doble acero inoxidable',
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1505533542167-8c89838bb19a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    title: 'Schroeder Fire Balloons G-130',
    location: 'Augsburgo, Alemania',
    price: '29.600 €',
    year: 2015,
    envelopeHours: 330,
    basket: 'Schroeder Club (4 plazas)',
    burner: 'Twin 2200 con historial al día',
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 6,
    title: 'Balloon Works B-77 (entrada de gama)',
    location: 'Valencia, España',
    price: '15.900 €',
    year: 2007,
    envelopeHours: 620,
    basket: 'Sport lite (2-3 plazas)',
    burner: 'Sencillo + funda de transporte',
    status: 'Disponible',
    image: 'https://images.unsplash.com/photo-1495195129352-aeb325a55b65?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Mercado de ocasión</p>
        <h1>Globos aerostáticos de segunda mano</h1>
        <p>
          Una web estilo marketplace para publicar y encontrar globos listos para volar,
          con información técnica clara y precios transparentes.
        </p>
        <div className={styles.heroMeta}>
          <span>📍 Europa</span>
          <span>🛡️ Publicaciones verificadas</span>
          <span>🕒 Actualizado hoy</span>
        </div>
      </header>

      <section className={styles.toolbar}>
        <button className={`${styles.filterChip} ${styles.active}`}>Todos</button>
        <button className={styles.filterChip}>España</button>
        <button className={styles.filterChip}>Menos de 25.000 €</button>
        <button className={styles.filterChip}>Uso escuela</button>
      </section>

      <section className={styles.grid}>
        {listings.map((balloon) => (
          <article key={balloon.id} className={styles.card}>
            <img src={balloon.image} alt={balloon.title} className={styles.image} />
            <div className={styles.cardBody}>
              <div className={styles.cardTop}>
                <h2>{balloon.title}</h2>
                <span
                  className={`${styles.status} ${
                    balloon.status === 'Disponible' ? styles.available : styles.reserved
                  }`}
                >
                  {balloon.status}
                </span>
              </div>
              <p className={styles.location}>{balloon.location}</p>
              <ul className={styles.specs}>
                <li>Año: {balloon.year}</li>
                <li>Horas envolvente: {balloon.envelopeHours} h</li>
                <li>Cesta: {balloon.basket}</li>
                <li>Quemador: {balloon.burner}</li>
              </ul>
              <div className={styles.footerRow}>
                <strong>{balloon.price}</strong>
                <button className={styles.contactBtn}>Ver anuncio</button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
