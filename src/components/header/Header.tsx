import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logo.svg';
import type { NavigationItem, NavigationPage } from '../../types/navigation';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';

const navigationItems: NavigationItem[] = [
  { page: 'products', label: 'Products' },
  { page: 'cart', label: 'Cart' },
  { page: 'login', label: 'Login' },
];

export type HeaderProps = {
  activePage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
};

function Header({ activePage, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AppBar position="sticky" color="inherit" elevation={0} className="app-header">
      <Container maxWidth={false} disableGutters className="header-toolbar">
        <a className="brand" href="/"
          onClick={() => {
            onNavigate('products');
            setMenuOpen(false);
          }}
        >
          <img className="brand-logo" src={logo} />
          <div className="brand-wordmark">
            <span className="brand-name">happy.</span>
            <span className="brand-caption">MARKETPLACE</span>
          </div>
        </a>

        <IconButton className="mobile-menu-button" aria-expanded={menuOpen} aria-controls={menuOpen ? 'mobile-navigation' : undefined} onClick={() => setMenuOpen(true)}>
          <MenuIcon />
        </IconButton>
      </Container>

      <Drawer anchor="top" open={menuOpen} onClose={() => setMenuOpen(false)} className="mobile-drawer">
        <div className="drawer-heading">
          <Typography component="h2" variant="h6">Menu</Typography>
          <IconButton onClick={() => setMenuOpen(false)}>
            <SvgIcon>
              <path d="m6 6 12 12M6 18 18 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </SvgIcon>
          </IconButton>
        </div>
        <Typography className="drawer-description">Guest</Typography>
        <Divider />
        <List component="nav">
          {navigationItems.map(({ page, label }) => (
            <ListItemButton
              key={page}
              selected={activePage === page}
              onClick={() => {
                onNavigate(page);
                setMenuOpen(false);
              }}
            >
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Header;