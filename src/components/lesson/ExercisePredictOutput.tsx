import React from 'react';
import { PredictOutputExercise } from '@/types/lesson';
import { Language } from '@/contexts/LanguageContext';
import { t, tUi } from '@/lib/i18n';
import { CodeBlock } from './CodeBlock';
import styles from './Exercise.module.scss';

interface Props {
  language: Language;
  exercise: PredictOutputExercise;
  value: string;
  onChange: (val: string) => void;
}

export const ExercisePredictOutput: React.FC<Props> = ({ exercise, value, onChange, language }) => {
  return (
    <div className={styles.container}>
      <CodeBlock code={exercise.code} />
      
      {exercise.options ? (
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
          )})}
        </div>
      ) : (
        <input
          type="text"
          className={styles.textInput}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={tUi('output', language)}
        />
      )}
    </div>
  );
};
