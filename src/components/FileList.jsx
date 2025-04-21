import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Description as FileIcon,
} from '@mui/icons-material';

const FileList = ({ files, onRemoveFile }) => {
  console.log('FileList: Rendering with files', files);

  const getFileType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    return extension;
  };

  return (
    <Box id="compare" sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Uploaded Files
      </Typography>
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableBody>
            {files.map((file, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FileIcon color="primary" />
                    <Typography variant="body1">{file.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getFileType(file.name)}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Remove file">
                    <IconButton
                      onClick={() => {
                        console.log('FileList: Removing file', file.name);
                        onRemoveFile(index);
                      }}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FileList; 