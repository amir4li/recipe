import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Stack } from '@mui/material';

function Navbar() {
    const isAuth = Boolean(useSelector((state)=> state.auth.user && state.auth.user));
    const navigate = useNavigate();


    return (
        <Stack
            width="100%"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            paddingX="2rem"
            spacing={3}
        >
            <Typography 
                variant="h6"
                sx={{
                    fontWeight: 600,
                    color: "#000",
                    cursor: 'pointer',
                }}
                onClick={()=> navigate("/")}
            >
                Home
            </Typography>
            <Typography 
                variant="h6"
                sx={{
                cursor: "pointer",
                fontWeight: 600,
                color: "#000",
                }}
                onClick={()=> isAuth ? navigate("/my-recipes") : navigate("/login")}
            >
                My Recipes
            </Typography>       
        </Stack>
    )
}

export default Navbar;

