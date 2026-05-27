import { useLang } from '../i18n/LanguageContext';
import { languages, type Lang } from '../i18n/translations';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="lang-switcher">
      {(Object.keys(languages) as Lang[]).map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`lang-btn ${lang === code ? 'active' : ''}`}
          title={languages[code].label}
          aria-label={languages[code].label}
        >
          <span className="lang-flag">{languages[code].flag}</span>
        </button>
      ))}

      <style>{`
        .lang-switcher {
          display: flex;
          gap: 0.35rem;
          align-items: center;
        }
        .lang-btn {
          background: none;
          border: 2px solid transparent;
          border-radius: 6px;
          cursor: pointer;
          padding: 0.2rem 0.35rem;
          transition: all 0.2s ease;
          line-height: 1;
        }
        .lang-btn:hover {
          border-color: var(--color-border);
          background: var(--color-bg-alt);
        }
        .lang-btn.active {
          border-color: var(--color-primary);
          background: var(--color-primary-light);
        }
        .lang-flag {
          font-size: 1.3rem;
        }
      `}</style>
    </div>
  );
}