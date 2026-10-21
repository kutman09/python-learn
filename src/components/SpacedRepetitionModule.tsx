'use client';

import React, { useState, useEffect } from 'react';
import { getProgress } from '@/lib/progress';
import { CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t, tUi } from '@/lib/i18n';
import styles from './SpacedRepetition.module.scss';

// Mock simple spaced repetition data for this demo.
// In a real app, this would be generated from the user's past mistakes or key lesson takeaways.
const ALL_CARDS = [
  { id: 'sr-1', question: { ru: 'Какой тип возвращает функция input()?', ky: 'input() функциясы кайсы типти кайтарат?' }, answer: { ru: 'str (строка)', ky: 'str (сап)' } },
  { id: 'sr-2', question: { ru: 'Можно ли изменить элемент кортежа (tuple)?', ky: 'Кортеждин (tuple) элементин өзгөртүүгө болобу?' }, answer: { ru: 'Нет, он immutable (неизменяемый)', ky: 'Жок, ал immutable (өзгөрбөс)' } },
  { id: 'sr-3', question: { ru: 'Разница между = и == ?', ky: '= менен == айырмасы эмнеде?' }, answer: { ru: '= это присваивание, == это сравнение на равенство', ky: '= бул ыйгаруу, == бул барабардыкты текшерүү' } },
  { id: 'sr-4', question: { ru: 'Что выведет 10 // 3?', ky: '10 // 3 эмнени чыгарат?' }, answer: { ru: '3 (целочисленное деление)', ky: '3 (бүтүн бөлүштүрүү)' } },
  { id: 'sr-5', question: { ru: 'Чем return отличается от print()?', ky: 'return менен print() айырмасы эмнеде?' }, answer: { ru: 'return возвращает значение в программу для дальнейшей работы, а print() лишь выводит текст на экран.', ky: 'return программага андан ары иштөө үчүн маанини кайтарат, ал эми print() жөн гана текстти экранга чыгарат.' } },
  { id: 'sr-6', question: { ru: 'Что вернёт функция, если в ней нет return?', ky: 'Эгерде функцияда return жок болсо, ал эмнени кайтарат?' }, answer: { ru: 'None (специальное значение отсутствия результата)', ky: 'None (натыйжанын жоктугун билдирген атайын маани)' } },
  { id: 'sr-7', question: { ru: 'Видна ли локальная переменная функции снаружи?', ky: 'Функциянын локалдык өзгөрмөсү сыртта көрүнөбү?' }, answer: { ru: 'Нет, переменные внутри функции существуют только во время её работы (локальная область).', ky: 'Жок, функциянын ичиндеги өзгөрмөлөр ал иштеп жатканда гана жашайт (локалдык аймак).' } },
  { id: 'sr-8', question: { ru: 'Что такое lambda в Python?', ky: 'Python тилинде lambda деген эмне?' }, answer: { ru: 'Короткая анонимная функция в одно выражение, результат которого возвращается автоматически.', ky: 'Натыйжасы автоматтык түрдө кайтарылуучу бир туюнтмадан турган кыска анонимдүү функция.' } },
  { id: 'sr-9', question: { ru: 'В чём разница между классом и объектом?', ky: 'Класс менен объекттин айырмасы эмнеде?' }, answer: { ru: 'Класс — это чертёж/шаблон, а объект — конкретный экземпляр, созданный по нему.', ky: 'Класс — бул чийме/калып, ал эми объект — ошол калып боюнча түзүлгөн конкреттүү нуска.' } },
  { id: 'sr-10', question: { ru: 'Какую роль выполняет метод __init__ в Python?', ky: 'Python тилинде __init__ методу кандай кызмат аткарат?' }, answer: { ru: 'Конструктор: автоматически вызывается при создании объекта и задаёт его начальные атрибуты.', ky: 'Конструктор: объект түзүлгөндө автоматтык түрдө чакырылып, баштапкы атрибуттарды орнотот.' } },
  { id: 'sr-11', question: { ru: 'Что означает параметр self в методах класса?', ky: 'Класстын методдорундагы self параметри эмнени билдирет?' }, answer: { ru: 'Ссылку на текущий конкретный экземпляр объекта, для которого вызван метод.', ky: 'Метод чакырылган учурдагы конкреттүү объекттин өзүнө шилтемени.' } },
  { id: 'sr-12', question: { ru: 'Назовите три основных принципа ООП', ky: 'ООПтун үч негизги принцибин атаңыз' }, answer: { ru: 'Инкапсуляция, Наследование и Полиморфизм.', ky: 'Инкапсуляция, Мурастоо жана Полиморфизм.' } }
];


export const SpacedRepetitionModule: React.FC = () => {
  const { language } = useLanguage();
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
        <h3>💡 {language === 'ru' ? 'Повторение (Spaced Repetition)' : 'Кайталоо (Spaced Repetition)'}</h3>
        <span>{currentIndex + 1} / {cards.length}</span>
      </div>
      
      <div className={styles.card}>
        <p className={styles.question}>{t(cards[currentIndex].question as any, language)}</p>
        
        {showAnswer ? (
          <div className={styles.answerBlock}>
            <p className={styles.answer}>{t(cards[currentIndex].answer as any, language)}</p>
            <div className={styles.actions}>
              <button className={styles.btnHard} onClick={handleNext}>{language === 'ru' ? 'Забыл' : 'Унуттум'} <XCircle size={16} /></button>
              <button className={styles.btnEasy} onClick={handleNext}>{language === 'ru' ? 'Помню' : 'Эстейм'} <CheckCircle size={16} /></button>
            </div>
          </div>
        ) : (
          <button className={styles.revealBtn} onClick={handleReveal}>{language === 'ru' ? 'Показать ответ' : 'Жоопту көрсөтүү'}</button>
        )}
      </div>
    </div>
  );
};
