'use client';

import React from 'react';
import Link from 'next/link';
import { LessonProgress } from '@/lib/progress';
import { CheckCircle, Clock } from 'lucide-react';
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
  return (
    <div className={`${styles.card} ${!available ? styles.unavailable : ''}`}>
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{description}</p>
        
        {progress && (
          <div className={styles.progressBadge}>
            <CheckCircle size={16} />
            <span>Пройдено ({progress.score}%)</span>
          </div>
        )}
        
        {!available && (
          <div className={styles.soonBadge}>
            <Clock size={16} />
            <span>Скоро появится</span>
          </div>
        )}
      </div>
      
      {available ? (
        <Link href={`/lessons/${slug}`} className={styles.actionBtn}>
          {progress ? 'Пройти заново' : 'Начать занятие'}
        </Link>
      ) : (
        <button className={styles.actionBtn} disabled>В разработке</button>
      )}
    </div>
  );
};
