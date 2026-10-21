import { LessonContent } from '@/types/lesson';
import { lesson1 } from './lesson-1-basics';
import { lesson2 } from './lesson-2-operators';
import { lesson3 } from './lesson-3-conditions';
import { lesson4 } from './lesson-4-methods';
import { lesson5 } from './lesson-5-loops';
import { lesson6 } from './lesson-6-functions';
import { lesson7 } from './lesson-7-oop';

export const lessonsList = [
  {
    id: 'l1',
    slug: 'lesson-1-basics',
    title: { ru: 'Занятие 1: Основы Python', ky: '1-сабак: Python негиздери' },
    description: { ru: 'Переменные, типы данных, print, input и f-строки.', ky: 'Өзгөрмөлөр, маалымат типтери, print, input жана f-саптар.' },
    available: true,
  },
  {
    id: 'l2',
    slug: 'lesson-2-operators',
    title: { ru: 'Занятие 2: Операторы', ky: '2-сабак: Операторлор' },
    description: { ru: 'Арифметические операторы и операторы сравнения.', ky: 'Арифметикалык операторлор жана салыштыруу операторлору.' },
    available: true,
  },
  {
    id: 'l3',
    slug: 'lesson-3-conditions',
    title: { ru: 'Занятие 3: Условия', ky: '3-сабак: Шарттар' },
    description: { ru: 'Конструкции if, elif, else, логические операторы.', ky: 'if, elif, else конструкциялары, логикалык операторлор.' },
    available: true,
  },
  {
    id: 'l4',
    slug: 'lesson-4-methods',
    title: { ru: 'Занятие 4: Методы и функции', ky: '4-сабак: Методдор жана функциялар' },
    description: { ru: 'Методы списков, строк, словарей, множеств.', ky: 'Тизмелердин, саптардын, сөздүктөрдүн жана көптүктөрдүн методдору.' },
    available: true,
  },
  {
    id: 'l5',
    slug: 'lesson-5-loops',
    title: { ru: 'Занятие 5: Циклы', ky: '5-сабак: Циклдер' },
    description: { ru: 'for и while.', ky: 'for жана while циклдери.' },
    available: true,
  },
  {
    id: 'l6',
    slug: 'lesson-6-functions',
    title: { ru: 'Занятие 6: Функции', ky: '6-сабак: Функциялар' },
    description: { ru: 'def, параметры, return, область видимости и lambda.', ky: 'def, параметрлер, return, көрүнүү аймагы жана lambda.' },
    available: true,
  },
  {
    id: 'l7',
    slug: 'lesson-7-oop',
    title: { ru: 'Занятие 7: ООП и его принципы', ky: '7-сабак: ООП жана анын принциптери' },
    description: { ru: 'Классы, объекты, __init__, self, инкапсуляция, наследование и полиморфизм.', ky: 'Класстар, объекттер, __init__, self, инкапсуляция, мурастоо жана полиморфизм.' },
    available: true,
  }
];

export const getLessonBySlug = (slug: string): LessonContent | undefined => {
  if (slug === 'lesson-1-basics') return lesson1;
  if (slug === 'lesson-2-operators') return lesson2;
  if (slug === 'lesson-3-conditions') return lesson3;
  if (slug === 'lesson-4-methods') return lesson4;
  if (slug === 'lesson-5-loops') return lesson5;
  if (slug === 'lesson-6-functions') return lesson6;
  if (slug === 'lesson-7-oop') return lesson7;
  return undefined;
};
