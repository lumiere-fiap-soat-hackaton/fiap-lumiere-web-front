import { useNavigate } from 'react-router';
import { AlertCircle, CheckCircle, Clock, Upload, XCircle } from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext.tsx';
import { type RecordItemStatus } from '@/modules/application/providers/RecordsProvider.tsx';
import { useRecordsContext } from '@/modules/application/hooks/userRecordsContext';
import { UserRecord } from '@/modules/application/components/UserRecord';
import Button from '@/components/button/Button.tsx';
import styles from './Dashboard.module.css';

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
  const { user } = useAuth();
  const { files } = useRecordsContext();

  /*
    const { execute: handleUpload } = useFileUpload();
    const { execute: handleDownload } = useFileDownload();

    const {
      data: queued,
      isLoading: loadingPendingRecords,
      error: pendingRecordsError,
    } = useUserRecords({
      statuses: ['PENDING'],
      refetchInterval: 0,
    });

    const {
      data: finished,
      isLoading: loadingCompletedRecords,
      error: completedRecordsError,
    } = useUserRecords({
      statuses: ['COMPLETED', 'FAILED'],
      refetchInterval: 0,
    });

    const pendingRecords = queued?.map((r) => ({
      key: r.id,
      fileName: r.sourceFileName,
      progress: 50,
    })) ?? [];

    const completedRecords = finished?.map((r) => ({
      key: r.id,
      status: r.status,
      sourceFileName: r.sourceFileName,
      resultFileKey: r.resultFileKey ?? '',
    })) ?? [];
  */
  const getVideosByStatus = (status: RecordItemStatus) => {
    return files.filter(video => video.status === status);
  };

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
          const statusVideos = getVideosByStatus(status as RecordItemStatus);

          return (
            <UserRecord key={status} statusVideos={statusVideos} config={config} status={status as RecordItemStatus} />
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
