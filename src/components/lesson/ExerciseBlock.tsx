'use client';

import React, { useState } from 'react';
import { Exercise } from '@/types/lesson';
import { ExercisePredictOutput } from './ExercisePredictOutput';
import { ExerciseMultipleChoice } from './ExerciseMultipleChoice';
import { ExerciseTextInput } from './ExerciseTextInput';
import { CheckCircle, XCircle } from 'lucide-react';
import styles from './ExerciseBlock.module.scss';

import { ExerciseFillGap } from './ExerciseFillGap';

interface ExerciseBlockProps {
  exercise: Exercise;
  onComplete: (isCorrect: boolean) => void;
  savedAnswer?: string;
}

export const ExerciseBlock: React.FC<ExerciseBlockProps> = ({ exercise, onComplete, savedAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>(savedAnswer || '');
  const [showFeedback, setShowFeedback] = useState<boolean>(!!savedAnswer);

  const isCorrect = Array.isArray(exercise.correctAnswer)
    ? exercise.correctAnswer.includes(selectedAnswer.trim())
    : selectedAnswer.trim() === exercise.correctAnswer;

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setShowFeedback(true);
    onComplete(isCorrect);
  };

  const renderExercise = () => {
    switch (exercise.type) {
      case 'predict-output':
        return (
          <ExercisePredictOutput
            exercise={exercise}
            value={selectedAnswer}
            onChange={(val) => !showFeedback && setSelectedAnswer(val)}
          />
        );
      case 'multiple-choice':
        return (
          <ExerciseMultipleChoice
            exercise={exercise}
            value={selectedAnswer}
            onChange={(val) => !showFeedback && setSelectedAnswer(val)}
          />
        );
      case 'text-input':
        return (
          <ExerciseTextInput
            exercise={exercise}
            value={selectedAnswer}
            onChange={(val) => !showFeedback && setSelectedAnswer(val)}
          />
        );
      case 'fill-gap':
        return (
          <ExerciseFillGap
            exercise={exercise}
            value={selectedAnswer}
            onChange={(val) => !showFeedback && setSelectedAnswer(val)}
          />
        );
      default:
        return <div>Exercise type not supported yet.</div>;
    }
  };

  return (
    <div className={styles.exerciseBlock}>
      <h3 className={styles.question}>{exercise.question}</h3>
      
      {renderExercise()}

      {!showFeedback && (
        <button 
          className={styles.submitBtn} 
          disabled={!selectedAnswer}
          onClick={handleSubmit}
        >
          Проверить
        </button>
      )}

      {showFeedback && (
        <div className={`${styles.feedback} ${isCorrect ? styles.correct : styles.incorrect}`}>
          <div className={styles.feedbackHeader}>
            {isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
            <strong>{isCorrect ? 'Верно!' : 'Неверно'}</strong>
          </div>
          <p>{exercise.explanation}</p>
        </div>
      )}
    </div>
  );
};
