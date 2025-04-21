import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, LinearProgress } from '@mui/material';

const ResultsTable = ({ results }) => {
  console.log('ResultsTable: Rendering with results', results);

  return (
    <Box className="mt-4">
      <Typography variant="h6" gutterBottom>
        Similarity Results
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Document 1</TableCell>
              <TableCell>Document 2</TableCell>
              <TableCell>Similarity Score</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result, index) => (
              <TableRow key={index}>
                <TableCell>{result.file1}</TableCell>
                <TableCell>{result.file2}</TableCell>
                <TableCell>
                  <Box className="flex items-center gap-1">
                    <Box className="w-full mr-1">
                      <LinearProgress
                        variant="determinate"
                        value={result.similarity * 100}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {(result.similarity * 100).toFixed(2)}%
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="success.main">
                    {result.message}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ResultsTable; 