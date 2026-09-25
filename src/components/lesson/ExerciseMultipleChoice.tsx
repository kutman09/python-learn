import React from 'react';
import { MultipleChoiceExercise } from '@/types/lesson';
import styles from './Exercise.module.scss';

interface Props {
  exercise: MultipleChoiceExercise;
  value: string;
  onChange: (val: string) => void;
}

export const ExerciseMultipleChoice: React.FC<Props> = ({ exercise, value, onChange }) => {
  return (
    <div className={styles.container}>
      <div className={styles.options}>
        {exercise.options.map((opt, i) => (
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
        ))}
      </div>
    </div>
  );
};
