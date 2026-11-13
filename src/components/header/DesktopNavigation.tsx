import { navigationItems } from '../../constants/navigationItems';
import { useNavigation } from '../../hooks/useNavigation';
import './DesktopNavigation.css';
import { List, ListItemButton, ListItemText } from '@mui/material';

function DesktopNavigation() {
  const { activePage, onNavigate } = useNavigation();

  return (
    <List component="nav" className="desktop-navigation">
      {navigationItems.map(({ page, label }) => (
        <ListItemButton key={page} selected={activePage === page} onClick={() => onNavigate(page)}>
          <ListItemText primary={label} />
        </ListItemButton>
      ))}
    </List>
  );
}

export default DesktopNavigation;
