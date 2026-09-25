import React from 'react';
import { TheoryBlockData } from '@/types/lesson';
import styles from './TheoryBlock.module.scss';
import { Lightbulb } from 'lucide-react';

interface TheoryBlockProps {
  data: TheoryBlockData;
}

export const TheoryBlock: React.FC<TheoryBlockProps> = ({ data }) => {
  return (
    <div className={styles.theoryBlock}>
      <div 
        className={styles.content} 
        dangerouslySetInnerHTML={{ __html: data.content }} 
      />
      
      {data.analogy && (
        <div className={styles.analogy}>
          <div className={styles.analogyHeader}>
            <Lightbulb className={styles.icon} size={20} />
            <span>Аналогия из жизни</span>
          </div>
          <h4>{data.analogy.title}</h4>
          <p>{data.analogy.content}</p>
        </div>
      )}
    </div>
  );
};
