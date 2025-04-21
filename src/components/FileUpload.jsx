import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Paper, Typography } from '@mui/material';

const FileUpload = ({ onFilesUploaded }) => {
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
    }
  });

  return (
    <Paper
      {...getRootProps()}
      className="p-8 text-center cursor-pointer border-2 border-dashed rounded-lg"
      sx={{
        borderColor: isDragActive ? 'primary.main' : 'text.secondary',
        bgcolor: isDragActive ? 'action.hover' : 'background.paper',
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography>Drop the files here ...</Typography>
      ) : (
        <Typography>Drag & drop files here, or click to select files</Typography>
      )}
    </Paper>
  );
};

export default FileUpload; 