import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import GlobalStyles from '@mui/material/GlobalStyles';
import { StyledEngineProvider } from '@mui/material/styles';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer mui, app;" />
      <App />
    </StyledEngineProvider>
  </StrictMode>,
);
