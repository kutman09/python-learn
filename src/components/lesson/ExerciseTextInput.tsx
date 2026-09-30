import React from 'react';
import { Language } from '@/contexts/LanguageContext';
import { t, tUi } from '@/lib/i18n';
import { TextInputExercise } from '@/types/lesson';
import styles from './Exercise.module.scss';

interface Props {
  language?: Language;
  exercise: TextInputExercise;
  value: string;
  onChange: (val: string) => void;
}

export const ExerciseTextInput: React.FC<Props> = ({ exercise, value, onChange, language }) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.textInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={language === 'ky' ? 'Жоопту киргизиңиз...' : 'Введите ответ...'}
      />
    </div>
  );
};
