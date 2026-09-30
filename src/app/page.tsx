'use client';

import React, { useEffect, useState } from 'react';
import { lessonsList } from '@/data/lessons';
import { LessonCard } from '@/components/LessonCard';
import { getProgress, LessonProgress } from '@/lib/progress';
import styles from './page.module.scss';
import { SpacedRepetitionModule } from '@/components/SpacedRepetitionModule';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { tUi, t } from '@/lib/i18n';

export default function Home() {
  const [progressData, setProgressData] = useState<LessonProgress[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    setProgressData(getProgress());
  }, []);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h1>{language === 'ru' ? 'Основы IT и Python' : 'IT жана Python негиздери'}</h1>
          <LanguageSwitcher />
        </div>
        <p>{language === 'ru' ? 'Образовательная платформа для изучения программирования с нуля' : 'Программалоону нөлдөн баштап үйрөнүү үчүн билим берүү платформасы'}</p>
      </header>
      
      <SpacedRepetitionModule />
      
      <div className={styles.grid}>
        {lessonsList.map(lesson => (
          <LessonCard 
            key={lesson.id}
            {...lesson}
            title={t(lesson.title, language)}
            description={t(lesson.description, language)}
            progress={progressData.find(p => p.slug === lesson.slug)}
          />
        ))}
      </div>
    </main>
  );
}
