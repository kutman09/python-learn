export type LessonSlug = 'lesson-1-basics' | 'lesson-2-operators' | 'lesson-3-conditions' | 'lesson-4-methods';

export interface LocalizedText {
  ru: string;
  ky: string;
}

export type TString = string | LocalizedText;

export interface LessonContent {
  id: string;
  slug: LessonSlug;
  title: TString;
  description: TString;
  topics: Topic[];
  test: TestQuestion[];
  summary: TString[];
}

export interface Topic {
  id: string;
  title: TString;
  theory: TheoryBlockData;
  guidedPractice: Exercise[];
  freePractice: Exercise[];
}

export interface TheoryBlockData {
  content: TString; // Markdown or HTML string, but we can just use React components or string with paragraphs
  analogy?: {
    title: TString;
    content: TString;
  };
}

export type ExerciseType = 'predict-output' | 'multiple-choice' | 'fill-gap' | 'code-order' | 'text-input' | 'code-run';

export interface BaseExercise {
  id: string;
  type: ExerciseType;
  question: TString;
  explanation: TString; // Explanation shown after answering
}

export interface PredictOutputExercise extends BaseExercise {
  type: 'predict-output';
  code: string;
  options?: TString[]; // If guided, we provide options. If free, no options.
  correctAnswer: string; // The selectedAnswer is usually plain text matching ru or ky, but actually user selects the option. Better yet, we can check equality against localized correctAnswer string.
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple-choice';
  options: TString[];
  correctAnswer: string;
}

export interface FillGapExercise extends BaseExercise {
  type: 'fill-gap';
  codeTemplate: string; // use ___ for the gap
  correctAnswer: string; // Usually just code snippet, no translation needed.
}

export interface TextInputExercise extends BaseExercise {
  type: 'text-input';
  correctAnswer: string | string[]; // Code snippets
}

export interface CodeRunExercise extends BaseExercise {
  type: 'code-run';
  prompt: TString;             // условие задачи словами
  starterCode?: string;        // опциональная заготовка кода
  expectedStdout?: string;     // вариант проверки 1: ожидаемый вывод
  checkScript?: string;        // вариант проверки 2: python-скрипт с assert'ами
  explanationOnFail?: TString; // опциональное объяснение при неудачной проверке
  explanationOnSuccess?: TString; // опциональное объяснение при удачной проверке
}

export type Exercise = PredictOutputExercise | MultipleChoiceExercise | FillGapExercise | TextInputExercise | CodeRunExercise;

export interface TestQuestion extends BaseExercise {
  // Same as exercise but mixed
  options?: TString[]; // for multiple choice
  correctAnswer: string | string[];
  code?: string;
}

