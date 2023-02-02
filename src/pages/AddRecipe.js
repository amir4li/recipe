import React from 'react';
import { Box, useMediaQuery, Typography, Stack } from '@mui/material';
import RecipeForm from '../components/recipeForm/RecipeForm';

function AddRecipe() {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    return (
        <Stack
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
                Add Recipe
            </Typography>
            <RecipeForm />
        </Stack>
    )
}

export default AddRecipe;

