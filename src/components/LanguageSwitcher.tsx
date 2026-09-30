'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './LanguageSwitcher.module.scss';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, isMounted } = useLanguage();

  if (!isMounted) return <div className={styles.switcherPlaceholder}>...</div>;

  return (
    <div className={styles.switcher}>
      <button 
        className={`${styles.btn} ${language === 'ru' ? styles.active : ''}`}
        onClick={() => setLanguage('ru')}
      >
        RU
      </button>
      <button 
        className={`${styles.btn} ${language === 'ky' ? styles.active : ''}`}
        onClick={() => setLanguage('ky')}
      >
        KY
      </button>
    </div>
  );
};
