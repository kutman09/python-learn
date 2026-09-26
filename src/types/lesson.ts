export type LessonSlug = 'lesson-1-basics' | 'lesson-2-operators' | 'lesson-3-conditions' | 'lesson-4-methods';

export interface LessonContent {
  id: string;
  slug: LessonSlug;
  title: string;
  description: string;
  topics: Topic[];
  test: TestQuestion[];
  summary: string[];
}

export interface Topic {
  id: string;
  title: string;
  theory: TheoryBlockData;
  guidedPractice: Exercise[];
  freePractice: Exercise[];
}

export interface TheoryBlockData {
  content: string; // Markdown or HTML string, but we can just use React components or string with paragraphs
  analogy?: {
    title: string;
    content: string;
  };
}

export type ExerciseType = 'predict-output' | 'multiple-choice' | 'fill-gap' | 'code-order' | 'text-input' | 'code-run';

export interface BaseExercise {
  id: string;
  type: ExerciseType;
  question: string;
  explanation: string; // Explanation shown after answering
}

export interface PredictOutputExercise extends BaseExercise {
  type: 'predict-output';
  code: string;
  options?: string[]; // If guided, we provide options. If free, no options.
  correctAnswer: string;
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple-choice';
  options: string[];
  correctAnswer: string;
}

export interface FillGapExercise extends BaseExercise {
  type: 'fill-gap';
  codeTemplate: string; // use ___ for the gap
  correctAnswer: string;
}

export interface TextInputExercise extends BaseExercise {
  type: 'text-input';
  correctAnswer: string | string[]; // Can accept multiple valid answers
}

export interface CodeRunExercise extends BaseExercise {
  type: 'code-run';
  prompt: string;              // условие задачи словами
  starterCode?: string;        // опциональная заготовка кода
  expectedStdout?: string;     // вариант проверки 1: ожидаемый вывод
  checkScript?: string;        // вариант проверки 2: python-скрипт с assert'ами
  explanationOnFail?: string;  // опциональное объяснение при неудачной проверке
  explanationOnSuccess?: string; // опциональное объяснение при удачной проверке
}

export type Exercise = PredictOutputExercise | MultipleChoiceExercise | FillGapExercise | TextInputExercise | CodeRunExercise;

export interface TestQuestion extends BaseExercise {
  // Same as exercise but mixed
  options?: string[]; // for multiple choice
  correctAnswer: string;
  code?: string;
}
