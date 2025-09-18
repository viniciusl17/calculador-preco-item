import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const Header = ({ toggleTheme, isDarkMode }) => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
          Precifiq - Tecnologia para precificar com inteligência
        </Typography>
        <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;