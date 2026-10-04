import React from 'react';
import { getLessonBySlug } from '@/data/lessons';
import { LessonViewer } from '@/components/lesson/LessonViewer';

export default function Lesson5Page() {
  const lesson = getLessonBySlug('lesson-5-loops');
  if (!lesson) return <div>Lesson not found</div>;
  
  return <LessonViewer lesson={lesson} />;
}
