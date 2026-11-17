import { navigationItems } from '../../constants/navigationItems';
import { matchPath, NavLink, useLocation } from 'react-router';
import './DesktopNavigation.css';
import { List, ListItemButton, ListItemText } from '@mui/material';

function DesktopNavigation() {
  const { pathname } = useLocation();

  return (
    <List component="nav" className="desktop-navigation">
      {navigationItems.map(({ path, label }) => (
        <ListItemButton
          key={path}
          component={NavLink}
          to={path}
          end
          selected={!!matchPath({ path, end: true }, pathname)}
        >
          <ListItemText primary={label} />
        </ListItemButton>
      ))}
    </List>
  );
}

export default DesktopNavigation;
