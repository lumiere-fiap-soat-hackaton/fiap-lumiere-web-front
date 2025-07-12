import React, { useRef, useState } from 'react';
import { ArrowLeft, FileVideo, Plus, Upload as UploadIcon, X } from 'lucide-react';
import styles from './Upload.module.css';
import { useNavigate } from 'react-router';
import Button from '@/components/button/Button.tsx';
import { useRecordsContext } from '@/modules/application/providers/useRecordsContext.ts';

export const Upload: React.FC = () => {
  const navigate = useNavigate();
  const { uploadFiles } = useRecordsContext();

  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith('video/'),
    );

    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);

    // Simular delay de upload
    await uploadFiles(files);

    setFiles([]);
    setIsUploading(false);
    navigate('/dashboard');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className={styles.backButton}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Dashboard</span>
          </Button>

          <h1>Upload de Vídeos</h1>
          <p>Selecione ou arraste seus vídeos para processamento</p>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.uploadSection}>
          <div
            className={`${styles.dropzone} ${isDragOver ? styles.dragOver : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className={styles.dropzoneContent}>
              <div className={styles.dropzoneIcon}>
                <UploadIcon />
              </div>

              <div className={styles.dropzoneText}>
                <h3>Solte seus vídeos aqui</h3>
                <p>Ou clique para selecionar arquivos</p>

                <Button
                  variant="secondary"
                  onClick={() => fileInputRef.current?.click()}
                  className={styles.selectButton}
                >
                  <Plus className="w-4 h-4" />
                  <span>Selecionar Vídeos</span>
                </Button>
              </div>

              <p className={styles.supportedFormats}>
                Formatos suportados: MP4, MOV, AVI, MKV
              </p>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="video/*"
            onChange={handleFileSelect}
            className={styles.hiddenInput}
          />

          {files.length > 0 && (
            <Button
              onClick={handleUpload}
              loading={isUploading}
              size="lg"
              className={styles.uploadButton}
            >
              <UploadIcon />
              <span>Enviar {files.length} vídeo{files.length !== 1 ? 's' : ''}</span>
            </Button>
          )}
        </div>

        <div className={styles.filesSection}>
          <h2>Vídeos Selecionados</h2>

          {files.length === 0 ? (
            <div className={styles.emptyFiles}>
              <FileVideo />
              <p>Nenhum vídeo selecionado</p>
            </div>
          ) : (
            <div className={styles.filesList}>
              {files.map((file, index) => (
                <div key={index} className={styles.fileItem}>
                  <div className={styles.fileInfo}>
                    <div className={styles.fileIcon}>
                      <FileVideo />
                    </div>
                    <div className={styles.fileDetails}>
                      <h3>{file.name}</h3>
                      <p>{formatFileSize(file.size)}</p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className={styles.removeButton}
                  >
                    <X />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

