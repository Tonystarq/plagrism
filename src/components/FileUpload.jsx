import React from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { CloudUpload as UploadIcon } from '@mui/icons-material';

const FileUpload = ({ onFilesUploaded, isLoading }) => {
  const onDrop = (acceptedFiles) => {
    console.log('FileUpload: Files dropped', acceptedFiles);
    const newFiles = acceptedFiles.map(file => ({
      file,
      name: file.name,
      content: null
    }));
    
    // Read file contents
    newFiles.forEach(fileObj => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        console.log('FileUpload: File content read', { name: fileObj.name, contentLength: content.length });
        onFilesUploaded(prev => prev.map(f => 
          f.file === fileObj.file ? { ...f, content } : f
        ));
      };
      reader.readAsText(fileObj.file);
    });
    
    onFilesUploaded(prev => [...prev, ...newFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    disabled: isLoading
  });

  return (
    <Box id="upload" sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Upload Documents
      </Typography>
      <Paper
        {...getRootProps()}
        sx={{
          p: 4,
          textAlign: 'center',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'text.secondary',
          bgcolor: isDragActive ? 'action.hover' : 'background.paper',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'action.hover',
          },
        }}
      >
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <UploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />
              {isDragActive ? (
                <Typography variant="h6">Drop the files here ...</Typography>
              ) : (
                <>
                  <Typography variant="h6">Drag & drop files here</Typography>
                  <Typography variant="body2" color="text.secondary">
                    or
                  </Typography>
                  <Button variant="contained" component="span">
                    Select Files
                  </Button>
                </>
              )}
            </>
          )}
        </Box>
      </Paper>
      <Alert severity="info" sx={{ mt: 2 }}>
        Supported file types: .txt, .pdf, .doc, .docx
      </Alert>
    </Box>
  );
};

export default FileUpload; 