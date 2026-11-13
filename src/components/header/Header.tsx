import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import logo from '../../assets/logo.svg';
import { useNavigation } from '../../hooks/useNavigation';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import './Header.css';

function Header() {
  const { onNavigate } = useNavigation();
  const isDesktop = useMediaQuery('(min-width: 900px)');

  return (
    <AppBar position="sticky" color="inherit" elevation={0} className="app-header">
      <Container maxWidth="lg" disableGutters className="header-toolbar">
        <a className="brand" href="/" onClick={() => onNavigate('products')}>
          <img className="brand-logo" src={logo} />
          <div className="brand-wordmark">
            <span className="brand-name">happy.</span>
            <span className="brand-caption">MARKETPLACE</span>
          </div>
        </a>

        {isDesktop ? <DesktopNavigation /> : <MobileNavigation />}
      </Container>
    </AppBar>
  );
}

export default Header;
