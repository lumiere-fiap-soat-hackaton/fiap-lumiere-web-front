import styles from './ResultItem.module.css';

type Props = {
  records: {
    key: string;
    status: string;
    sourceFileName: string;
    resultFileKey: string;
  }[],
  onDownload: (fileKey: string[]) => void;
}

export const ResultItem = ({ records, onDownload }: Props) => {
  return records?.map((itemRecord) => (
    <div key={itemRecord.key}
         className={`${styles['result-item-wrapper']} ${itemRecord.status === 'FAILED' ? styles['failed'] : ''}`}>
      {itemRecord.sourceFileName} – {itemRecord.status}
      {itemRecord.status !== 'FAILED' && (
        <button
          className={styles['result-item-download-button']}
          onClick={() => onDownload([itemRecord.resultFileKey])}>Download
        </button>
      )}
    </div>
  ));
};