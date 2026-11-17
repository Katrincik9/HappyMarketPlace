import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import './Header.css';

function Header() {
  const isDesktop = useMediaQuery('(min-width: 900px)');

  return (
    <AppBar position="sticky" color="inherit" elevation={0} className="app-header">
      <Container maxWidth="lg" disableGutters className="header-toolbar">
        <Link className="brand" to="/products">
          <img className="brand-logo" src={logo} />
          <div className="brand-wordmark">
            <span className="brand-name">happy.</span>
            <span className="brand-caption">MARKETPLACE</span>
          </div>
        </Link>

        {isDesktop ? <DesktopNavigation /> : <MobileNavigation />}
      </Container>
    </AppBar>
  );
}

export default Header;
