import { useState } from 'react';
import './App.css';

export default function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Validate File size & type
  const validateAndSetFile = (selectedFile) => {
    setError('');
    setSuccess('');
    setUploadedFileUrl(null);

    if (!selectedFile) return;

    // Allowed extensions
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Please select a valid image file (PNG, JPG, WEBP, GIF)');
      return;
    }

    // Max Size: 5MB
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size exceeds the maximum limit of 5MB');
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/api/upload');

    // Progress bar tracking
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setProgress(percent);
      }
    };

    xhr.onload = () => {
      setUploading(false);
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);
        setSuccess('File uploaded successfully!');
        setUploadedFileUrl(res.file.url);
        setFile(null);
      } else {
        setError('Upload failed. Please try again.');
      }
    };

    xhr.onerror = () => {
      setUploading(false);
      setError('Network error: Unable to connect to server.');
    };

    xhr.send(formData);
  };

  return (
    <div className="upload-card">
      <h2 className="title">📤 File Upload Interface</h2>
      <p className="subtitle">Upload your images with real-time progress</p>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Drag & Drop Area */}
      <div
        className={`dropzone ${isDragging ? 'active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <div className="dropzone-icon">📁</div>
        <p>
          Drag & Drop your image here, or{' '}
          <span className="browse-btn">Browse</span>
        </p>

        <input
          id="fileInput"
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileSelect}
        />
      </div>

      {/* Preview Section */}
      {preview && !uploadedFileUrl && (
        <div className="preview-container">
          <strong>Selected File Preview:</strong>
          <img src={preview} alt="Preview" className="preview-image" />
        </div>
      )}

      {/* Upload Progress Bar */}
      {uploading && (
        <div className="progress-box">
          <small>Uploading... {progress}%</small>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Successfully Uploaded Image Display */}
      {uploadedFileUrl && (
        <div className="preview-container">
          <strong>Uploaded File (Backend Storage):</strong>
          <img src={uploadedFileUrl} alt="Uploaded" className="preview-image" />
          <p style={{ marginTop: '8px', fontSize: '0.85rem' }}>
            <a href={uploadedFileUrl} target="_blank" rel="noreferrer">
              🔗 View File URL
            </a>
          </p>
        </div>
      )}

      <button
        className="upload-btn"
        disabled={!file || uploading}
        onClick={handleUpload}
      >
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>
    </div>
  );
}