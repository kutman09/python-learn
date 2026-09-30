'use client';

import React, { useState, useEffect } from 'react';
import { CodeRunExercise } from '@/types/lesson';
import { Language } from '@/contexts/LanguageContext';
import { t, tUi } from '@/lib/i18n';
import { runPythonCode, initPyodide } from '@/lib/pyodide';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css'; // You may adjust theme
import styles from './ExerciseCodeRun.module.scss';
import { Play, Check, Loader2 } from 'lucide-react';

interface Props {
  language: Language;
  exercise: CodeRunExercise;
  value: string;
  onChange: (val: string) => void;
  onCodeRunResult: (isCorrect: boolean, errorExplanation?: string) => void;
}

export const ExerciseCodeRun: React.FC<Props> = ({ exercise, value, onChange, onCodeRunResult, language }) => {
  const [code, setCode] = useState(value || exercise.starterCode || '');
  const [isRunning, setIsRunning] = useState(false);
  const [stdout, setStdout] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Trigger lazy load of pyodide worker
    initPyodide();
    setIsReady(true);
  }, []);

  const handleRun = async () => {
    if (!code.trim()) return;
    setIsRunning(true);
    setStdout('');
    setErrorMsg('');

    try {
      const result = await runPythonCode(code, exercise.checkScript);
      setStdout(result.stdout);
      
      if (result.error) {
        // Python execution error
        setErrorMsg(result.error);
        onCodeRunResult(false, "Код завершился с ошибкой:\n" + result.error);
      } else {
        // Check script or expected stdout
        let isCorrect = true;
        let failReason = exercise.explanationOnFail ? t(exercise.explanationOnFail, language) : (language === 'ky' ? "Натыйжа күтүлгөндөй эмес." : "Результат не совпадает с ожидаемым.");

        if (exercise.checkScript) {
          isCorrect = !!result.checkSuccess;
          if (!isCorrect && result.checkError) {
            failReason += "\n" + (language === 'ky' ? "Толук: " : "Детали: ") + result.checkError;
          }
        } else if (exercise.expectedStdout !== undefined) {
          const expected = exercise.expectedStdout.trim();
          const actual = result.stdout.trim();
          if (expected !== actual) {
            isCorrect = false;
            failReason = exercise.explanationOnFail ? t(exercise.explanationOnFail, language) : (language === 'ky' ? `Күтүлгөн: ${expected}\nАлынган: ${actual}` : `Ожидалось: ${expected}\nПолучено: ${actual}`);
          }
        }

        onCodeRunResult(isCorrect, isCorrect ? (exercise.explanationOnSuccess ? t(exercise.explanationOnSuccess, language) : (language === 'ky' ? "Азаматсыз!" : "Отлично!")) : failReason);
      }
    } catch (e: any) {
      setErrorMsg(e.message);
      onCodeRunResult(false, e.message);
    } finally {
      setIsRunning(false);
      onChange(code); // Update parent's saved answer with the run code
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.prompt}>{t(exercise.prompt as any, language)}</p>
      
      <div className={styles.editorWrapper}>
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={c => highlight(c, languages.python, 'python')}
          padding={16}
          className={styles.editor}
          textareaClassName={styles.textarea}
          style={{
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: 16,
          }}
        />
      </div>

      <div className={styles.actions}>
        <button 
          className={styles.runBtn} 
          onClick={handleRun} 
          disabled={isRunning || !code.trim()}
        >
          {isRunning ? <Loader2 className={styles.spin} size={18} /> : <Play size={18} />}
          <span>{isRunning ? (language === 'ru' ? 'Выполняется...' : 'Аткарылууда...') : tUi('runAndCheck', language)}</span>
        </button>
      </div>

      {(stdout || errorMsg) && (
        <div className={styles.outputArea}>
          <div className={styles.outputHeader}>{tUi('output', language)}</div>
          {stdout && <pre className={styles.stdout}>{stdout}</pre>}
          {errorMsg && <pre className={styles.stderr}>{errorMsg}</pre>}
        </div>
      )}
    </div>
  );
};
