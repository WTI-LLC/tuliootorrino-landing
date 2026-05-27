import { useState, useEffect, useCallback } from 'react';
import { useLang } from '../i18n/LanguageContext';

const CLINIC_IMAGES = [
  '/images/clinica/01.jpeg',
  '/images/clinica/02.jpeg',
  '/images/clinica/03.jpeg',
  '/images/clinica/04.jpeg',
  '/images/clinica/05.jpeg',
  '/images/clinica/06.jpeg',
  '/images/clinica/07.jpeg',
];

export default function GalleryContent() {
  const { t } = useLang();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % CLINIC_IMAGES.length);
  }, [lightboxIndex]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + CLINIC_IMAGES.length) % CLINIC_IMAGES.length);
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxIndex, goNext, goPrev]);

  return (
    <section className="gallery">
      <h2>{t('gallery.title')}</h2>
      <p className="gallery-subtitle">{t('gallery.subtitle')}</p>

      <div className="gallery-grid">
        {CLINIC_IMAGES.map((src, i) => (
          <div
            key={src}
            className="gallery-thumb"
            onClick={() => openLightbox(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
          >
            <img src={src} alt={`Clinic photo ${i + 1}`} loading="lazy" />
            <div className="thumb-overlay">
              <span className="thumb-zoom">🔍</span>
            </div>
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox} aria-label={t('gallery.close')}>
              ✕
            </button>

            <button className="lightbox-arrow lightbox-prev" onClick={goPrev} aria-label={t('gallery.prev')}>
              ‹
            </button>

            <div className="lightbox-image-wrapper">
              <img
                src={CLINIC_IMAGES[lightboxIndex]}
                alt={`Clinic photo ${lightboxIndex + 1}`}
                className="lightbox-image"
              />
            </div>

            <button className="lightbox-arrow lightbox-next" onClick={goNext} aria-label={t('gallery.next')}>
              ›
            </button>

            <div className="lightbox-counter">
              {lightboxIndex + 1} {t('gallery.of')} {CLINIC_IMAGES.length}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery {
          padding: 4rem 2rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .gallery h2 {
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--color-primary-dark);
          margin-bottom: 0.5rem;
        }
        .gallery-subtitle {
          color: var(--color-text-light);
          font-size: 1rem;
          margin-bottom: 2rem;
        }

        /* Grid */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
        }
        .gallery-thumb {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 4 / 3;
          background: var(--color-border);
        }
        .gallery-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease;
        }
        .gallery-thumb:hover img {
          transform: scale(1.08);
        }
        .thumb-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 77, 63, 0);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
        }
        .gallery-thumb:hover .thumb-overlay {
          background: rgba(15, 77, 63, 0.3);
        }
        .thumb-zoom {
          font-size: 1.5rem;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.3s ease;
        }
        .gallery-thumb:hover .thumb-zoom {
          opacity: 1;
          transform: scale(1);
        }

        /* Lightbox */
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: lbFadeIn 0.25s ease;
        }
        @keyframes lbFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .lightbox-content {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 90vw;
          max-height: 90vh;
          gap: 1rem;
        }
        .lightbox-close {
          position: fixed;
          top: 1.25rem;
          right: 1.5rem;
          background: none;
          border: none;
          color: #fff;
          font-size: 1.5rem;
          cursor: pointer;
          z-index: 10;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background 0.2s;
        }
        .lightbox-close:hover {
          background: rgba(255, 255, 255, 0.15);
        }
        .lightbox-image-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lightbox-image {
          max-width: 80vw;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
          animation: lbSlideIn 0.3s ease;
        }
        @keyframes lbSlideIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .lightbox-arrow {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          font-size: 2rem;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
          line-height: 1;
        }
        .lightbox-arrow:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.4);
        }
        .lightbox-counter {
          position: fixed;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.05em;
        }

        @media (max-width: 768px) {
          .gallery { padding: 3rem 1.5rem; }
          .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 0.75rem; }
          .lightbox-arrow { width: 38px; height: 38px; font-size: 1.5rem; }
          .lightbox-image { max-width: 90vw; max-height: 75vh; }
          .lightbox-content { gap: 0.5rem; }
        }
      `}</style>
    </section>
  );
}
