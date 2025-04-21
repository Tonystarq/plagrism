import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Paper,
  Chip,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Compare as CompareIcon,
  Upload as UploadIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

const Layout = ({ children, isDarkMode, toggleTheme, apiStatus }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { text: 'Upload Documents', icon: <UploadIcon />, id: 'upload' },
    { text: 'Compare Documents', icon: <CompareIcon />, id: 'compare' },
  ];

  const getApiStatusColor = () => {
    if (!apiStatus) return 'error';
    return apiStatus.message.includes('running') ? 'success' : 'error';
  };

  const getApiStatusIcon = () => {
    if (!apiStatus) return <ErrorIcon />;
    return apiStatus.message.includes('running') ? <CheckCircleIcon /> : <ErrorIcon />;
  };

  const getApiStatusText = () => {
    if (!apiStatus) return 'API Not Connected';
    return apiStatus.message;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="static" 
        color="default" 
        elevation={1}
        sx={{
          bgcolor: isDarkMode ? 'grey.900' : 'background.paper',
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Document Similarity Checker
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Tooltip title={getApiStatusText()}>
              <Badge
                color={getApiStatusColor()}
                variant="dot"
                sx={{
                  '& .MuiBadge-badge': {
                    right: -3,
                    top: 13,
                    border: `2px solid ${isDarkMode ? '#121212' : '#fff'}`,
                    padding: '0 4px',
                  },
                }}
              >
                <Chip
                  icon={getApiStatusIcon()}
                  label={getApiStatusText()}
                  color={getApiStatusColor()}
                  size="small"
                  sx={{
                    bgcolor: (theme) => 
                      getApiStatusColor() === 'success' 
                        ? theme.palette.success.main + '20'
                        : theme.palette.error.main + '20',
                    color: (theme) => 
                      getApiStatusColor() === 'success'
                        ? theme.palette.success.main
                        : theme.palette.error.main,
                    '& .MuiChip-icon': {
                      color: (theme) => 
                        getApiStatusColor() === 'success'
                          ? theme.palette.success.main
                          : theme.palette.error.main,
                    },
                  }}
                />
              </Badge>
            </Tooltip>
            <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              <IconButton onClick={toggleTheme} color="inherit">
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: isDarkMode ? 'grey.900' : 'background.paper',
            color: isDarkMode ? 'grey.100' : 'text.primary',
          },
        }}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.id}
                onClick={() => {
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  setDrawerOpen(false);
                }}
                sx={{
                  '&:hover': {
                    bgcolor: isDarkMode ? 'grey.800' : 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ color: isDarkMode ? 'grey.100' : 'text.primary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          bgcolor: isDarkMode ? 'grey.900' : 'background.paper',
          color: isDarkMode ? 'grey.100' : 'text.primary',
        }}
      >
        {children}
      </Box>

      <Paper
        component="footer"
        sx={{
          py: 2,
          px: 3,
          mt: 'auto',
          bgcolor: isDarkMode ? 'grey.900' : 'grey.100',
          color: isDarkMode ? 'grey.100' : 'text.primary',
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Document Similarity Checker
        </Typography>
      </Paper>
    </Box>
  );
};

export default Layout; 