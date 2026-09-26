import { LessonContent } from '@/types/lesson';
import { lesson1 } from './lesson-1-basics';
import { lesson2 } from './lesson-2-operators';
import { lesson3 } from './lesson-3-conditions';
import { lesson4 } from './lesson-4-methods';

export const lessonsList = [
  {
    id: 'l1',
    slug: 'lesson-1-basics',
    title: 'Занятие 1: Основы Python',
    description: 'Переменные, типы данных, print, input и f-строки.',
    available: true,
  },
  {
    id: 'l2',
    slug: 'lesson-2-operators',
    title: 'Занятие 2: Операторы',
    description: 'Арифметические операторы и операторы сравнения.',
    available: true,
  },
  {
    id: 'l3',
    slug: 'lesson-3-conditions',
    title: 'Занятие 3: Условия',
    description: 'Конструкции if, elif, else, логические операторы.',
    available: true,
  },
  {
    id: 'l4',
    slug: 'lesson-4-methods',
    title: 'Занятие 4: Методы и функции',
    description: 'Методы списков, строк, словарей, множеств.',
    available: true,
  },
  {
    id: 'l5',
    slug: 'lesson-5-loops',
    title: 'Занятие 5: Циклы',
    description: 'for и while.',
    available: false,
  }
];

export const getLessonBySlug = (slug: string): LessonContent | undefined => {
  if (slug === 'lesson-1-basics') return lesson1;
  if (slug === 'lesson-2-operators') return lesson2;
  if (slug === 'lesson-3-conditions') return lesson3;
  if (slug === 'lesson-4-methods') return lesson4;
  return undefined;
};
