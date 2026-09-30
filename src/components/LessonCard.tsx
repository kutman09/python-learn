'use client';

import React from 'react';
import Link from 'next/link';
import { LessonProgress } from '@/lib/progress';
import { CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { tUi } from '@/lib/i18n';
import styles from './LessonCard.module.scss';

interface Props {
  id: string;
  slug: string;
  title: string;
  description: string;
  available: boolean;
  progress?: LessonProgress;
}

export const LessonCard: React.FC<Props> = ({ slug, title, description, available, progress }) => {
  const { language } = useLanguage();
  return (
    <div className={`${styles.card} ${!available ? styles.unavailable : ''}`}>
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{description}</p>
        
        {progress && (
          <div className={styles.progressBadge}>
            <CheckCircle size={16} />
            <span>{language === 'ru' ? 'Пройдено' : 'Өтүлдү'} ({progress.score}%)</span>
          </div>
        )}
        
        {!available && (
          <div className={styles.soonBadge}>
            <Clock size={16} />
            <span>{tUi('soon', language)}</span>
          </div>
        )}
      </div>
      
      {available ? (
        <Link href={`/lessons/${slug}`} className={styles.actionBtn}>
          {progress ? (language === 'ru' ? 'Пройти заново' : 'Кайрадан баштоо') : (language === 'ru' ? 'Начать занятие' : 'Сабакты баштоо')}
        </Link>
      ) : (
        <button className={styles.actionBtn} disabled>{language === 'ru' ? 'В разработке' : 'Иштелүүдө'}</button>
      )}
    </div>
  );
};
