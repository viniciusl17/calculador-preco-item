import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Typography, IconButton, Toolbar, AppBar } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import DishPriceCalculator from './components/DishPriceCalculator';

// TEMA ESCURO (AZUL PETRÓLEO)
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#66A5AD' }, // Azul claro para destaque
    secondary: { main: '#D46A38' }, // Laranja/Cobre para botões
    background: { default: '#002A33', paper: '#003B46' },
    text: { primary: '#FFFFFF', secondary: '#E0E0E0' },
  },
  typography: { fontFamily: '"Poppins", "Roboto", sans-serif', h4: { fontWeight: 700 }, h5: { fontWeight: 600 } },
});

// TEMA CLARO
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#07575B' },
    secondary: { main: '#C45523' },
    background: { default: '#F0F4F8', paper: '#FFFFFF' },
    text: { primary: '#003B46', secondary: '#07575B' },
  },
  typography: { fontFamily: '"Poppins", "Roboto", sans-serif', h4: { fontWeight: 700 }, h5: { fontWeight: 600 } },
});


function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={4}>
          <DishPriceCalculator />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;