import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../Firebase/firebaseConfig"
import { signOut } from 'firebase/auth';

import { AppBar, Box, Toolbar, ListItemIcon, IconButton, Typography, Container, Avatar, Button, Tooltip, Drawer, List, Divider, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Header = ({ currUser }) => {
    let navigate = useNavigate();

    const signOutFunction = async () => {
        try {
            signOut(auth)
            console.log('Signed Out Successfully !');
            navigate("/")
        } catch (error) {
            console.error(error);
        }
    }

    const [navbar, setNavbar] = useState({
        'left': false,
        'right': false,
    })

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setNavbar({ ...navbar, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            {
                anchor === 'left' ?
                    <>

                        <List>
                            <ListItem button onClick={() => navigate("/")}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                            <ListItem button onClick={() => navigate("/allComplaints")}>
                                <ListItemIcon>
                                    <LoginIcon />
                                </ListItemIcon>
                                <ListItemText primary="All Complaints" />
                            </ListItem>
                            <ListItem button onClick={() => navigate("/signup")}>
                                <ListItemIcon>
                                    <HowToRegIcon />
                                </ListItemIcon>
                                <ListItemText primary="Sign Up" />
                            </ListItem>
                            <ListItem button onClick={() => navigate("/userdashboard")}>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="User Dashboard" />
                            </ListItem>
                            <ListItem button onClick={() => navigate("/admindashboard")}>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Admin Dashboard" />
                            </ListItem>
                        </List>

                    </> :
                    <>

                        <List>
                            <ListItem button onClick={() => navigate("/profile")}>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItem>
                            <ListItem button onClick={() => navigate("/studentDashboard")}>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItem>
                            <Divider />
                            <ListItem button onClick={signOutFunction}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </List>
                    </>
            }
        </Box>
    );
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            HNBGU Hostel Management Portal
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={toggleDrawer('left', true)}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            HNBGU Hostel Management Portal
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={() => navigate("/")}
                            >
                                Home
                            </Button>
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={() => navigate("/allComplaints")}
                            >
                                All Complaints
                            </Button>
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={() => navigate("/studentDashboard")}
                            >
                                Student Dashboard
                            </Button>
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={() => navigate("/officerDashboard")}
                            >
                                Officer Dashboard
                            </Button>
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={() => navigate("/adminDashboard")}
                            >
                                Admin Dashboard
                            </Button>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {
                                currUser ?
                                    <>
                                        <Tooltip title="Open settings">
                                            <IconButton onClick={toggleDrawer('right', true)} sx={{ p: 0 }}>
                                                <Avatar alt={currUser.displayName} src={currUser.photoURL} />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                    :
                                    <>
                                        <Button
                                            // variant="outlined"
                                            color="inherit"
                                            onClick={() => navigate("/login")}
                                            startIcon={<LoginIcon />}
                                        >Sign In</Button>
                                    </>
                            }



                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* left drawer */}
            <Drawer
                anchor={'left'}
                open={navbar['left']}
                onClose={toggleDrawer('left', false)}
            >
                {list('left')}
            </Drawer>
            {/* right drawer */}
            <Drawer
                anchor={'right'}
                open={navbar['right']}
                onClose={toggleDrawer('right', false)}
            >
                {list('right')}
            </Drawer>
        </>

    );
};
export default Header;