import React from 'react';
import { getLessonBySlug } from '@/data/lessons';
import { LessonViewer } from '@/components/lesson/LessonViewer';

export default function Lesson2Page() {
  const lesson = getLessonBySlug('lesson-2-operators');
  if (!lesson) return <div>Lesson not found</div>;
  
  return <LessonViewer lesson={lesson} />;
}
