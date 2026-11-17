import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Header from './components/header/Header';
import { Navigate, Route, Routes } from 'react-router';
import ProductsPage from './components/pages/ProductsPage';
import CartPage from './components/pages/CartPage';
import LoginPage from './components/pages/LoginPage';
import AdminPage from './components/pages/AdminPage';
import './App.css';

function App() {
  return (
    <div className="app-layout">
      <Header />
      <Container component="main" maxWidth="lg" disableGutters className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/account" element={<LoginPage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Container>
      <footer className="app-footer">
        <Container maxWidth="lg" disableGutters className="footer-content">
          <Typography variant="body2">© {new Date().getFullYear()} Happy Marketplace. All rights reserved.</Typography>        
        </Container>
      </footer>
    </div>
  );
}

export default App;
