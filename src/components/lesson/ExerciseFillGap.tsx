import React from 'react';
import { FillGapExercise } from '@/types/lesson';
import styles from './Exercise.module.scss';

interface Props {
  exercise: FillGapExercise;
  value: string;
  onChange: (val: string) => void;
}

export const ExerciseFillGap: React.FC<Props> = ({ exercise, value, onChange }) => {
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
