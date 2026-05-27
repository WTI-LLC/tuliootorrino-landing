import { useLang } from '../i18n/LanguageContext';
import { useWhatsApp } from '../context/WhatsAppContext';


export default function ContactSection() {
  const { t } = useLang();
  const { number } = useWhatsApp();

  const googleMapsUrl = 'https://maps.app.goo.gl/Vn3ZsFGCr1Bwrugg6';
  const whatsappGreeting = encodeURIComponent(t('contact.whatsapp_greeting'));
  const whatsappUrl = `https://wa.me/${number}?text=${whatsappGreeting}`;
  const formattedWhatsapp = `+${number.slice(0, 2)} ${number.slice(2, 4)} ${number.slice(4, 9)}-${number.slice(9)}`;

  return (
    <section className="contact" id="contact">
      <h2>{t('contact.title')}</h2>

      <div className="contact-grid">
        <div className="contact-card">
          <span className="contact-icon">📍</span>
          <div>
            <strong>{t('contact.address_label')}</strong>
            <p>
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                {t('contact.address')}
              </a>
            </p>
          </div>
        </div>

        <div className="contact-card">
          <span className="contact-icon">📞</span>
          <div>
            <strong>{t('contact.phone_label')}</strong>
            <p>
              <a href="tel:+551147123148">{t('contact.phone')}</a>
            </p>
          </div>
        </div>

        <div className="contact-card contact-card-whatsapp">
          <img src="/icons/whatsapp.png" alt="WhatsApp" className="contact-icon-img" />
          <div>
            <strong>{t('contact.whatsapp_label')}</strong>
            <p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                {formattedWhatsapp}
              </a>
            </p>
          </div>
        </div>

        <div className="contact-card">
          <span className="contact-icon">🌐</span>
          <div>
            <strong>{t('contact.website_label')}</strong>
            <p>
              <a href="https://www.tuliootorrino.com" target="_blank" rel="noopener noreferrer">
                {t('contact.website')}
              </a>
            </p>
          </div>
        </div>

        <div className="contact-card">
          <span className="contact-icon">🕐</span>
          <div>
            <strong>{t('contact.hours_label')}</strong>
            <p>{t('contact.hours')}</p>
          </div>
        </div>
      </div>

      <div className="contact-map">
        <iframe
          title="Clinic Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.0!2d-47.13577!3d-23.52918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf04b1c5555555%3A0x1234567890abcdef!2sR.+Cap.+Jos%C3%A9+Vicente+de+Moraes%2C+151+-+Esplanada+Mendes%2C+S%C3%A3o+Roque+-+SP%2C+18130-780!5e0!3m2!1spt-BR!2sbr"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: '8px' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="clinic-image-wrapper">
        <img
          src="/images/background/building.png"
          alt={t('clinic.image_alt')}
          className="clinic-image"
        />
      </div>

      <style>{`
        .contact {
          padding: 4rem 2rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .contact h2 {
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--color-primary-dark);
          margin-bottom: 1.5rem;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.25rem;
          margin-bottom: 2rem;
        }
        .contact-card {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          background: var(--color-bg-alt);
          padding: 1.25rem;
          border-radius: 8px;
          border: 1px solid var(--color-border);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .contact-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        .contact-card-whatsapp {
          border-color: #25d366;
          background: #f0fdf4;
        }
        .contact-card-whatsapp:hover {
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.15);
        }
        .contact-card-whatsapp a {
          color: #128c7e !important;
        }
        .contact-card-whatsapp a:hover {
          color: #075e54 !important;
        }
        .contact-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
          margin-top: 0.1rem;
        }
        .contact-icon-img {
          width: 28px;
          height: 28px;
          object-fit: contain;
          flex-shrink: 0;
          margin-top: 0.1rem;
        }
        .contact-card strong {
          display: block;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-light);
          margin-bottom: 0.25rem;
        }
        .contact-card p {
          margin: 0;
          font-size: 0.95rem;
          color: var(--color-text);
          line-height: 1.5;
        }
        .contact-card a {
          color: var(--color-primary);
          text-decoration: none;
          transition: color 0.2s;
        }
        .contact-card a:hover {
          color: #0f4d3f;
          text-decoration: underline;
        }
        .contact-map {
          margin-top: 1rem;
        }
        .clinic-image-wrapper {
          margin-top: 1.5rem;
          text-align: center;
        }
        .clinic-image {
          max-width: 100%;
          height: auto;
          opacity: 0.4;          /* same opacity as hero */
          border-radius: 8px;
          display: inline-block;
        }
        @media (max-width: 768px) {
          .contact { padding: 3rem 1.5rem; }
          .contact-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}