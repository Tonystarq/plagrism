import React, { useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';
import { Container, Box, Button, AppBar, Toolbar, Typography, IconButton, CircularProgress, Paper } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import ResultsTable from './components/ResultsTable';
import { compareDocuments, checkHealth } from './services/api';

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

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Document Similarity Checker
          </Typography>
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="mt-4">
        {apiStatus && (
          <Paper className="p-2 mb-4" sx={{ bgcolor: 'success.light', color: 'success.contrastText' }}>
            <Typography>API Status: {apiStatus.message}</Typography>
          </Paper>
        )}

        {error && (
          <Paper className="p-2 mb-4" sx={{ bgcolor: 'error.light', color: 'error.contrastText' }}>
            <Typography>{error}</Typography>
          </Paper>
        )}

        <FileUpload onFilesUploaded={setFiles} />

        {files.length > 0 && (
          <>
            <FileList files={files} onRemoveFile={removeFile} />
            
            <Box className="flex gap-2 mt-4">
              <Button
                variant="contained"
                onClick={handleCompare}
                disabled={files.length < 2 || isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Compare Documents'}
              </Button>
              <Button variant="outlined" onClick={clearAll}>
                Clear All
              </Button>
            </Box>
          </>
        )}

        {results.length > 0 && <ResultsTable results={results} />}
      </Container>
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
