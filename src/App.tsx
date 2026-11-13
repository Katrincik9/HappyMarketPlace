import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Header from './components/header/Header';
import { useNavigation } from './hooks/useNavigation';
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
  const { activePage } = useNavigation();
  const Page = pages[activePage];

  return (
    <div className="app-layout">
      <Header />
      <Container component="main" maxWidth="lg" disableGutters className="main-content">
        <Page />
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
