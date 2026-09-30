import React from 'react';
import { Language } from '@/contexts/LanguageContext';
import { t, tUi } from '@/lib/i18n';
import { FillGapExercise } from '@/types/lesson';
import styles from './Exercise.module.scss';

interface Props {
  language?: Language;
  exercise: FillGapExercise;
  value: string;
  onChange: (val: string) => void;
}

export const ExerciseFillGap: React.FC<Props> = ({ exercise, value, onChange, language }) => {
  const parts = exercise.codeTemplate.split('___');
  
  return (
    <div className={styles.container}>
      <div className={styles.codeLine}>
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            <span className={styles.codeText}>{part}</span>
            {i < parts.length - 1 && (
              <input
                type="text"
                className={styles.gapInput}
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
