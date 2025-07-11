import React from 'react';
import { Download } from 'lucide-react';

import styles from './UserRecord.module.css';
import Button from '@/components/button/Button';
import { type RecordItem, type RecordItemStatus } from '@/modules/application/providers/RecordsProvider.tsx';
import { useRecordsContext } from '@/modules/application/hooks/userRecordsContext';

type recordConfig = {
  icon: React.ComponentType;
  text: string;
  emoji: string;
}

type Props = {
  config: recordConfig;
  status: RecordItemStatus;
  statusVideos: RecordItem[];
}

export const UserRecord = ({ config, statusVideos, status }: Props) => {
  const { downloadFile } = useRecordsContext();

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
            {statusVideos.length}
        </span>
      </div>

      {statusVideos.length === 0 ? (
        <div className={styles.emptyState}>
          <config.icon />
          <p>Nenhum vídeo {config.text.toLowerCase()}</p>
        </div>
      ) : (
        <div className={styles.videosList}>
          {statusVideos.map((video) => (
            <div key={video.id} className={styles.videoItem}>
              <div className={styles.videoContent}>
                <div className={styles.videoInfo}>
                  <h3>{video.filename}</h3>
                  <p>
                    Enviado em {formatDate(video.uploadedAt)}
                    {video.completedAt && (<> • Finalizado em {formatDate(video.completedAt)}</>)}
                  </p>
                </div>
                <div className={styles.videoActions}>
                  {video.status === 'COMPLETED' && (
                    <Button variant="secondary" size="sm" onClick={() => downloadFile(video.id)}>
                      <Download size={18} className="w-4 h-4" />
                      <span>Download</span>
                    </Button>
                  )}

                  <div className={`${styles.statusIcon} ${styles[status.toLowerCase()]}`}>
                    <config.icon />
                  </div>
                </div>
              </div>
              {(video.status === 'IN_PROGRESS') && (
                <>
                  <div className={styles.progressSection}>
                    <div className={styles.progressHeader}>
                      <span className={styles.label}>Progresso</span>
                      <span className={styles.value}>{Math.round(video.progress)}%</span>
                    </div>
                  </div>

                  <div className={styles.progressBar}>
                    <div
                      className={`${styles.progressFill} ${styles[video.status === 'IN_PROGRESS' ? 'in_progress' : 'pending']}`}
                      style={{ width: `${video.progress}%` }}
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
