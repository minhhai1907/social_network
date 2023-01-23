import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import useAuth from '../hooks/useAuth';
import Logo from '../components/Logo'
import { Avatar, Card,  IconButton, Stack} from '@mui/material';
import {Link as RouterLink, useNavigate} from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import FolderSharedIcon from '@mui/icons-material/FolderShared';

 function MainHeader() {
  const navigate=useNavigate()
  const {user,logout}=useAuth()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen=Boolean(anchorEl)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout=()=>{
    logout(()=>{
      navigate("/login")
    })
  }
  
  const rendenMenu=(
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <Card sx={{m:0.5}}>
           <MenuItem sx={{ my: 1.5 }}>
            <Avatar src={user.avatarUrl} alt={user.name}/>
            <Typography variant="body2" sx={{ color: "text.secondary",p:1 }} noWrap>
              {user?.name}
            </Typography>
          </MenuItem>
          </Card>
          <MenuItem
        onClick={handleMenuClose}
        to="/"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
          <Stack direction="row" >
          <FolderSharedIcon/>
          <Typography sx={{mx:1}}>
            My Profile
          </Typography>
        </Stack>
      </MenuItem>

      <MenuItem
        onClick={handleMenuClose}
        to="/account"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
         <Stack direction="row">
          <SettingsIcon/>
          <Typography sx={{mx:1}}>
            Accouont Setting
          </Typography>
        </Stack>
      </MenuItem>
      <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
        <Stack direction="row">
          <LogoutIcon/>
          <Typography sx={{mx:1}}>
            Logout
          </Typography>
        </Stack>
       
      
      </MenuItem>
        </Menu>
  )
  return (
    <Box sx={{ mb:3}}>
      <AppBar position="static" color='transparent'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Logo />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CoderComm
          </Typography>
    
          <Box sx={{flexGrow:1}}/>
          <Box>
            <Avatar src={user.avatarUrl} alt={user.name} onClick={handleMenuOpen}/>
          </Box>
        </Toolbar>
        {rendenMenu}
      </AppBar>
    </Box>
  );
}

export default MainHeader