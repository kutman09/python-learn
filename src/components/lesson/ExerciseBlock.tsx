'use client';

import React, { useState } from 'react';
import { Exercise } from '@/types/lesson';
import { ExercisePredictOutput } from './ExercisePredictOutput';
import { ExerciseMultipleChoice } from './ExerciseMultipleChoice';
import { ExerciseTextInput } from './ExerciseTextInput';
import { CheckCircle, XCircle } from 'lucide-react';
import styles from './ExerciseBlock.module.scss';

import { ExerciseFillGap } from './ExerciseFillGap';
import { ExerciseCodeRun } from './ExerciseCodeRun';

interface ExerciseBlockProps {
  exercise: Exercise;
  onComplete: (isCorrect: boolean) => void;
  savedAnswer?: string;
}

export const ExerciseBlock: React.FC<ExerciseBlockProps> = ({ exercise, onComplete, savedAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>(savedAnswer || '');
  const [showFeedback, setShowFeedback] = useState<boolean>(!!savedAnswer);
  const [overrideIsCorrect, setOverrideIsCorrect] = useState<boolean | null>(null);
  const [overrideExplanation, setOverrideExplanation] = useState<string | null>(null);

  const baseIsCorrect = exercise.type !== 'code-run' && Array.isArray((exercise as any).correctAnswer)
    ? (exercise as any).correctAnswer.includes(selectedAnswer.trim())
    : selectedAnswer.trim() === (exercise as any).correctAnswer;
    
  const actualIsCorrect = overrideIsCorrect !== null ? overrideIsCorrect : baseIsCorrect;
  const actualExplanation = overrideExplanation !== null ? overrideExplanation : exercise.explanation;

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setShowFeedback(true);
    onComplete(actualIsCorrect);
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
      case 'code-run':
        return (
          <ExerciseCodeRun
            exercise={exercise}
            value={selectedAnswer}
            onChange={(val) => setSelectedAnswer(val)}
            onCodeRunResult={(isCorrect, explanation) => {
              // For code run, we override the default handleSubmit logic
              setOverrideIsCorrect(isCorrect);
              setOverrideExplanation(explanation || (isCorrect ? 'Отлично!' : 'Ошибка.'));
              setShowFeedback(true);
              onComplete(isCorrect);
            }}
          />
        );
      default:
        return <div>Exercise type not supported yet.</div>;
    }
  };

  const isCodeRun = exercise.type === 'code-run';

  return (
    <div className={styles.exerciseBlock}>
      {!isCodeRun && <h3 className={styles.question}>{exercise.question}</h3>}
      
      {renderExercise()}

      {!showFeedback && !isCodeRun && (
        <button 
          className={styles.submitBtn} 
          disabled={!selectedAnswer}
          onClick={handleSubmit}
        >
          Проверить
        </button>
      )}

      {showFeedback && (
        <div className={`${styles.feedback} ${actualIsCorrect ? styles.correct : styles.incorrect}`}>
          <div className={styles.feedbackHeader}>
            {actualIsCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
            <strong>{actualIsCorrect ? 'Верно!' : 'Неверно'}</strong>
          </div>
          <p className={styles.feedbackText}>{actualExplanation}</p>
        </div>
      )}
    </div>
  );
};
