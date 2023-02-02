import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {useMediaQuery, Typography, Stack } from '@mui/material';
import UpdateRecipeForm from '../components/recipeForm/UpdateRecipeForm';


function UpdateRecipe() {
    const [recipe, setRecipe] = useState(null);
    const { recipeId }= useParams();
    const isNonMobile = Boolean(useMediaQuery("(min-width: 600px)"));


    
    const fetchRecipe = async ()=> {
        const response = await axios.get(`https://recipe-backend-api.onrender.com/api/v1/recipes/${recipeId}`);
        setRecipe(response.data.data)
    };

    useEffect(()=> {
        fetchRecipe();
    } ,[]);

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
                Update Recipe
            </Typography>
            {recipe && <UpdateRecipeForm recipe={recipe} />}
        </Stack>
    )
}

export default UpdateRecipe;