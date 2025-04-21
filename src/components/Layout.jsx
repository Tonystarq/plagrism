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
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Cloud as CloudIcon,
  Compare as CompareIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';

const Layout = ({ children, isDarkMode, toggleTheme, apiStatus }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { text: 'Upload Documents', icon: <UploadIcon />, id: 'upload' },
    { text: 'Compare Documents', icon: <CompareIcon />, id: 'compare' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="default" elevation={1}>
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
            {apiStatus && (
              <Chip
                icon={<CloudIcon />}
                label={apiStatus.message}
                color={apiStatus.status === 'success' ? 'success' : 'error'}
                size="small"
                sx={{ mr: 1 }}
              />
            )}
            <IconButton onClick={toggleTheme} color="inherit">
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
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
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>

      <Paper
        component="footer"
        sx={{
          py: 2,
          px: 3,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Document Similarity Checker
        </Typography>
      </Paper>
    </Box>
  );
};

export default Layout; 