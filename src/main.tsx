import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import './index.css';
import App from './App.tsx';
import theme from './theme';
import NavigationProvider from './context/NavigationProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer mui, app;" />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavigationProvider>
          <App />
        </NavigationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>,
);
