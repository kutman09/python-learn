import React from 'react';
import { MultipleChoiceExercise } from '@/types/lesson';
import { Language } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import styles from './Exercise.module.scss';

interface Props {
  language: Language;
  exercise: MultipleChoiceExercise;
  value: string;
  onChange: (val: string) => void;
}

export const ExerciseMultipleChoice: React.FC<Props> = ({ exercise, value, onChange, language }) => {
  return (
    <div className={styles.container}>
      <div className={styles.options}>
        {exercise.options.map((optRaw, i) => {
          const opt = t(optRaw, language);
          return (
          <label key={i} className={`${styles.option} ${value === opt ? styles.selected : ''}`}>
            <input
              type="radio"
              name={exercise.id}
              value={opt}
              checked={value === opt}
              onChange={(e) => onChange(e.target.value)}
            />
            <span className={styles.optionText}>{opt}</span>
          </label>
          );
        })}
      </div>
    </div>
  );
};
