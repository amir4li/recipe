import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Stack, Grid, Typography, useMediaQuery } from '@mui/material'
import { useParams } from 'react-router-dom';

import MenuCard from '../components/menu/MenuCard';


function RecipeMenu() {
    const [recipes, setRecipes] = useState(null)
    const { menu } = useParams();
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const fetchRecipes = async ()=> {
        const response = await axios.get(`https://recipe-backend-api.onrender.com/api/v1/recipes?category=${menu}`);
        setRecipes(response.data.data)
    };

    useEffect(()=> {
        fetchRecipes()
    } ,[]);

    return (
        <Stack
            p={2} pt={4}
            mt={6}
            gap={3}
            sx={{ background: "#eee" }}
        >
        <Typography
              variant={isNonMobile ? "h4" : "h5"}
              textAlign="center"
              marginRight="2rem"
              fontFamily="cursive"
              color="limegreen"
            >
              {menu}
        </Typography>
        <Stack>
            <Grid container
                columns={10}
                spacing={2}
                rowSpacing={4}
                justifyContent="space-around"
                alignItems="center"
                pt={2}
                pb={6}
            >
            {
            recipes ? recipes.map((item, index)=> (
                <Grid item
                xs={5}
                md={3}
                key={uuidv4()}
                >
                <MenuCard foodItem={item} />
                </Grid>
            )) :
                <Typography
                    variant="h6"
                    mt={5}
                >
                Sorry ! No Data To Show...
                </Typography>
            }
            </Grid>
            </Stack>
        </Stack>
    )
}

export default RecipeMenu;

