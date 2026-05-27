import { useState, useEffect, useCallback } from 'react';
import { useLang } from '../i18n/LanguageContext';
import ContactSection from './ContactSection';
import HospitalsSection from './HospitalsSection';
import AppointmentModal from './AppointmentModal';

const SERVICE_KEYS = [
  'services.consultations',
  'services.diagnostics',
  'services.surgery',
  'services.hearing',
  'services.allergy',
  'services.nasofibroscopy',
  'services.cerumen',
  'services.balance',
];

export default function HomeContent() {
  const { t } = useLang();
  const [spotlightIndex, setSpotlightIndex] = useState<number>(-1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const pickRandom = useCallback(() => {
    setSpotlightIndex((prev) => {
      let next: number;
      do {
        next = Math.floor(Math.random() * SERVICE_KEYS.length);
      } while (next === prev);
      return next;
    });
  }, []);

  useEffect(() => {
    pickRandom();
    const interval = setInterval(pickRandom, 3000);
    return () => clearInterval(interval);
  }, [pickRandom]);

  return (
    <>
      <section className="hero">
        <h1>{t('hero.title')}</h1>
        <p>{t('hero.subtitle')}</p>
        <button className="hero-cta" onClick={() => setModalOpen(true)}>
          {t('appointment.button')}
        </button>
      </section>

      <section className="services">
        <h2>{t('services.title')}</h2>
        <ul>
          {SERVICE_KEYS.map((key, i) => (
            <li
              key={key}
              className={`service-item ${i === spotlightIndex ? 'spotlight' : ''}`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {t(key)}
              <div className={`service-tooltip ${hoveredIndex === i ? 'visible' : ''}`}>
                <div className="tooltip-arrow" />
                <p>{t(`${key}_desc`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="about">
        <h2>{t('about.title')}</h2>
        <span className="about-home-crm">{t('about.crm')}</span>
        <div className="about-content">
          <img src="/images/profile/profile-1.png" alt="Dr. Túlio Kalife" className="about-profile-img" />
          <div className="about-text">
            <p>{t('about.description')}</p>
            <p style={{ marginTop: '0.75rem' }}>
              <a href="/about" className="about-read-more">
                {t('about.read_more')} →
              </a>
            </p>
          </div>
        </div>
      </section>

      <HospitalsSection />

      <ContactSection />

      <section className="gallery-preview">
        <h2>{t('gallery.title')}</h2>
        <p>
          {t('gallery.cta')} <a href="/gallery">{t('gallery.link')}</a> {t('gallery.cta_end')}
        </p>
      </section>

      <style>{`
        .service-item {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: visible;
          cursor: default;
        }
        .service-item::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(26, 107, 90, 0.08) 0%, rgba(200, 169, 110, 0.08) 100%);
          opacity: 0;
          transition: opacity 0.5s ease;
          border-radius: 8px;
        }
        .service-item.spotlight {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 8px 24px rgba(26, 107, 90, 0.15);
          border-color: var(--color-primary);
          color: #0f4d3f;
          font-weight: 600;
          z-index: 1;
        }
        .service-item.spotlight::before {
          opacity: 1;
        }
        .service-item.spotlight::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 3px;
          background: #c8a96e;
          border-radius: 2px;
          animation: slideIn 0.4s ease forwards;
        }
        .about-profile-img {
          width: 100%;
          max-width: 300px;
          height: auto;
          border-radius: 8px;
          flex-shrink: 0;
        }
        .about-content {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          margin-top: 1rem;
        }
        .about-text {
          flex: 1;
        }

        .hero-cta {
          background: var(--color-primary);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          font-size: 1.1rem;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 1rem;
          transition: background 0.3s;
        }
        .hero-cta:hover {
          background: #0f4d3f;
        }

        /* Tooltip */
        .service-tooltip {
          position: absolute;
          bottom: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          background: #0f4d3f;
          color: #fff;
          padding: 0.85rem 1rem;
          border-radius: 8px;
          width: 260px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
          opacity: 0;
          visibility: hidden;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          z-index: 50;
        }
        .service-tooltip.visible {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }
        .service-tooltip p {
          margin: 0;
          font-size: 0.85rem;
          line-height: 1.5;
          font-weight: 400;
          color: #e8f5f1;
        }
        .tooltip-arrow {
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 12px;
          height: 12px;
          background: #0f4d3f;
        }

        @keyframes slideIn {
          from { width: 0; opacity: 0; }
          to { width: 40px; opacity: 1; }
        }
        .about-home-crm {
          display: inline-block;
          font-size: 0.85rem;
          color: var(--color-text-light);
          font-weight: 500;
          background: var(--color-bg-alt);
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          border: 1px solid var(--color-border);
        }
        .about-read-more {
          font-weight: 600;
          color: var(--color-primary);
          border-bottom: 2px solid #c8a96e;
          padding-bottom: 2px;
          transition: color 0.2s;
        }
        .about-read-more:hover {
          color: #0f4d3f;
        }


        @media (max-width: 768px) {
          .service-tooltip {
            width: 220px;
            padding: 0.7rem 0.85rem;
          }
          .service-tooltip p {
            font-size: 0.8rem;
          }
          .about-content {
            flex-direction: column;
            gap: 1rem;
          }
          .about-profile-img {
            max-width: 100%;
          }
        }
      `}</style>

      <AppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}