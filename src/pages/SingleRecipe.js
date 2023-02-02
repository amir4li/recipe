import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Stack, Typography, Card, CardMedia, useMediaQuery } from '@mui/material';


function SingleRecipe() {
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
            p={2} pt={4}
            mt={6}
            gap={3}
            sx={{
                background: "#eee"
        }}
    >
        {recipe && <Stack
            alignItems="center"
            spacing={2}
        >
            <Typography
                variant={isNonMobile ? "h4" : "h5"}
                textAlign="center"
                marginRight="2rem"
                marginY = "1rem"
                fontFamily="cursive"
                color="limegreen"
            >
                {recipe.name}
            </Typography>
            <Card
                sx={{
                    cursor: 'pointer',
                    width: isNonMobile ? "60%" : "80%"
                }}
            >
            <CardMedia
                sx={{ height: isNonMobile ? "430px" : "300px" }}
                components="img"
                image={"https://www.whiskaffair.com/wp-content/uploads/2016/08/Clear-Chicken-Soup-2-1.jpg"}
            />
            </Card>
            <Box  width={isNonMobile ? "60%" : "80%"}>
                <Typography>Category: {recipe.category}</Typography>
                <Typography>Origin: {recipe.origin}</Typography>
                {
                recipe.description &&
                <Typography mt={3}>
                    {recipe.description}
                </Typography>  
                }
            </Box>
            <Stack width={isNonMobile ? "60%" : "80%"}>
                <Box mt={2}>
                    <Typography gutterBottom variant="h4">Ingredients:</Typography>
                    <Stack paddingLeft={3}>
                    {
                        recipe.ingredients.map((ingredient, index)=> {
                            return <Typography key={index}>{ingredient}</Typography>
                        })
                    }
                    
                    </Stack>
                </Box>
                <Box mt={3}>
                    <Typography gutterBottom variant="h4">Preparation:</Typography>
                    <Stack paddingLeft={3}>
                    {
                        recipe.preparation.map((step, index)=> {
                            return <Typography key={index} mb={1}>{index+1}: {step}</Typography>
                        })
                    }
                    
                    </Stack>
                </Box>
            </Stack>
        </Stack>
        }
    </Stack>

    )
}

export default SingleRecipe;

