import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { navigationItems } from '../../constants/navigationItems';
import { useNavigation } from '../../hooks/useNavigation';
import './MobileNavigation.css';

function MobileNavigation() {
  const { activePage, onNavigate } = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <IconButton className="mobile-menu-button" aria-expanded={menuOpen} aria-controls={menuOpen ? 'mobile-navigation' : undefined} onClick={() => setMenuOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="top" open={menuOpen} onClose={() => setMenuOpen(false)} className="mobile-drawer">
        <div className="drawer-heading">
          <Typography component="h2" variant="h6">Menu</Typography>
          <IconButton onClick={() => setMenuOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <Typography className="drawer-description">Guest</Typography>
        <Divider />
        <List component="nav" id="mobile-navigation">
          {navigationItems.map(({ page, label }) => (
            <ListItemButton key={page} selected={activePage === page}
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
    </>
  );
}

export default MobileNavigation;
