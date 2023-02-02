import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Typography, Toolbar, Grid, Stack } from '@mui/material';


function Header() {
    const isAuth = Boolean(useSelector((state)=> state.auth.user && state.auth.user));
    const navigate = useNavigate();
    const currentPage = window.location.href;

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
            <Stack>
            <Typography 
                variant="h4"
                sx={{
                    fontWeight: 700,
                    color: "limegreen",
                    cursor: 'pointer',
                }}
                onClick={()=> navigate("/")}
            >
                Recipe
            </Typography>
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
                My Recipes
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

