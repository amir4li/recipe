import React from 'react';
import { Box, useMediaQuery, Typography } from '@mui/material';
import UserForm from '../components/userForm/UserForm';

function SignUp() {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    return (
        <Box
            width= { isNonMobile ? "70%" : "100%" }
            m="auto"
            pt={4}
            mt={8} mb={6}
            textAlign="center"
            bgcolor="#eee"
            spacing={2}
        >
            <Typography
                fontSize="1.4rem"
                color="limegreen"
                fontWeight="bold"
                
            >
                Wellcome to Recipe
            </Typography>
            <UserForm pageType ="signup" />
        </Box>
    )
}

export default SignUp;