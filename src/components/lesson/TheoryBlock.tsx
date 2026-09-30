import React from 'react';
import { TheoryBlockData } from '@/types/lesson';
import styles from './TheoryBlock.module.scss';
import { Lightbulb } from 'lucide-react';
import { t, tUi } from '@/lib/i18n';
import { Language } from '@/contexts/LanguageContext';

interface TheoryBlockProps {
  data: TheoryBlockData;
  language: Language;
}

export const TheoryBlock: React.FC<TheoryBlockProps> = ({ data, language }) => {
  return (
    <div className={styles.theoryBlock}>
      <div 
        className={styles.content} 
        dangerouslySetInnerHTML={{ __html: t(data.content, language) }} 
      />
      
      {data.analogy && (
        <div className={styles.analogy}>
          <div className={styles.analogyHeader}>
            <Lightbulb className={styles.icon} size={20} />
            <span>{tUi('analogy', language)}</span>
          </div>
          <h4>{t(data.analogy.title, language)}</h4>
          <p>{t(data.analogy.content, language)}</p>
        </div>
      )}
    </div>
  );
};
