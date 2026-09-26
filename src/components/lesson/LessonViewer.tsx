'use client';

import React, { useState, useEffect } from 'react';
import { LessonContent, Exercise } from '@/types/lesson';
import { TheoryBlock } from './TheoryBlock';
import { ExerciseBlock } from './ExerciseBlock';
import { saveProgress } from '@/lib/progress';
import { calculateScore, ScoreData } from '@/lib/scoring';
import styles from './LessonViewer.module.scss';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Props {
  lesson: LessonContent;
}

type StepState = {
  type: 'theory' | 'guided' | 'free' | 'test' | 'results';
  topicIndex: number;
  exIndex: number;
};

export const LessonViewer: React.FC<Props> = ({ lesson }) => {
  const [history, setHistory] = useState<StepState[]>([{ type: 'theory', topicIndex: 0, exIndex: 0 }]);
  const currentStep = history[history.length - 1];
  
  const [answers, setAnswers] = useState<Record<string, { isCorrect: boolean, value?: string }>>({});
  
  const [scoreData, setScoreData] = useState<ScoreData>({
    guidedCorrect: 0, guidedTotal: 0,
    freeCorrect: 0, freeTotal: 0,
    testCorrect: 0, testTotal: 0
  });

  const [completed, setCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const topic = lesson.topics[currentStep.topicIndex];
  
  const totalSteps = lesson.topics.reduce((acc, t) => acc + 1 + t.guidedPractice.length + t.freePractice.length, 0) + lesson.test.length + 1;
  const progressPercent = (history.length / totalSteps) * 100;

  const handleNext = () => {
    let nextStep: StepState | null = null;
    
    if (currentStep.type === 'theory') {
      if (topic.guidedPractice.length > 0) nextStep = { type: 'guided', topicIndex: currentStep.topicIndex, exIndex: 0 };
      else if (topic.freePractice.length > 0) nextStep = { type: 'free', topicIndex: currentStep.topicIndex, exIndex: 0 };
      else nextStep = getNextTopicStart(currentStep.topicIndex);
    } else if (currentStep.type === 'guided') {
      if (currentStep.exIndex < topic.guidedPractice.length - 1) {
        nextStep = { type: 'guided', topicIndex: currentStep.topicIndex, exIndex: currentStep.exIndex + 1 };
      } else if (topic.freePractice.length > 0) {
        nextStep = { type: 'free', topicIndex: currentStep.topicIndex, exIndex: 0 };
      } else {
        nextStep = getNextTopicStart(currentStep.topicIndex);
      }
    } else if (currentStep.type === 'free') {
      if (currentStep.exIndex < topic.freePractice.length - 1) {
        nextStep = { type: 'free', topicIndex: currentStep.topicIndex, exIndex: currentStep.exIndex + 1 };
      } else {
        nextStep = getNextTopicStart(currentStep.topicIndex);
      }
    } else if (currentStep.type === 'test') {
      if (currentStep.exIndex < lesson.test.length - 1) {
        nextStep = { type: 'test', topicIndex: 0, exIndex: currentStep.exIndex + 1 };
      } else {
        nextStep = { type: 'results', topicIndex: 0, exIndex: 0 };
        setCompleted(true);
      }
    }
    
    if (nextStep) {
      setHistory([...history, nextStep]);
    }
  };

  const getNextTopicStart = (currentIndex: number): StepState => {
    if (currentIndex < lesson.topics.length - 1) {
      return { type: 'theory', topicIndex: currentIndex + 1, exIndex: 0 };
    }
    return { type: 'test', topicIndex: 0, exIndex: 0 };
  };

  const handleBack = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, -1));
    }
  };

  const handleExerciseComplete = (isCorrect: boolean, exerciseId: string, type: 'guided' | 'free' | 'test') => {
    if (answers[exerciseId]) return; // already answered
    
    setAnswers(prev => ({ ...prev, [exerciseId]: { isCorrect } }));
    
    setScoreData(prev => {
      const newData = { ...prev };
      if (type === 'guided') {
        newData.guidedTotal += 1;
        if (isCorrect) newData.guidedCorrect += 1;
      } else if (type === 'free') {
        newData.freeTotal += 1;
        if (isCorrect) newData.freeCorrect += 1;
      } else if (type === 'test') {
        newData.testTotal += 1;
        if (isCorrect) newData.testCorrect += 1;
      }
      return newData;
    });
  };

  useEffect(() => {
    if (completed) {
      const score = calculateScore(scoreData);
      setFinalScore(score);
      saveProgress({
        slug: lesson.slug,
        completedAt: new Date().toISOString(),
        score,
        details: scoreData
      });
    }
  }, [completed, scoreData, lesson.slug]);

  const renderContent = () => {
    if (currentStep.type === 'theory') {
      return (
        <div className={styles.theoryContainer}>
          <h2>{topic.title}</h2>
          <TheoryBlock data={topic.theory} />
          <button className={styles.nextBtn} onClick={handleNext}>
            Понятно, дальше <ArrowRight size={16} />
          </button>
        </div>
      );
    }

    if (currentStep.type === 'guided' || currentStep.type === 'free') {
      const exercises = currentStep.type === 'guided' ? topic.guidedPractice : topic.freePractice;
      const exercise = exercises[currentStep.exIndex];
      const hasAnswered = answers[exercise.id] !== undefined;

      return (
        <div className={styles.exerciseContainer}>
          <div className={styles.header}>
            <h2>{topic.title}</h2>
            <span className={styles.badge}>{currentStep.type === 'guided' ? 'Тренировка' : 'Практика'}</span>
          </div>
          <ExerciseBlock 
            key={exercise.id} 
            exercise={exercise} 
            onComplete={(isCorrect) => handleExerciseComplete(isCorrect, exercise.id, currentStep.type as 'guided' | 'free' | 'test')} 
            savedAnswer={answers[exercise.id] ? (answers[exercise.id].isCorrect ? ((exercise as any).correctAnswer as string || 'Выполнено') : '') : undefined}
          />
          {hasAnswered && (
            <button className={styles.nextBtn} onClick={handleNext}>
              Дальше <ArrowRight size={16} />
            </button>
          )}
        </div>
      );
    }

    if (currentStep.type === 'test') {
      const exercise = lesson.test[currentStep.exIndex];
      const hasAnswered = answers[exercise.id] !== undefined;

      return (
        <div className={styles.exerciseContainer}>
          <div className={styles.header}>
            <h2>Финальный тест</h2>
            <span className={styles.badge}>Вопрос {currentStep.exIndex + 1} из {lesson.test.length}</span>
          </div>
          <ExerciseBlock 
            key={exercise.id} 
            exercise={exercise as Exercise} 
            onComplete={(isCorrect) => handleExerciseComplete(isCorrect, exercise.id, 'test')} 
            savedAnswer={answers[exercise.id] ? (answers[exercise.id].isCorrect ? ((exercise as any).correctAnswer as string || 'Выполнено') : '') : undefined}
          />
          {hasAnswered && (
            <button className={styles.nextBtn} onClick={handleNext}>
              {currentStep.exIndex < lesson.test.length - 1 ? 'Следующий вопрос' : 'Завершить'} <ArrowRight size={16} />
            </button>
          )}
        </div>
      );
    }

    if (currentStep.type === 'results') {
      return (
        <div className={styles.resultsContainer}>
          <h2>Итоги занятия</h2>
          
          <div className={styles.scoreCircle}>
            <div className={styles.scoreValue}>{finalScore}%</div>
            <div className={styles.scoreLabel}>Понимание</div>
          </div>

          {lesson.id === 'lesson-4' && (
            <div className={styles.subScores}>
              <h3>Успеваемость по типам данных:</h3>
              <div className={styles.subScoreGrid}>
                {lesson.topics.map(t => {
                  const exercises = [...t.guidedPractice, ...t.freePractice];
                  if (exercises.length === 0) return null;
                  const correctCount = exercises.filter(ex => answers[ex.id]?.isCorrect).length;
                  const percent = Math.round((correctCount / exercises.length) * 100);
                  let label = t.title;
                  if (t.id === 'methods_list') label = 'list';
                  if (t.id === 'methods_set') label = 'set';
                  if (t.id === 'methods_dict') label = 'dict';
                  if (t.id === 'methods_immutable') label = 'str, tuple, числа';
                  return (
                    <div key={t.id} className={styles.subScoreItem}>
                      <span className={styles.subLabel}>{label}</span>
                      <span className={styles.subValue}>{percent}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          <div className={styles.summaryList}>
            <h3>Что мы выучили сегодня:</h3>
            <ul>
              {lesson.summary.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <details className={styles.wrongAnswers}>
            <summary>Ошибки и правильные ответы</summary>
            <div className={styles.wrongAnswersList}>
              {lesson.topics.flatMap(t => [...t.guidedPractice, ...t.freePractice]).concat(lesson.test as any)
                .filter(ex => answers[ex.id] && !answers[ex.id].isCorrect)
                .map(ex => (
                  <div key={ex.id} className={styles.wrongAnswerItem}>
                    <p className={styles.q}><strong>В:</strong> {ex.type === 'code-run' ? (ex as any).prompt : ex.question}</p>
                    <p className={styles.a}><strong>Ожидалось:</strong> {
                      ex.type === 'code-run' ? 
                        ((ex as any).expectedStdout || 'Код должен выполнить правильные действия') :
                        (Array.isArray(ex.correctAnswer) ? ex.correctAnswer[0] : ex.correctAnswer)
                    }</p>
                    <p className={styles.e}><i>{ex.explanation || (ex as any).explanationOnFail}</i></p>
                  </div>
                ))}
            </div>
          </details>
          
          <Link href="/" className={styles.homeBtn}>
            На главную
          </Link>
        </div>
      );
    }
  };

  return (
    <div className={styles.viewer}>
      <div className={styles.topBar}>
        {history.length > 1 && currentStep.type !== 'results' ? (
          <button className={styles.backLink} onClick={handleBack}>
            <ArrowLeft size={20} /> Назад
          </button>
        ) : (
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={20} /> На главную
          </Link>
        )}
        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>
      
      <div className={styles.contentArea}>
        {renderContent()}
      </div>
    </div>
  );
};
