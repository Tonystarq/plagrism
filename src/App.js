import React, { useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';
import { Container, Box, Button, Typography, CircularProgress, Paper, LinearProgress } from '@mui/material';

import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import ResultsTable from './components/ResultsTable';
import Layout from './components/Layout';
import { compareDocuments, checkHealth } from './services/api';
import CompareIcon from '@mui/icons-material/Compare';

const AppContent = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState(null);
  const [comparisonProgress, setComparisonProgress] = useState(0);
  const [totalComparisons, setTotalComparisons] = useState(0);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const status = await checkHealth();
        setApiStatus(status);
      } catch (error) {
        setApiStatus(null);
      }
    };

    checkApiHealth();
  }, []);

  const handleCompare = async () => {
    setIsLoading(true);
    setError(null);
    const newResults = [];
    
    // Calculate total number of comparisons needed
    const total = (files.length * (files.length - 1)) / 2;
    setTotalComparisons(total);
    setComparisonProgress(0);
    
    try {
      for (let i = 0; i < files.length; i++) {
        for (let j = i + 1; j < files.length; j++) {
          const response = await compareDocuments(files[i].file, files[j].file);
          
          if (response.status === 'success') {
            newResults.push({
              file1: files[i].name,
              file2: files[j].name,
              similarity: response.similarity_score,
              message: response.message
            });
          } else {
            throw new Error(response.message);
          }
          
          // Update progress
          setComparisonProgress(prev => prev + 1);
        }
      }
      
      setResults(newResults);
    } catch (error) {
      setError(error.message || 'An error occurred while comparing documents');
    } finally {
      setIsLoading(false);
      setComparisonProgress(0);
    }
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setFiles([]);
    setResults([]);
    setError(null);
  };

  const handleClearTable = () => {
    setResults([]);
  };

  const handleDeleteRow = (index) => {
    setResults(prevResults => prevResults.filter((_, i) => i !== index));
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme} apiStatus={apiStatus}>
        <Container maxWidth="lg">
          {error && (
            <Box sx={{ mb: 4 }}>
              <Paper elevation={3} sx={{ p: 2, bgcolor: 'error.light', color: 'error.contrastText' }}>
                <Typography>{error}</Typography>
              </Paper>
            </Box>
          )}

          <FileUpload onFilesUploaded={setFiles} isLoading={isLoading} />

          {files.length > 0 && (
            <Box sx={{ 
              mt: 4,
              p: 3,
              borderRadius: 4,
              border: '2px solid',
              borderColor: (theme) => theme.palette.divider,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'primary.main',
                boxShadow: (theme) => `0 0 20px ${theme.palette.primary.main}20`,
              }
            }}>
              <FileList 
                files={files} 
                onRemoveFile={removeFile} 
                onClearAll={clearAll} 
                isLoading={isLoading}
              />
              
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 3,
                pt: 3,
                borderTop: '1px solid',
                borderColor: (theme) => theme.palette.divider,
                gap: 2
              }}>
                {isLoading && (
                  <Box sx={{ width: '100%', mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Comparing Documents...
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {Math.round((comparisonProgress / totalComparisons) * 100)}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(comparisonProgress / totalComparisons) * 100}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: (theme) => theme.palette.grey[200],
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          bgcolor: (theme) => theme.palette.primary.main,
                        }
                      }}
                    />
                  </Box>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCompare}
                  disabled={isLoading || files.length < 2}
                  startIcon={isLoading ? <CircularProgress size={20} /> : <CompareIcon />}
                  sx={{
                    minWidth: 200,
                    py: 1.5,
                    px: 4,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    boxShadow: (theme) => `0 4px 8px ${theme.palette.primary.main}40`,
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: (theme) => `0 6px 12px ${theme.palette.primary.main}60`,
                      '&::before': {
                        transform: 'translateX(100%)',
                      },
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                      transform: 'translateX(-100%)',
                      transition: 'transform 0.6s ease',
                    },
                    '&:disabled': {
                      bgcolor: 'grey.300',
                      color: 'grey.500',
                      boxShadow: 'none',
                    }
                  }}
                >
                  {isLoading ? 'Comparing...' : 'Compare Documents'}
                </Button>
              </Box>
            </Box>
          )}

          {results.length > 0 && <ResultsTable results={results} onClearTable={handleClearTable} onDeleteRow={handleDeleteRow} />}
        </Container>
      </Layout>
    </MuiThemeProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
