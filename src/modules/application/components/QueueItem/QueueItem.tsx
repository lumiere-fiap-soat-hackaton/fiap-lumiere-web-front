import styles from './QueueItem.module.css';

type TProps = {
  records: {
    key: string;
    fileName: string;
    progress: number;
  }[];
}

export const QueueItem = ({ records }: TProps) => {
  return records?.map((itemRecord) => (
    <div key={itemRecord.key} className={styles['queue-item-wrapper']}>
      <span>{itemRecord.fileName}</span>
      <div className={styles['bar']}>
        <div className={styles['fill']} style={{ width: `${itemRecord.progress}%` }} />
      </div>
      <span>{itemRecord.progress}%</span>
    </div>
  ));
};