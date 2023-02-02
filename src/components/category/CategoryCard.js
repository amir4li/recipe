import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, useMediaQuery } from '@mui/material';

function CategoryCard({ category }) {
    const isNonMobileScreen = Boolean(useMediaQuery("(min-width: 600px)"));
    const navigate = useNavigate();

    const handleClick = ()=> {
        navigate(`/recipes/${category.name}`)
    };
    
    return (
        <Card
            sx={{
                cursor: 'pointer',
                width: "90%"
            }}
            onClick={()=> handleClick()}
        >
        <CardMedia
            sx={{ height: isNonMobileScreen ? "330px" : "200px" }}
            components="img"
            image={category.image}
        />
        <CardContent>
            <Typography variant="h5">
                {category.name}
            </Typography>
        </CardContent>
        </Card>
    )
}

export default CategoryCard;

