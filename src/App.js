import './App.css';
import "@aws-amplify/ui-react/styles.css"
import '@fontsource/inter/variable.css';

import {Routes, Route, useNavigate, NavLink} from "react-router-dom"
import {Amplify, Auth} from "aws-amplify"
import awsExports from "./aws-exports";
import {
    Flex,
} from "@aws-amplify/ui-react";
import MenuIcon from '@mui/icons-material/Menu';
import Formations from "./components/Formations/Formations"
import Formulaires from "./components/Formulaires/Formulaires";
import Success from "./components/Success/Success";
import SignIn from "./components/SignIn/SignIn";
import logo from "./assets/logo_dn_png.png"

import {useEffect, useState} from "react";
import MyFormations from "./components/my-formations/MyFormations";
import {
    AppBar,
    Avatar,
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
    Button
} from "@mui/material";
import Signature from "./components/Signature/Signature";
import React from "react";
import {AccountCircle, Assignment, Home, Logout} from "@mui/icons-material";
import MySignatures from "./components/My-Signatures/MySignatures";

Amplify.configure(awsExports);

function App() {

    useEffect(() => {
        assessLoggedInState();
    }, [])

    const [loggedIn, setLoggedIn] = useState(false);


    async function assessLoggedInState() {
        Auth.currentAuthenticatedUser().then(
            () => {
                setLoggedIn(true);
            }
        ).catch(() => {
            setLoggedIn(false);
        })
    }

    const navigate = useNavigate();

    async function signOut() {
        try {
            await Auth.signOut();
            setLoggedIn(false);
            navigate('*');

        } catch (e) {
            console.log("Error while signOut");
        }
    }

    function onSignIn() {
        setLoggedIn(true);
    }

    const [user, setUser] = useState();

    function getUser(user) {
        setUser(user);
    }

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return (
        <main>
            <AppBar sx={{backgroundColor: "black"}} position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Flex className={'img-logo'} marginRight={"2em"}>
                            <img onClick={() => navigate('/')} width={"100px"} src={logo} alt={"Logo Decision Network"}/>
                        </Flex>
                        <Typography
                            variant="h4"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            DECISION NETWORK
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">DECISION NETWORK</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        </Box>
                        <Box sx={{alignItems: "center",textDecoration: 'none', color: 'white', marginRight: '2em'}}>
                            <NavLink to={'/'}>
                                <Home sx={{color: 'white'}} fontSize={"large"}/>
                            </NavLink>
                        </Box>

                        {loggedIn ?
                            <Box sx={{flexGrow: 0}}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                        <MenuIcon fontSize={"large"} sx={{color: 'white'}}/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{mt: '45px'}}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Flex direction={"row"} alignItems={"center"}>
                                            <AccountCircle/><Typography onClick={() => navigate('myformations')} textAlign="center">Mon Compte</Typography>
                                        </Flex>
                                    </MenuItem>
                                    <MenuItem divider={true} onClick={handleCloseUserMenu}>
                                        <Flex direction={"row"} alignItems={"center"}>
                                        <Assignment/><Typography onClick={() => navigate("signature")} textAlign="center">Signatures</Typography>
                                        </Flex>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Flex direction={'row'} alignItems={'center'}>
                                            <Logout/><Typography onClick={() => signOut()} textAlign="center">D??connexion</Typography>
                                        </Flex>
                                    </MenuItem>
                                </Menu>
                            </Box>
                            :
                            <Button size={"medium"} color={"primary"} variant={"outlined"} sx={{color:"white"}} onClick={() => navigate('signIn')}>Connexion</Button>
                        }

                    </Toolbar>
                </Container>
            </AppBar>
            <Routes>
                <Route element={<Formations user={user}/>} path={"*"} component={Formations}/>
                <Route path={"formulaire"} element={<Formulaires user={user}/>} component={Formulaires}/>
                <Route path={"formulaire/success"} element={<Success/>} component={Success}/>
                <Route path={"signIn"} element={<SignIn onSignIn={onSignIn} getUser={getUser}/>} component={SignIn}/>
                <Route path={"myformations"} element={<MyFormations/>} component={MyFormations}/>
                <Route path={"signature"} element={<MySignatures/>} component={MySignatures}/>
                <Route path={"submitSignature"} element={<Signature/>} component={Signature}/>
            </Routes>
            <footer>
                <a rel={"noreferrer"} target={"_blank"} href={"https://decision-network.eu/"}>Decision Network ??</a>
            </footer>
        </main>
    );
}

export default App;
