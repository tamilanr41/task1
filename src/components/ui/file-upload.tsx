'use client';
import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, File, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilePreview {
  file: File;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
  error?: string;
}

interface FileUploadProps {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  className?: string;
}

const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const FileUpload: React.FC<FileUploadProps> = ({
  onFiles, accept, multiple = true, maxSize = 10 * 1024 * 1024, maxFiles = 10, disabled, className
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<FilePreview[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const simulateProgress = (fileId: number) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => prev.map((f, i) => i === fileId ? { ...f, progress: 100, status: 'complete' } : f));
        return;
      }
      setFiles(prev => prev.map((f, i) => i === fileId ? { ...f, progress: Math.min(progress, 100), status: 'uploading' } : f));
    }, 300);
    return interval;
  };

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const validFiles: File[] = [];

    fileArray.forEach((file) => {
      if (maxSize && file.size > maxSize) {
        setFiles(prev => [...prev, { file, progress: 100, status: 'error', error: `File exceeds ${formatSize(maxSize)}` }]);
        return;
      }
      if (files.length + validFiles.length >= maxFiles) return;
      validFiles.push(file);
    });

    if (validFiles.length === 0) return;

    const newPreviews: FilePreview[] = validFiles.map(file => ({ file, progress: 0, status: 'uploading' }));
    setFiles(prev => [...prev, ...newPreviews]);
    onFiles(validFiles);

    newPreviews.forEach((_, idx) => {
      simulateProgress(files.length + idx);
    });
  }, [maxSize, maxFiles, files.length, onFiles]);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    addFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  return (
    <div className={cn('w-full', className)}>
      <motion.div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && inputRef.current?.click()}
        animate={dragOver ? { borderColor: '#1a365d', backgroundColor: 'rgba(26, 54, 93, 0.03)' } : { borderColor: '#e4e7f0', backgroundColor: 'rgba(0,0,0,0)' }}
        transition={{ duration: 0.2 }}
        className={cn(
          'relative flex flex-col items-center justify-center gap-3 px-6 py-10 rounded-2xl border-2 border-dashed transition-colors cursor-pointer',
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary-300 hover:bg-primary-50/30'
        )}
      >
        <motion.div
          animate={dragOver ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="w-14 h-14 rounded-2xl bg-surface-100 flex items-center justify-center"
        >
          <Upload className="w-6 h-6 text-surface-400" />
        </motion.div>
        <div className="text-center">
          <p className="text-sm font-medium text-surface-700">
            <span className="text-primary-500">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-surface-400 mt-1">
            {accept ? `Accepted: ${accept}` : 'Any file type'} &middot; Max {formatSize(maxSize)}
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ''; }}
          className="hidden"
          aria-label="Upload files"
        />
      </motion.div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2"
          >
            {files.map((filePreview, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-surface-100 shadow-soft"
              >
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                  filePreview.status === 'complete' ? 'bg-success-50' : filePreview.status === 'error' ? 'bg-danger-50' : 'bg-surface-100'
                )}>
                  {filePreview.status === 'complete' ? (
                    <CheckCircle className="w-4 h-4 text-success-500" />
                  ) : filePreview.status === 'error' ? (
                    <AlertCircle className="w-4 h-4 text-danger-500" />
                  ) : (
                    <File className="w-4 h-4 text-primary-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-surface-700 truncate">{filePreview.file.name}</p>
                  <p className="text-2xs text-surface-400">{formatSize(filePreview.file.size)}</p>
                  {filePreview.status === 'uploading' && (
                    <div className="mt-1.5 h-1 bg-surface-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${filePreview.progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                  )}
                  {filePreview.error && <p className="text-2xs text-danger-500 mt-0.5">{filePreview.error}</p>}
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                  className="shrink-0 p-1 rounded-lg text-surface-400 hover:text-surface-700 hover:bg-surface-100 transition-colors focus:outline-none"
                  aria-label={`Remove ${filePreview.file.name}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { FileUpload, type FileUploadProps };
