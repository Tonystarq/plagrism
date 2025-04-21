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
  Button,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Description as FileIcon,
  ClearAll as ClearAllIcon,
  PictureAsPdf as PdfIcon,
  Article as ArticleIcon,
  TextSnippet as TxtIcon,
} from '@mui/icons-material';

const FileList = ({ files, onRemoveFile, onClearAll, isLoading }) => {

  const getFileType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    return extension;
  };

  const getFileIcon = (fileName) => {
    const extension = getFileType(fileName);
    switch (extension) {
      case 'pdf':
        return <PdfIcon sx={{ color: 'error.main' }} />;
      case 'doc':
      case 'docx':
        return <ArticleIcon sx={{ color: 'info.main' }} />;
      case 'txt':
        return <TxtIcon sx={{ color: 'success.main' }} />;
      default:
        return <FileIcon sx={{ color: 'primary.main' }} />;
    }
  };

  return (
    <Box id="compare" sx={{ mb: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2 
      }}>
        <Typography variant="h5" sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          color: 'primary.main',
          fontWeight: 'bold',
        }}>
          <FileIcon sx={{ 
            fontSize: 32,
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.1)' },
              '100%': { transform: 'scale(1)' },
            }
          }} />
          Uploaded Files
        </Typography>
        {files.length > 0 && (
          <Tooltip title={isLoading ? "Cannot clear files while comparing" : "Clear all files"}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<ClearAllIcon />}
              onClick={onClearAll}
              size="small"
              disabled={isLoading}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: (theme) => `0 4px 8px ${theme.palette.error.main}40`,
                },
                '&:disabled': {
                  bgcolor: 'grey.300',
                  color: 'grey.500',
                  boxShadow: 'none',
                }
              }}
            >
              Clear All
            </Button>
          </Tooltip>
        )}
      </Box>
      <TableContainer 
        component={Paper} 
        elevation={2}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          '& .MuiTableRow-root': {
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.01)',
              boxShadow: (theme) => `0 0 10px ${theme.palette.divider}`,
              backgroundColor: (theme) => theme.palette.action.hover,
            },
          },
        }}
      >
        <Table>
          <TableBody>
            {files.map((file, index) => (
              <TableRow
                key={index}
                sx={{
                  borderLeft: '4px solid',
                  borderColor: (theme) => theme.palette.primary.main,
                }}
              >
                <TableCell>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    '& .MuiSvgIcon-root': {
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.2) rotate(10deg)',
                      }
                    }
                  }}>
                    {getFileIcon(file.name)}
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 'medium',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: 'primary.main',
                        }
                      }}
                    >
                      {file.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getFileType(file.name)}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        backgroundColor: (theme) => theme.palette.primary.light,
                      }
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title={isLoading ? "Cannot delete file while comparing" : "Remove file"}>
                    <IconButton
                      onClick={() => {
                        onRemoveFile(index);
                      }}
                      color="error"
                      size="small"
                      disabled={isLoading}
                      sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.2)',
                          backgroundColor: (theme) => theme.palette.error.light + '20',
                        },
                        '&:disabled': {
                          bgcolor: 'grey.300',
                          color: 'grey.500',
                        }
                      }}
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