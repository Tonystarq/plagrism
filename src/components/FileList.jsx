import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FileList = ({ files, onRemoveFile }) => {
  console.log('FileList: Rendering with files', files);

  return (
    <Box className="mt-4">
      <Typography variant="h6" gutterBottom>
        Uploaded Files
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {files.map((file, index) => (
              <TableRow key={index}>
                <TableCell>{file.name}</TableCell>
                <TableCell align="right">
                  <IconButton 
                    onClick={() => {
                      console.log('FileList: Removing file', file.name);
                      onRemoveFile(index);
                    }} 
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
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