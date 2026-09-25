import React from 'react';
import styles from './ComparisonTable.module.scss';

interface Props {
  headers: string[];
  rows: string[][];
}

export const ComparisonTable: React.FC<Props> = ({ headers, rows }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((h, i) => <th key={i}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => <td key={j} dangerouslySetInnerHTML={{ __html: cell }} />)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
