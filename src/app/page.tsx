'use client';

import React, { useEffect, useState } from 'react';
import { lessonsList } from '@/data/lessons';
import { LessonCard } from '@/components/LessonCard';
import { getProgress, LessonProgress } from '@/lib/progress';
import styles from './page.module.scss';

import { SpacedRepetitionModule } from '@/components/SpacedRepetitionModule';

export default function Home() {
  const [progressData, setProgressData] = useState<LessonProgress[]>([]);

  useEffect(() => {
    setProgressData(getProgress());
  }, []);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Основы IT и Python</h1>
        <p>Образовательная платформа для изучения программирования с нуля</p>
      </header>
      
      <SpacedRepetitionModule />
      
      <div className={styles.grid}>
        {lessonsList.map(lesson => (
          <LessonCard 
            key={lesson.id}
            {...lesson}
            progress={progressData.find(p => p.slug === lesson.slug)}
          />
        ))}
      </div>
    </main>
  );
}
