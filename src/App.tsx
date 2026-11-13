import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Header from './components/header/Header';
import type { NavigationPage } from './types/navigation';
import ProductsPage from './components/pages/ProductsPage';
import CartPage from './components/pages/CartPage';
import LoginPage from './components/pages/LoginPage';
import './App.css';

const pages = {
  products: ProductsPage,
  cart: CartPage,
  login: LoginPage,
};

function App() {
  const [activePage, setActivePage] = useState<NavigationPage>('products');
  const Page = pages[activePage];

  return (
    <div className="app-layout">
      <Header activePage={activePage} onNavigate={setActivePage} />
      <Container component="main" maxWidth={false} disableGutters className="main-content">
        <Page />
      </Container>
      <footer className="app-footer">
        <Container maxWidth={false} disableGutters>
        <Typography variant="body2">© {new Date().getFullYear()} Happy Marketplace. All rights reserved.</Typography>        </Container>
      </footer>
    </div>
  );
}

export default App;
