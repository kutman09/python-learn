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
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { tUi, t } from '@/lib/i18n';

interface Props {
  lesson: LessonContent;
}

type StepState = {
  type: 'theory' | 'guided' | 'free' | 'test' | 'results';
  topicIndex: number;
  exIndex: number;
};

export const LessonViewer: React.FC<Props> = ({ lesson }) => {
  const { language } = useLanguage();
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
  
  const totalSteps = lesson.topics.reduce((acc, topicItem) => acc + 1 + topicItem.guidedPractice.length + topicItem.freePractice.length, 0) + lesson.test.length + 1;
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
          <h2>{t(topic.title, language)}</h2>
          <TheoryBlock data={topic.theory} language={language} />
          <button className={styles.nextBtn} onClick={handleNext}>
            {tUi('understoodNext', language)} <ArrowRight size={16} />
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
            <h2>{t(topic.title, language)}</h2>
            <span className={styles.badge}>{currentStep.type === 'guided' ? tUi('training', language) : tUi('practice', language)}</span>
          </div>
          <ExerciseBlock 
            key={exercise.id} 
            exercise={exercise} 
            onComplete={(isCorrect) => handleExerciseComplete(isCorrect, exercise.id, currentStep.type as 'guided' | 'free' | 'test')} 
            savedAnswer={answers[exercise.id] ? (answers[exercise.id].isCorrect ? ((exercise as any).correctAnswer as string || tUi('done', language)) : '') : undefined}
          />
          {hasAnswered && (
            <button className={styles.nextBtn} onClick={handleNext}>
              {tUi('next', language)} <ArrowRight size={16} />
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
            savedAnswer={answers[exercise.id] ? (answers[exercise.id].isCorrect ? ((exercise as any).correctAnswer as string || tUi('done', language)) : '') : undefined}
          />
          {hasAnswered && (
            <button className={styles.nextBtn} onClick={handleNext}>
              {currentStep.exIndex < lesson.test.length - 1 ? tUi('nextQuestion', language) : tUi('finish', language)} <ArrowRight size={16} />
            </button>
          )}
        </div>
      );
    }

    if (currentStep.type === 'results') {
      return (
        <div className={styles.resultsContainer}>
          <h2>{tUi('lessonResults', language)}</h2>
          
          <div className={styles.scoreCircle}>
            <div className={styles.scoreValue}>{finalScore}%</div>
            <div className={styles.scoreLabel}>{tUi('understanding', language)}</div>
          </div>

          {lesson.id === 'lesson-4' && (
            <div className={styles.subScores}>
              <h3>{tUi('dataTypesPerformance', language)}</h3>
              <div className={styles.subScoreGrid}>
                {lesson.topics.map(topicItem => {
                  const exercises = [...topicItem.guidedPractice, ...topicItem.freePractice];
                  if (exercises.length === 0) return null;
                  const correctCount = exercises.filter(ex => answers[ex.id]?.isCorrect).length;
                  const percent = Math.round((correctCount / exercises.length) * 100);
                  let label = topicItem.title;
                  if (topicItem.id === 'methods_list') label = 'list';
                  if (topicItem.id === 'methods_set') label = 'set';
                  if (topicItem.id === 'methods_dict') label = 'dict';
                  if (topicItem.id === 'methods_immutable') label = 'str, tuple, числа';
                  return (
                    <div key={topicItem.id} className={styles.subScoreItem}>
                      <span className={styles.subLabel}>{t(label as any, language)}</span>
                      <span className={styles.subValue}>{percent}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          <div className={styles.summaryList}>
            <h3>{tUi('whatWeLearned', language)}</h3>
            <ul>
              {lesson.summary.map((s, i) => (
                <li key={i}>{t(s, language)}</li>
              ))}
            </ul>
          </div>

          <details className={styles.wrongAnswers}>
            <summary>{tUi('mistakesAndAnswers', language)}</summary>
            <div className={styles.wrongAnswersList}>
              {lesson.topics.flatMap(topicItem => [...topicItem.guidedPractice, ...topicItem.freePractice]).concat(lesson.test as any)
                .filter(ex => answers[ex.id] && !answers[ex.id].isCorrect)
                .map(ex => (
                  <div key={ex.id} className={styles.wrongAnswerItem}>
                    <p className={styles.q}><strong>{tUi('q', language)}</strong> {t(ex.type === 'code-run' ? (ex as any).prompt : ex.question, language)}</p>
                    <p className={styles.a}><strong>{tUi('expected', language)}</strong> {
                      ex.type === 'code-run' ? 
                        ((ex as any).expectedStdout || tUi('codeMustPerformRightActions', language)) :
                        (Array.isArray(ex.correctAnswer) ? ex.correctAnswer[0] : ex.correctAnswer)
                    }</p>
                    <p className={styles.e}><i>{t(ex.explanation || (ex as any).explanationOnFail, language)}</i></p>
                  </div>
                ))}
            </div>
          </details>
          
          <Link href="/" className={styles.homeBtn}>
            {tUi('toHome', language)}
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
            <ArrowLeft size={20} /> {tUi('back', language)}
          </button>
        ) : (
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={20} /> {tUi('toHome', language)}
          </Link>
        )}
        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
        <div style={{ marginLeft: '16px' }}>
          <LanguageSwitcher />
        </div>
      </div>
      
      <div className={styles.contentArea}>
        {renderContent()}
      </div>
    </div>
  );
};
