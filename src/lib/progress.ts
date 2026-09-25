export interface LessonProgress {
  slug: string;
  completedAt: string;
  score: number;
  details: any;
}

export const getProgress = (): LessonProgress[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('python_progress');
  return data ? JSON.parse(data) : [];
};

export const saveProgress = (progress: LessonProgress) => {
  if (typeof window === 'undefined') return;
  const current = getProgress();
  const existingIndex = current.findIndex(p => p.slug === progress.slug);
  if (existingIndex >= 0) {
    current[existingIndex] = progress;
  } else {
    current.push(progress);
  }
  localStorage.setItem('python_progress', JSON.stringify(current));
};
