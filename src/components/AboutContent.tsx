import { useLang } from '../i18n/LanguageContext';

const TEAM_IMAGES = [
  '/images/team/team-1.jpeg',
  '/images/team/team-2.jpeg',
  '/images/team/team-3.jpeg',
  '/images/team/team-4.jpeg',
];

export default function AboutContent() {
  const { t } = useLang();

  const specialties = [
    { title: t('about.specialty1_title'), desc: t('about.specialty1_desc') },
    { title: t('about.specialty2_title'), desc: t('about.specialty2_desc') },
    { title: t('about.specialty3_title'), desc: t('about.specialty3_desc') },
  ];

  return (
    <section className="about-detail">
      <div className="about-header">
        <h2>{t('about.title')}</h2>
        <span className="about-crm">{t('about.crm')}</span>
      </div>

      <img src="/images/profile/profile-2.png" alt="Dr. Túlio Kalife" className="doctor-profile-img" />

      <p className="about-text">{t('about.description')}</p>
      <p className="about-text">{t('about.description2')}</p>

      <div className="specialties-grid">
        {specialties.map((s, i) => (
          <div key={i} className="specialty-card">
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="team-section">
        <h2>{t('about.team_title')}</h2>
        <p className="team-subtitle">{t('about.team_subtitle')}</p>
        <div className="team-grid">
          {TEAM_IMAGES.map((src, i) => (
            <div key={src} className="team-card">
              <img src={src} alt={`Surgical team member ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <p className="about-text about-closing">{t('about.closing')}</p>

      <style>{`
        .about-detail {
          padding: 4rem 2rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .about-header {
          margin-bottom: 1.5rem;
        }
        .about-header h2 {
          font-size: 1.75rem;
          font-weight: 600;
          color: #0f4d3f;
          margin-bottom: 0.35rem;
          position: relative;
          padding-bottom: 0.75rem;
        }
        .about-header h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 3px;
          background-color: #c8a96e;
          border-radius: 2px;
        }
        .about-crm {
          display: inline-block;
          margin-top: 0.5rem;
          font-size: 0.85rem;
          color: #718096;
          font-weight: 500;
          letter-spacing: 0.02em;
          background: #f7fafc;
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          border: 1px solid #e2e8f0;
        }
        .about-text {
          color: #4a5568;
          font-size: 1.05rem;
          line-height: 1.8;
          margin-bottom: 1rem;
        }
        .about-closing {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e2e8f0;
          font-style: italic;
          color: #2d3748;
        }
        .specialties-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.25rem;
          margin: 1.5rem 0;
        }
        .specialty-card {
          background: #f7fafc;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          border-left: 4px solid #1a6b5a;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .specialty-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        .specialty-card h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #0f4d3f;
          margin-bottom: 0.5rem;
        }
        .specialty-card p {
          color: #4a5568;
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
        }
        .doctor-profile-img {
          width: 100%;
          max-width: 400px;
          height: auto;
          border-radius: 8px;
          margin: 1rem auto;
          display: block;
        }

        /* Surgical Team */
        .team-section {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #e2e8f0;
        }
        .team-section h2 {
          font-size: 1.75rem;
          font-weight: 600;
          color: #0f4d3f;
          margin-bottom: 0.35rem;
          position: relative;
          padding-bottom: 0.75rem;
        }
        .team-section h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 3px;
          background-color: #c8a96e;
          border-radius: 2px;
        }
        .team-subtitle {
          color: #718096;
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 1rem;
        }
        .team-card {
          border-radius: 8px;
          overflow: hidden;
          aspect-ratio: 3 / 4;
          background: #e2e8f0;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .team-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }
        .team-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 768px) {
          .about-detail { padding: 3rem 1.5rem; }
          .specialties-grid { grid-template-columns: 1fr; }
          .team-grid { grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); }
        }
      `}</style>
    </section>
  );
}