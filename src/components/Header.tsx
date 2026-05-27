import React, { useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import AppointmentModal from './AppointmentModal';

export default function Header() {
  const { t } = useLang();
  const [modalOpen, setModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header className="site-header">
        <nav className="site-nav">
          <a href="/" className="site-logo">
            <img src="/images/logo/logo.png" alt="Dr. Túlio Kalife - Otorrinolaringologia" className="site-logo-img" />
          </a>
          <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={`nav-right ${isMenuOpen ? 'open' : ''}`}>
            <ul className="nav-links">
              <li><a href="/">{t('nav.home')}</a></li>
              <li><a href="/about">{t('nav.about')}</a></li>
              <li><a href="/gallery">{t('nav.gallery')}</a></li>
              <li><a href="/#contact">{t('nav.contact')}</a></li>
            </ul>
            <button className="btn-appointment" onClick={() => setModalOpen(true)}>
              <img src="/icons/whatsapp.png" alt="" className="btn-icon" />
              {t('appointment.button')}
            </button>
            <LanguageSwitcher />
          </div>
        </nav>

        <style>{`
          .site-header {
            padding: 1rem 2rem;
            border-bottom: 1px solid var(--color-border);
            background: var(--color-bg);
            position: sticky;
            top: 0;
            z-index: 100;
          }
          .site-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 900px;
            margin: 0 auto;
          }
          .site-logo {
            text-decoration: none;
            color: var(--color-primary-dark);
            font-size: 1.25rem;
            font-weight: 700;
            display: flex;
            flex-direction: column;
            line-height: 1.2;
          }
          .site-logo-sub {
            font-size: 0.7rem;
            font-weight: 400;
            color: var(--color-text-light);
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }
          .nav-right {
            display: flex;
            align-items: center;
            gap: 1.5rem;
          }
          .nav-links {
            display: flex;
            gap: 1.75rem;
            list-style: none;
            margin: 0;
            padding: 0;
          }
          .nav-links a {
            text-decoration: none;
            color: var(--color-text);
            font-weight: 500;
            font-size: 0.95rem;
            transition: color 0.2s ease;
          }
          .nav-links a:hover {
            color: var(--color-primary);
          }
          .btn-appointment {
            background: var(--color-primary);
            color: #fff;
            border: none;
            padding: 0.5rem 1.1rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            font-family: inherit;
            cursor: pointer;
            transition: background 0.2s;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 0.4rem;
          }
          .btn-appointment:hover {
            background: var(--color-primary-dark);
          }
          .btn-icon {
            width: 18px;
            height: 18px;
            object-fit: contain;
          }
          .site-logo-img {
            height: 100px;
            width: auto;
            object-fit: contain;
          }

          .hamburger {
            display: none;
            flex-direction: column;
            background: none;
            border: none;
            cursor: pointer;
          }
          .hamburger span {
            width: 25px;
            height: 3px;
            background: #333;
            margin: 3px 0;
            transition: 0.3s;
          }
          @media (max-width: 768px) {
            .site-header { padding: 0.75rem 1.5rem; }
            .site-nav { flex-wrap: wrap; gap: 0.75rem; }
            .nav-right { gap: 0.75rem; }
            .nav-links { gap: 1rem; }
            .btn-appointment { padding: 0.45rem 0.8rem; font-size: 0.8rem; }
            .hamburger {
              display: flex;
            }
            .nav-right {
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              background: #fff;
              flex-direction: column;
              padding: 1rem;
              box-shadow: 0 2px 5px rgba(0,0,0,0.1);
              transform: translateY(-100%);
              opacity: 0;
              visibility: hidden;
              transition: all 0.3s ease;
            }
            .nav-right.open {
              transform: translateY(0);
              opacity: 1;
              visibility: visible;
            }
            .nav-links {
              flex-direction: column;
              gap: 1rem;
            }
            .btn-appointment {
              margin-top: 1rem;
            }
          }
        `}</style>
      </header>

      <AppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}