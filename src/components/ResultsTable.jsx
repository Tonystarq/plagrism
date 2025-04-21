import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  ClearAll as ClearAllIcon,
  Description as DescriptionIcon,
  Score as ScoreIcon,
  CheckCircle as StatusIcon,
  MoreVert as ActionsIcon,
} from '@mui/icons-material';

const ResultsTable = ({ results, onClearTable, onDeleteRow }) => {
  console.log('ResultsTable: Rendering results', results);

  const getSimilarityColor = (score) => {
    const normalizedScore = parseFloat(score);
    if (normalizedScore < 0.3) return 'success';
    if (normalizedScore < 0.7) return 'warning';
    return 'error';
  };

  const getStatusColor = (score) => {
    const normalizedScore = parseFloat(score);
    if (normalizedScore < 0.3) return 'success';
    if (normalizedScore < 0.7) return 'warning';
    return 'error';
  };

  const getStatusText = (score) => {
    const normalizedScore = parseFloat(score);
    if (normalizedScore < 0.3) return 'Low Similarity';
    if (normalizedScore < 0.7) return 'Moderate Similarity';
    return 'High Similarity';
  };

  const formatSimilarityScore = (score) => {
    return (parseFloat(score) * 100).toFixed(2);
  };

  if (!results || results.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Comparison Results
        </Typography>
        <Tooltip title="Clear all results">
          <Button
            variant="outlined"
            color="error"
            startIcon={<ClearAllIcon />}
            onClick={onClearTable}
            size="small"
          >
            Clear Table
          </Button>
        </Tooltip>
      </Box>
      <TableContainer 
        component={Paper} 
        elevation={2}
        sx={{
          overflowX: 'hidden',
          '& .MuiTableRow-root': {
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.01)',
              boxShadow: (theme) => `0 0 10px ${theme.palette.divider}`,
            },
          },
          '& .MuiTableHead-root': {
            '& .MuiTableRow-root': {
              bgcolor: (theme) => theme.palette.mode === 'dark' 
                ? theme.palette.grey[900] 
                : theme.palette.grey[100],
              '& .MuiTableCell-root': {
                borderBottom: (theme) => `2px solid ${theme.palette.divider}`,
                py: 2,
              }
            }
          }
        }}
      >
        <Table sx={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '30%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DescriptionIcon color="primary" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                    Document 1
                  </Typography>
                </Box>
              </TableCell>
              <TableCell sx={{ width: '30%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DescriptionIcon color="primary" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                    Document 2
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ width: '15%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <ScoreIcon color="primary" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                    Similarity
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ width: '15%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <StatusIcon color="primary" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                    Status
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ width: '10%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <ActionsIcon color="primary" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                    Actions
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result, index) => {
              const color = getSimilarityColor(result.similarity);
              return (
                <TableRow 
                  key={index}
                  sx={{
                    borderLeft: (theme) => `4px solid ${theme.palette[color].main}`,
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette[color].light + '10',
                    },
                  }}
                >
                  <TableCell sx={{ width: '30%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <DescriptionIcon 
                        sx={{ 
                          color: (theme) => theme.palette[color].main,
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.2)',
                          },
                        }} 
                      />
                      <Typography variant="body2" noWrap>
                        {result.file1 || result.doc1}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ width: '30%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <DescriptionIcon 
                        sx={{ 
                          color: (theme) => theme.palette[color].main,
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.2)',
                          },
                        }} 
                      />
                      <Typography variant="body2" noWrap>
                        {result.file2 || result.doc2}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell 
                    align="center"
                    sx={{ 
                      width: '15%',
                      color: (theme) => theme.palette[color].main,
                      fontWeight: 'bold',
                    }}
                  >
                    {formatSimilarityScore(result.similarity)}%
                  </TableCell>
                  <TableCell align="center" sx={{ width: '15%' }}>
                    <Chip
                      label={getStatusText(result.similarity)}
                      color={getStatusColor(result.similarity)}
                      size="small"
                      sx={{
                        minWidth: 120,
                        fontWeight: 'medium',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ width: '10%' }}>
                    <Tooltip title="Delete row">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDeleteRow(index)}
                        sx={{
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.2)',
                            backgroundColor: (theme) => theme.palette.error.light + '20',
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ResultsTable; 