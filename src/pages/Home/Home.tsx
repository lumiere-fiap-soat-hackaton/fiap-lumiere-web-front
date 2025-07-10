import { useFileDownload, useFileUpload, useUserRecords } from '@/modules/application/hooks';
import { QueueItem, ResultItem, UploadZone } from '@/modules/application/components';
import styles from './Home.module.css';

export const Home = () => {
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

  return (
    <div className={styles.dashboard_page_content_wrapper}>
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
  );
};
