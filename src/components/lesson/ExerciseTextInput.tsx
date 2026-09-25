import React from 'react';
import { TextInputExercise } from '@/types/lesson';
import styles from './Exercise.module.scss';

interface Props {
  exercise: TextInputExercise;
  value: string;
  onChange: (val: string) => void;
}

export const ExerciseTextInput: React.FC<Props> = ({ exercise, value, onChange }) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.textInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Введите ответ..."
      />
    </div>
  );
};
