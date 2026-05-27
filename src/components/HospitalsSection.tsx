import { useState, useEffect, useCallback } from 'react';
import { useLang } from '../i18n/LanguageContext';

const HOSPITALS = [
  { key: 'hospitals.samaritano', image: '/images/hospitals/samaritano.jpg' },
  { key: 'hospitals.sao_camilo', image: '/images/hospitals/sao-camilo.jpg' },
  { key: 'hospitals.santa_paula', image: '/images/hospitals/santa-paula.png' },
  { key: 'hospitals.paulista', image: '/images/hospitals/paulista.jpg' },
  { key: 'hospitals.unimed', image: '/images/hospitals/unimed.jpg' },
  { key: 'hospitals.sao_luiz', image: '/images/hospitals/sao-luiz.jpg' },
  { key: 'hospitals.einstein', image: '/images/hospitals/einstein.jpg' },
  { key: 'hospitals.sabara', image: '/images/hospitals/sabara.jpg' },
];

export default function HospitalsSection() {
  const { t } = useLang();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 500);
  }, []);

  const goNext = useCallback(() => {
    goTo((currentIndex + 1) % HOSPITALS.length);
  }, [currentIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo((currentIndex - 1 + HOSPITALS.length) % HOSPITALS.length);
  }, [currentIndex, goTo]);

  useEffect(() => {
    const interval = setInterval(goNext, 3000);
    return () => clearInterval(interval);
  }, [goNext]);

  const current = HOSPITALS[currentIndex];

  return (
    <section className="hospitals">
      <h2>{t('hospitals.title')}</h2>
      <p className="hospitals-subtitle">{t('hospitals.subtitle')}</p>

      <div className="slideshow">
        <button className="slide-arrow slide-arrow-left" onClick={goPrev} aria-label="Previous">
          ‹
        </button>

        <div className="slide-container">
          <div
            className={`slide ${isTransitioning ? 'fade-out' : 'fade-in'}`}
            style={{ backgroundImage: `url(${current.image})` }}
          >
            <div className="slide-overlay">
              <span className="slide-name">{t(current.key)}</span>
            </div>
          </div>
        </div>

        <button className="slide-arrow slide-arrow-right" onClick={goNext} aria-label="Next">
          ›
        </button>
      </div>

      <div className="slide-dots">
        {HOSPITALS.map((_, i) => (
          <button
            key={i}
            className={`slide-dot ${i === currentIndex ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="hospitals-list">
        {HOSPITALS.map((h, i) => (
          <button
            key={h.key}
            className={`hospital-chip ${i === currentIndex ? 'active' : ''}`}
            onClick={() => goTo(i)}
          >
            {t(h.key)}
          </button>
        ))}
      </div>

      <style>{`
        .hospitals {
          padding: 4rem 2rem;
          background: linear-gradient(180deg, var(--color-bg-alt) 0%, var(--color-bg) 100%);
          max-width: 100%;
        }
        .hospitals h2 {
          font-size: 1.75rem;
          font-weight: 600;
          color: #0f4d3f;
          margin-bottom: 0.5rem;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }
        .hospitals-subtitle {
          color: var(--color-text-light);
          font-size: 1rem;
          max-width: 900px;
          margin: 0 auto 2rem;
        }

        /* Slideshow */
        .slideshow {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .slide-container {
          flex: 1;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          aspect-ratio: 16 / 7;
          background: var(--color-border);
        }
        .slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transition: opacity 0.5s ease;
        }
        .slide.fade-in {
          opacity: 1;
        }
        .slide.fade-out {
          opacity: 0;
        }
        .slide-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(15, 77, 63, 0.85) 0%,
            rgba(15, 77, 63, 0.3) 40%,
            transparent 100%
          );
          display: flex;
          align-items: flex-end;
          padding: 1.5rem 2rem;
        }
        .slide-name {
          color: #fff;
          font-size: 1.25rem;
          font-weight: 600;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          letter-spacing: 0.01em;
        }

        /* Arrows */
        .slide-arrow {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid #e2e8f0;
          color: #0f4d3f;
          font-size: 1.75rem;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
          line-height: 1;
          padding-bottom: 2px;
        }
        .slide-arrow:hover {
          background: #0f4d3f;
          color: #fff;
          border-color: #0f4d3f;
        }

        /* Dots */
        .slide-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.25rem;
        }
        .slide-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid #c8a96e;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }
        .slide-dot.active {
          background: #c8a96e;
          transform: scale(1.2);
        }
        .slide-dot:hover {
          background: #c8a96e;
        }

        /* Hospital chips */
        .hospitals-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
          max-width: 900px;
          margin: 1.25rem auto 0;
        }
        .hospital-chip {
          background: var(--color-bg);
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 0.4rem 1rem;
          font-size: 0.8rem;
          font-family: inherit;
          color: #4a5568;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .hospital-chip:hover {
          border-color: #1a6b5a;
          color: #0f4d3f;
          background: #e8f5f1;
        }
        .hospital-chip.active {
          background: #0f4d3f;
          color: #fff;
          border-color: #0f4d3f;
        }

        @media (max-width: 768px) {
          .hospitals { padding: 3rem 1.5rem; }
          .slide-container { aspect-ratio: 16 / 9; }
          .slide-overlay { padding: 1rem 1.25rem; }
          .slide-name { font-size: 1rem; }
          .slide-arrow { width: 34px; height: 34px; font-size: 1.4rem; }
          .hospital-chip { font-size: 0.75rem; padding: 0.35rem 0.75rem; }
        }
      `}</style>
    </section>
  );
}