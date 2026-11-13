import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#00796b' },
    secondary: { main: '#a84431' },
    background: { default: '#f8f9f5', paper: '#fffefb' },
    text: { primary: '#173d36', secondary: '#586d65' },
  },
  typography: {
    fontFamily: "'Segoe UI', Arial, sans-serif",
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: { borderRadius: 12 },
});

export default theme;