import React, { useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';
import { Container, Box, Button, Typography, CircularProgress, Paper } from '@mui/material';

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
        console.log('App: API status', status);
      } catch (error) {
        console.error('App: Failed to check API health', error);
        setApiStatus(null);
      }
    };

    checkApiHealth();
  }, []);

  const handleCompare = async () => {
    console.log('App: Starting document comparison');
    setIsLoading(true);
    setError(null);
    const newResults = [];
    
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
        }
      }
      
      console.log('App: Comparison completed', newResults);
      setResults(newResults);
    } catch (error) {
      console.error('App: Error during comparison', error);
      setError(error.message || 'An error occurred while comparing documents');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = (index) => {
    console.log('App: Removing file at index', index);
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    console.log('App: Clearing all files and results');
    setFiles([]);
    setResults([]);
    setError(null);
  };

  const handleClearTable = () => {
    console.log('App: Clearing all results');
    setResults([]);
  };

  const handleDeleteRow = (index) => {
    console.log('App: Deleting row at index', index);
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
            <>
              <FileList files={files} onRemoveFile={removeFile} onClearAll={clearAll} />
              
              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <Button
                  variant="contained"
                  onClick={handleCompare}
                  disabled={files.length < 2 || isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} /> : <CompareIcon />}
                  sx={{ minWidth: 200 }}
                >
                  {isLoading ? 'Comparing...' : 'Compare Documents'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={clearAll}
                  disabled={isLoading}
                >
                  Clear All
                </Button>
              </Box>
            </>
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
