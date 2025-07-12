import React from 'react';
import { Download } from 'lucide-react';

import styles from './UserRecord.module.css';
import Button from '@/components/button/Button';
import { useRecordsContext } from '@/modules/application/providers/useRecordsContext.ts';
import type { RecordItem, RecordItemStatus } from '@/modules/application/types.ts';

type recordConfig = {
  icon: React.ComponentType;
  text: string;
  emoji: string;
}

type Props = {
  config: recordConfig;
  status: RecordItemStatus;
  recordsList: RecordItem[];
}

export const UserRecord = ({ config, recordsList, status }: Props) => {
  const { downloadFiles } = useRecordsContext();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className={styles.statusSection}>
      <div className={styles.statusHeader}>
        <span className={styles.emoji}>{config.emoji}</span>
        <h2>{config.text}</h2>
        <span className={`${styles.statusBadge} ${styles[status.toLowerCase()]}`}>
            {recordsList.length}
        </span>
      </div>

      {recordsList.length === 0 ? (
        <div className={styles.emptyState}>
          <config.icon />
          <p>Nenhum vídeo {config.text.toLowerCase()}</p>
        </div>
      ) : (
        <div className={styles.videosList}>
          {recordsList.map((recordItem) => (
            <div key={recordItem.id} className={styles.videoItem}>
              <div className={styles.videoContent}>
                <div className={styles.videoInfo}>
                  <h3>{recordItem.sourceFileName}</h3>
                  <p>
                    {recordItem.createdAt && (<>Enviado em {formatDate(recordItem.createdAt)}</>)}
                    {recordItem.updatedAt && (<> • Finalizado em {formatDate(recordItem.updatedAt)}</>)}
                  </p>
                </div>
                <div className={styles.videoActions}>
                  {recordItem.status === 'COMPLETED' && (
                    <Button variant="secondary" size="sm" onClick={() => downloadFiles([recordItem.id])}>
                      <Download size={18} className="w-4 h-4" />
                      <span>Download</span>
                    </Button>
                  )}

                  <div className={`${styles.statusIcon} ${styles[status.toLowerCase()]}`}>
                    <config.icon />
                  </div>
                </div>
              </div>
              {(recordItem.status === 'IN_PROGRESS') && (
                <>
                  <div className={styles.progressSection}>
                    <div className={styles.progressHeader}>
                      <span className={styles.label}>Progresso</span>
                      <span className={styles.value}>{Math.round(recordItem.progress)}%</span>
                    </div>
                  </div>

                  <div className={styles.progressBar}>
                    <div
                      className={`${styles.progressFill} ${styles[recordItem.status === 'IN_PROGRESS' ? 'in_progress' : 'pending']}`}
                      style={{ width: `${recordItem.progress ?? 100}%` }}
                    ></div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
