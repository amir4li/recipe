import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, useMediaQuery } from '@mui/material';

function MenuCard({ foodItem }) {
    const isNonMobile = Boolean(useMediaQuery("(min-width: 1000px)"));
    const navigate = useNavigate();

    const handleClick = ()=> {
        navigate(`/recipes/${foodItem.category}/${foodItem._id}`)
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
          sx={{ height: isNonMobile ? "330px" : "200px" }}
          components="img"
          image={foodItem.photo ? foodItem.photo : "https://www.whiskaffair.com/wp-content/uploads/2016/08/Clear-Chicken-Soup-2-1.jpg"}
      />
      <CardContent>
          <Typography variant="h5">
              {foodItem.name}
          </Typography>
          <Typography variant="h6">
              {foodItem.origin}
          </Typography>
      </CardContent>
      </Card>
    )
}

export default MenuCard
