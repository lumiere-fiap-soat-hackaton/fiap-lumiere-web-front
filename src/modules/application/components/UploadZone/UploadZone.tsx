import { type ChangeEvent, useRef } from 'react';
import styles from './UploadZone.module.css';

type TProps = {
  onUpload: (files: FileList) => void;
}

export const UploadZone = ({ onUpload }: TProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(e.target.files);
    }
  };

  return (
    <div className={styles['upload-zone-wrapper']} onClick={handleClick}>
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        multiple
        hidden
        onChange={handleFileChange}
      />
      <p>📤 Click here to send your videos</p>
    </div>
  );
};