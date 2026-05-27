import { useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { useWhatsApp } from '../context/WhatsAppContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppointmentModal({ isOpen, onClose }: Props) {
  const { t } = useLang();
  const { number } = useWhatsApp();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = t('appointment.whatsapp_message')
      .replace('{name}', name)
      .replace('{age}', age)
      .replace('{date}', date)
      .replace('{time}', time);

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${number}?text=${encoded}`;

    window.open(url, '_blank');

    setName('');
    setAge('');
    setDate('');
    setTime('');
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Get today's date in YYYY-MM-DD for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <h2>{t('appointment.title')}</h2>
        <p className="modal-subtitle">{t('appointment.subtitle')}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="apt-name">{t('appointment.name')}</label>
            <input
              id="apt-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('appointment.name_placeholder')}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="apt-age">{t('appointment.age')}</label>
            <input
              id="apt-age"
              type="number"
              min="1"
              max="150"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder={t('appointment.age_placeholder')}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="apt-date">{t('appointment.date')}</label>
              <input
                id="apt-date"
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="apt-time">{t('appointment.time')}</label>
              <input
                id="apt-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-submit">
            <img src="/icons/whatsapp.png" alt="" className="btn-submit-icon" />
            {t('appointment.submit')}
          </button>
        </form>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal-content {
          background: var(--color-bg);
          border-radius: 12px;
          padding: 2rem;
          max-width: 480px;
          width: 100%;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          animation: slideUp 0.3s ease;
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .modal-close {
          position: absolute;
          top: 0.75rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.75rem;
          color: #718096;
          cursor: pointer;
          line-height: 1;
          transition: color 0.2s;
        }
        .modal-close:hover {
          color: #2d3748;
        }
        .modal-content h2 {
          font-size: 1.4rem;
          color: var(--color-primary-dark);
          margin-bottom: 0.25rem;
        }
        .modal-subtitle {
          color: #718096;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }
        .form-group {
          margin-bottom: 1rem;
          flex: 1;
        }
        .form-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 0.35rem;
        }
        .form-group input {
          width: 100%;
          padding: 0.65rem 0.85rem;
          border: 1px solid var(--color-border);
          border-radius: 8px;
          font-size: 0.95rem;
          font-family: inherit;
          transition: border-color 0.2s;
          outline: none;
        }
        .form-group input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(26, 107, 90, 0.1);
        }
        .form-row {
          display: flex;
          gap: 1rem;
        }
        .btn-submit {
          width: 100%;
          padding: 0.75rem;
          margin-top: 0.5rem;
          background: #25d366;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background 0.2s;
        }
        .btn-submit:hover {
          background: #1da851;
        }
        .btn-submit-icon {
          width: 20px;
          height: 20px;
          object-fit: contain;
        }
        @media (max-width: 480px) {
          .modal-content { padding: 1.5rem; }
          .form-row { flex-direction: column; gap: 0; }
        }
      `}</style>
    </div>
  );
}