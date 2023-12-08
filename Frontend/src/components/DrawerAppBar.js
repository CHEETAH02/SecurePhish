import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const drawerWidth = 240;
const navItems = ['Home', 'Features','Resources'];

export default function DrawerAppBar(props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = useState(false);
  
	const handleDrawerToggle = () => {
	  setMobileOpen(!mobileOpen);
	};
  
	const drawer = (
	  <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', backgroundColor: '' }}>
		<Typography variant="h6" sx={{ my: 4 }}>
		  SecurePhish
		</Typography>
		<Divider />
		<List>
		  {navItems.map((item) => (
			<ListItem key={item} disablePadding>
			  <ListItemButton sx={{ textAlign: 'center' }}>
				<RouterLink to={`/${item.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
				  <ListItemText primary={item} />
				</RouterLink>
			  </ListItemButton>
			</ListItem>
		  ))}
		</List>
	  </Box>
	);
  
	const container = window !== undefined ? () => window().document.body : undefined;
  
	return (
	  <Box sx={{ display: 'flex', backgroundColor: "#164863" }}>
		<CssBaseline />
		<AppBar component="nav" sx={{ backgroundColor: "#164863", color: "DDF2FD" }}>
		  <Toolbar>
			<IconButton
			  color="inherit"
			  aria-label="open drawer"
			  edge="start"
			  onClick={handleDrawerToggle}
			  sx={{ mr: 2, display: { sm: 'none' } }}
			>
			  <MenuIcon />
			</IconButton>
			<Typography
			  variant="h6"
			  component="div"
			  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: "DDF2FD", fontFamily: "Calibri", fontStyle: "normal", fontSize: "22px" }}
			>
			  SecurePhish
			</Typography>
			<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
			  {navItems.map((item) => (
				<RouterLink to={`/${item.toLowerCase()}`} key={item} style={{ textDecoration: 'none', color: "white" }}>
				  <Button sx={{ color: "white", fontFamily: "Calibri", fontStyle: "normal", fontSize: "15px" }}>{item}</Button>
				</RouterLink>
			  ))}
			  {/* Login/Signup Button */}
			  <RouterLink to="/login-signup" style={{ textDecoration: 'none' }}>
				<Button sx={{ backgroundColor:"white",color: "#164863", fontFamily: "Calibri", fontStyle: "normal", fontSize: "15px" }}>Login/Signup</Button>
			  </RouterLink>
			</Box>
		  </Toolbar>
		</AppBar>
		<nav>
		  <Drawer
			container={container}
			variant="temporary"
			open={mobileOpen}
			onClose={handleDrawerToggle}
			ModalProps={{
			  keepMounted: true, // Better open performance on mobile.
			}}
			sx={{
			  color: "black", fontFamily: "Calibri", fontStyle: "normal", fontSize: "22px",
			  display: { xs: 'block', sm: 'none' },
			  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
			}}
		  >
			{drawer}
		  </Drawer>
		</nav>
	  </Box>
	);
  }