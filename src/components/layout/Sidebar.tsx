import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import NextLink from 'next/link';

const DRAWER_WIDTH = 240;

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Properties', icon: <ApartmentIcon /> },
  { text: 'Clients', icon: <PeopleIcon /> },
  { text: 'Contracts', icon: <ArticleIcon /> },
];

export function Sidebar() {

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        // Target the Paper component inside the Drawer
        [`& .MuiDrawer-paper`]: {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          
          backgroundColor: 'background.paper',
          borderRadius: 3, // Adds rounded corners
          marginTop: 3,
          marginLeft:1, // Adds space around the entire drawer
          height: 'calc(100vh - 32px)', // Adjust height to account for top/bottom margin
          boxShadow: 3, // Adds a subtle shadow for elevation
          borderRight: 'none', // Remove the default border
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 500 }}>
          RentFlow
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              component={NextLink} 
              href={item.text === 'Dashboard' ? `/dashboard` : `/dashboard/${item.text.toLowerCase()}`}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
