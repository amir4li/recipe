import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack, Typography, Card, CardContent, CardActions, Button, IconButton, useMediaQuery } from '@mui/material'
import { Edit, Delete, Add } from '@mui/icons-material';
import DeleteDialog from '../components/DeleteDialog';


function MyRecipes() {
    const [recipes, setRecipes] = useState(null)
    const token = useSelector((state) => state.auth.token);
    const { menu } = useParams();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const fetchRecipes = async ()=> {
        const response = await axios.get("http://localhost:5000/api/v1/recipes/user-recipes",
            { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"} });
        setRecipes(response.data.data)
    };

    useEffect(()=> {
        fetchRecipes()
    } ,[]);


    return (
        <Stack
            p={7} pt={4}
            mt={6}
            gap={3}
            alignItems="center"
            sx={{ background: "#eee" }}
        >
        <Stack spacing={2}>
        <Stack
            direction= {isNonMobile ? "row" : "column"}
            spacing={2}
            justifyContent="space-between"
            alignItems= {isNonMobile ? "flex-end" : "center"}
        >
            <Typography
                variant="h4"
                color="#111"
                sx={{ fontWeight: 500 }}
            >
                My Recipes
            </Typography>
            
            <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={()=> navigate("/new-recipe")}
            >
                Add New Recipe
            </Button>
        </Stack>
        
        <Stack alignItems="center">
            {
                recipes && recipes.map((recipe)=> (
                    <Card key={uuidv4()}
                    sx={{
                        cursor: "pointer",
                        marginBottom: "1rem"
                    }}
                    >
                    <CardContent>
                        <Typography gutterBottom variant="h6">{recipe.name}</Typography>
                        <Typography paddingLeft={1}>{recipe.description}</Typography>
                    </CardContent>
                    <CardActions>
                    <IconButton
                        onClick={()=> navigate(`/update-recipe/${recipe._id}`) }
                    >
                        <Edit />
                    </IconButton>
                    <DeleteDialog recipeId={recipe._id} />
                    </CardActions>
                    </Card>
                ))
            }
        </Stack>
        </Stack>
        </Stack>
    )
}

export default MyRecipes;

