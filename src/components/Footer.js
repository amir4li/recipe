import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../redux/authSlice';
import { Button, Stack, Typography } from '@mui/material';

function Footer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = Boolean(useSelector((state)=> state.auth.token));
  const currentYear = new Date().getFullYear();
  const currentPage = window.location.href;

  const handleLogout = ()=> {
    dispatch(
        setLogout()
    );           
    navigate("/");
  };

  return (
        <Stack
            justifyContent="center"
            alignItems="Center"
            spacing={1}
            pt={2}
            pb={2}
            // bgcolor="#dddd"
        >
        { isAuth ?
          <Button onClick={handleLogout}>Log Out</Button> :
          currentPage.includes("login") || currentPage.includes("signup") ? "" :
          <Button onClick={()=> navigate("/login")}>Sign In</Button>}
        
        <Typography color="inherit" variant="body2">
            Recipe &#169; {currentYear}
        </Typography>
      </Stack>
  );
}

export default Footer;