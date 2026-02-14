import { useState } from 'react';

interface FileUploadProps {
  bucket?: string;
  onUploadSuccess?: (url: string, filename: string) => void;
  onUploadError?: (error: string) => void;
  maxSize?: number; // in MB, default 100
  accept?: string;
}

export const FileUpload = ({
  bucket = 'documents',
  onUploadSuccess,
  onUploadError,
  maxSize = 100,
  accept = '.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png'
}: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validate file size
    const maxBytes = maxSize * 1024 * 1024;
    if (file.size > maxBytes) {
      const errorMsg = `File size exceeds ${maxSize}MB limit`;
      setError(errorMsg);
      onUploadError?.(errorMsg);
      return;
    }

    // Validate file type
    if (!file.type && !accept.includes('*')) {
      const errorMsg = 'Invalid file type';
      setError(errorMsg);
      onUploadError?.(errorMsg);
      return;
    }

    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket', bucket);

      // Get token from localStorage or your auth context
      const token = localStorage.getItem('token');

      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setProgress(percentComplete);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          if (response.success) {
            onUploadSuccess?.(response.url, file.name);
            setProgress(100);
          } else {
            setError(response.error || 'Upload failed');
            onUploadError?.(response.error || 'Upload failed');
          }
        } else {
          setError('Upload failed with status ' + xhr.status);
          onUploadError?.('Upload failed');
        }
        setUploading(false);
      });

      xhr.addEventListener('error', () => {
        setError('Network error during upload');
        onUploadError?.('Network error');
        setUploading(false);
      });

      xhr.open('POST', '/api/v1/storage/upload');
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.send(formData);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      onUploadError?.(errorMsg);
      setUploading(false);
    }
  };

  return (
    <div className="file-upload-container">
      <style>{`
        .file-upload-container {
          padding: 2rem;
          border: 2px dashed #ccc;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .file-upload-container:hover {
          border-color: #007bff;
          background-color: #f8f9ff;
        }

        .file-upload-container input[type="file"] {
          display: none;
        }

        .upload-label {
          cursor: pointer;
          display: block;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background-color: #e0e0e0;
          border-radius: 4px;
          margin-top: 1rem;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background-color: #28a745;
          transition: width 0.3s ease;
        }

        .error-message {
          color: #dc3545;
          margin-top: 0.5rem;
          font-size: 0.875rem;
        }

        .success-message {
          color: #28a745;
          margin-top: 0.5rem;
          font-size: 0.875rem;
        }

        .file-info {
          margin-top: 1rem;
          padding: 1rem;
          background-color: #f8f9fa;
          border-radius: 4px;
        }
      `}</style>

      <label htmlFor="file-input" className="upload-label">
        <div>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <p>
            {uploading
              ? `Uploading... ${Math.round(progress)}%`
              : 'Click to upload or drag and drop'}
          </p>
          <p style={{ fontSize: '0.875rem', color: '#666' }}>
            Max file size: {maxSize}MB
          </p>
        </div>
      </label>

      <input
        id="file-input"
        type="file"
        onChange={handleFileChange}
        disabled={uploading}
        accept={accept}
      />

      {uploading && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      {error && <div className="error-message">Error: {error}</div>}
    </div>
  );
};

// Hook para usar a API de storage
export const useFileUpload = () => {
  const deleteFile = async (bucket: string, fileKey: string): Promise<boolean> => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/v1/storage/delete?bucket=${bucket}&key=${fileKey}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Failed to delete file:', error);
      return false;
    }
  };

  const getFileUrl = async (bucket: string, fileKey: string): Promise<string | null> => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/v1/storage/url?bucket=${bucket}&key=${fileKey}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data.success ? data.url : null;
    } catch (error) {
      console.error('Failed to get file URL:', error);
      return null;
    }
  };

  return { deleteFile, getFileUrl };
};

// Exemplo de uso:
/*
import { FileUpload, useFileUpload } from './FileUpload';

export const DocumentUploadPage = () => {
  const { deleteFile } = useFileUpload();
  const [uploadedFile, setUploadedFile] = useState<{ url: string; name: string } | null>(null);

  const handleUploadSuccess = (url: string, filename: string) => {
    setUploadedFile({ url, name: filename });
    alert(`File uploaded: ${filename}`);
  };

  const handleDelete = async () => {
    if (uploadedFile) {
      const fileKey = uploadedFile.url.split('/').pop();
      if (fileKey && await deleteFile('documents', fileKey)) {
        setUploadedFile(null);
        alert('File deleted successfully');
      }
    }
  };

  return (
    <div>
      <h1>Upload Document</h1>
      <FileUpload 
        bucket="documents"
        onUploadSuccess={handleUploadSuccess}
        maxSize={100}
      />

      {uploadedFile && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Uploaded File</h3>
          <p>{uploadedFile.name}</p>
          <a href={uploadedFile.url} target="_blank" rel="noopener noreferrer">
            Download
          </a>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};
*/
