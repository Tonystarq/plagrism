import React from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Description as DocIcon,
  PictureAsPdf as PdfIcon,
  Article as ArticleIcon,
} from '@mui/icons-material';

const FileUpload = ({ onFilesUploaded, isLoading }) => {
  const onDrop = (acceptedFiles) => {
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
      <Typography variant="h5" gutterBottom sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        color: 'primary.main',
        fontWeight: 'bold',
      }}>
        <UploadIcon sx={{ 
          fontSize: 32,
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.1)' },
            '100%': { transform: 'scale(1)' },
          }
        }} />
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
          transition: 'all 0.3s ease-in-out',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'action.hover',
            transform: 'translateY(-2px)',
            boxShadow: (theme) => `0 8px 16px ${theme.palette.divider}`,
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.light}20, ${theme.palette.secondary.light}20)`,
            opacity: isDragActive ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }
        }}
      >
        <input {...getInputProps()} />
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 2,
          position: 'relative',
          zIndex: 1,
        }}>
          {isLoading ? (
            <CircularProgress 
              size={48} 
              sx={{ 
                color: 'primary.main',
                animation: 'spin 2s linear infinite',
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                }
              }} 
            />
          ) : (
            <>
              <Box sx={{ 
                display: 'flex', 
                gap: 2,
                mb: 2,
                '& .MuiSvgIcon-root': {
                  fontSize: 48,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.2) rotate(10deg)',
                  }
                }
              }}>
                <DocIcon sx={{ color: 'info.main' }} />
                <PdfIcon sx={{ color: 'error.main' }} />
                <ArticleIcon sx={{ color: 'success.main' }} />
              </Box>
              {isDragActive ? (
                <Typography variant="h6" sx={{ 
                  color: 'primary.main',
                  animation: 'bounce 1s infinite',
                  '@keyframes bounce': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                  }
                }}>
                  Drop the files here ...
                </Typography>
              ) : (
                <>
                  <Typography variant="h6" sx={{ 
                    color: 'text.primary',
                    fontWeight: 'medium',
                  }}>
                    Drag & drop files here
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    or
                  </Typography>
                  <Button 
                    variant="contained" 
                    component="span"
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      px: 4,
                      py: 1,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      boxShadow: (theme) => `0 4px 8px ${theme.palette.primary.main}40`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: (theme) => `0 6px 12px ${theme.palette.primary.main}60`,
                        bgcolor: 'primary.dark',
                      }
                    }}
                  >
                    Select Files
                  </Button>
                </>
              )}
            </>
          )}
        </Box>
      </Paper>
      <Alert 
        severity="info" 
        sx={{ 
          mt: 2,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'info.light',
          bgcolor: 'info.light',
          '& .MuiAlert-icon': {
            color: 'info.main',
          }
        }}
      >
        Supported file types: .txt, .pdf, .doc, .docx
      </Alert>
    </Box>
  );
};

export default FileUpload; 