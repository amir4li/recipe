import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Typography, Stack, Grid, InputAdornment, TextField, Button } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';

import MenuCard from './menu/MenuCard';

function SearchBar() {
    const [searchValue, setSearchValue] = useState("");
    const [recipes, setRecipes] = useState();

    const handleChange = (e)=> {
        setSearchValue(e.target.value);       
    };

    const handleClick = async ()=> {
        const res = await axios.get(`https://recipe-backend-api.onrender.com/api/v1/recipes/search?name=${searchValue}`);
        setRecipes(res.data.data);
    };

    return (
        <Stack
        spacing={1}
        sx={{
            alignItems: "center",
            mt: "1rem",
            mb: "2rem",
        }}
        >
            <Stack width="60%" alignItems="center">
                <TextField
                    fullWidth
                    placeholder="Search Your Favorite Recipe here"
                    size="small"
                    sx={{
                        backgroundColor: "#eee",
                        borderRadius: "5px",
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <SearchOutlined />
                        </InputAdornment>
                    }}
                    onChange={(e)=> handleChange(e)}
                />
            </Stack>
            <Button variant="contained" onClick={handleClick}>Search</Button>
            {recipes && <Stack width="100%">
            <Typography
                variant="h5"
                
                margin="2rem"
                marginY = "1rem"
            >
               Search Results:
            </Typography>
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
            recipes.map((item, index)=> (
                <Grid item
                xs={5}
                md={3}
                key={uuidv4()}
                >
                <MenuCard foodItem={item} />
                </Grid>
            )) 
            }
            </Grid>
            </Stack>}
        </Stack>
  )
}

export default SearchBar;