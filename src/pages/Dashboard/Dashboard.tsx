import { useNavigate } from 'react-router';
import { AlertCircle, CheckCircle, Clock, Upload, XCircle } from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext.tsx';
import { UserRecord } from '@/modules/application/components/UserRecord';
import Button from '@/components/button/Button.tsx';
import { useRecordsContext } from '@/modules/application/providers/useRecordsContext.ts';
import styles from './Dashboard.module.css';
import type { RecordItemStatus } from '@/modules/application/types.ts';

const statusConfig = {
  PENDING: {
    icon: Clock,
    text: 'Na fila',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    emoji: '🟡',
  },
  IN_PROGRESS: {
    icon: AlertCircle,
    text: 'Processando',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    emoji: '🟠',
  },
  COMPLETED: {
    icon: CheckCircle,
    text: 'Finalizado',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    emoji: '🟢',
  },
  FAILED: {
    icon: XCircle,
    text: 'Falhou',
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
    emoji: '🔴',
  },
};

export const Dashboard = () => {
  const navigate = useNavigate();

  const { recordsList } = useRecordsContext();
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Olá, <span className={styles.userName}>{user?.email}</span></h1>
          <p>Gerencie seus vídeos e acompanhe o processamento</p>
        </div>

        <div className={styles.headerActions}>
          <Button onClick={() => navigate('/upload')} size="lg" className={styles.uploadButton}>
            <Upload className="w-5 h-5" />
            <span>Fazer Upload</span>
          </Button>
        </div>
      </div>

      <div className={styles.grid}>
        {Object.entries(statusConfig).map(([status, config]) => {

          return (
            <UserRecord key={status} recordsList={recordsList} config={config} status={status as RecordItemStatus} />
          );
        })}
      </div>
    </div>
  );
};

/*
* <div className={styles.dashboard_page_content_wrapper}>q
      <UploadZone onUpload={handleUpload} />

      <div className={styles.queue_wrapper}>
        <h3>In progress processing files:</h3>
        {!loadingPendingRecords && !pendingRecordsError && (
          <QueueItem records={pendingRecords} />
        )}
      </div>

      <div className={styles.result_wrapper}>
        <h3>Available processed files:</h3>
        {!loadingCompletedRecords && !completedRecordsError && (
          <ResultItem
            records={completedRecords}
            onDownload={handleDownload}
          />
        )}
      </div>
    </div>
* */

/*
application/x-troff-msvideo
video/avi
video/msvideo
video/x-msvideo
 */