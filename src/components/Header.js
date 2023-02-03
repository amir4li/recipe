import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Typography, Toolbar, Stack, useMediaQuery } from '@mui/material';
import Navbar from './Navbar';


function Header() {
    const isAuth = Boolean(useSelector((state)=> state.auth.user && state.auth.user));
    const userName = useSelector((state)=> state.auth.user && state.auth.user.name)
    const navigate = useNavigate();
    const currentPage = window.location.href;
    const isNonMobile = useMediaQuery("(min-width:600px)");

    return (
      <AppBar sx={{ bgcolor: "#eeee", mb: "4rem" }}>
        <Toolbar>        
        <Stack
            width="100%"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            paddingX="2rem"
        >
            <Stack direction="row" spacing={3} alignItems="flex-end">
            
            <Typography 
                variant="h4"
                sx={{
                    fontWeight: 700,
                    color: "limegreen",
                    cursor: 'pointer',
                }}
                onClick={()=> navigate("/recipe/")}
            >
                Recipe
            </Typography>
            { isNonMobile && <Navbar />}
            </Stack>

            <Stack>
            {isAuth ?
            <Typography 
                variant="h6"
                sx={{
                cursor: "pointer",
                fontWeight: 700,
                color: "#000",
                border: "1px solid limegreen",
                paddingX: "1rem"
                }}
                onClick={()=> {navigate("/my-recipes")}}
            >
            {isNonMobile ? userName : "My Recipe"}
            </Typography> :
            
            currentPage.includes("login") || currentPage.includes("signup") ? "" :
            <Typography 
                variant="h6"
                sx={{
                cursor: "pointer",
                fontWeight: 700,
                color: "#000",
                border: "1px solid limegreen",
                paddingX: "1rem"
                }}
                onClick={()=> {navigate("/login")}}
            >
                Sign In
            </Typography>
            }
            </Stack>   
          
        </Stack>
        </Toolbar>
      </AppBar>
    )
}

export default Header;

