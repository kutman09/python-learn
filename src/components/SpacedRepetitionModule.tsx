'use client';

import React, { useState, useEffect } from 'react';
import { getProgress } from '@/lib/progress';
import { CheckCircle, XCircle } from 'lucide-react';
import styles from './SpacedRepetition.module.scss';

// Mock simple spaced repetition data for this demo.
// In a real app, this would be generated from the user's past mistakes or key lesson takeaways.
const ALL_CARDS = [
  { id: 'sr-1', question: 'Какой тип возвращает функция input()?', answer: 'str (строка)' },
  { id: 'sr-2', question: 'Можно ли изменить элемент кортежа (tuple)?', answer: 'Нет, он immutable (неизменяемый)' },
  { id: 'sr-3', question: 'Разница между = и == ?', answer: '= это присваивание, == это сравнение на равенство' },
  { id: 'sr-4', question: 'Что выведет 10 // 3?', answer: '3 (целочисленное деление)' }
];

export const SpacedRepetitionModule: React.FC = () => {
  const [showCards, setShowCards] = useState(false);
  const [cards, setCards] = useState<typeof ALL_CARDS>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  
  useEffect(() => {
    // Only show if user has passed at least one lesson
    const progress = getProgress();
    if (progress.length > 0) {
      // Pick random 2 cards for quick repetition
      const shuffled = [...ALL_CARDS].sort(() => 0.5 - Math.random());
      setCards(shuffled.slice(0, 2));
      setShowCards(true);
    }
  }, []);

  if (!showCards || cards.length === 0) return null;

  const handleReveal = () => setShowAnswer(true);
  
  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      setShowCards(false); // finish
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>💡 Повторение (Spaced Repetition)</h3>
        <span>{currentIndex + 1} / {cards.length}</span>
      </div>
      
      <div className={styles.card}>
        <p className={styles.question}>{cards[currentIndex].question}</p>
        
        {showAnswer ? (
          <div className={styles.answerBlock}>
            <p className={styles.answer}>{cards[currentIndex].answer}</p>
            <div className={styles.actions}>
              <button className={styles.btnHard} onClick={handleNext}>Забыл <XCircle size={16} /></button>
              <button className={styles.btnEasy} onClick={handleNext}>Помню <CheckCircle size={16} /></button>
            </div>
          </div>
        ) : (
          <button className={styles.revealBtn} onClick={handleReveal}>Показать ответ</button>
        )}
      </div>
    </div>
  );
};
