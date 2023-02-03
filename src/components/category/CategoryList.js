import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Grid, Typography } from '@mui/material';
import CategoryCard from "./CategoryCard";

const categories = [
    {
      name:"Soups",
      image: "https://www.whiskaffair.com/wp-content/uploads/2016/08/Clear-Chicken-Soup-2-1.jpg"
    },
    {
      name: "Salads",
      image: "https://www.kitchensanctuary.com/wp-content/uploads/2021/06/Simple-Green-Salad-with-Vinaigrette-Square-FS-3241.webp"
    },
    {
      name: "Appetizers",
      image: "https://www.foodandwine.com/thmb/fiHqa-1R-B51NkKFtxaVblWVwLU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Buffalo-Wings-Recipe-FT-BLOG1222-26e07fdb9aec4afe8d4bc39ea331c753.jpg"
    },
    {
      name: "Dishes",
      image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/1delish-200225-uk-bombay-aloo-0306-portrait-pf-1583165211.jpg?crop=1.00xw:0.668xh;0,0.138xh&resize=980:*"
    },
    {
      name: "Desserts",
      image: "https://insanelygoodrecipes.com/wp-content/uploads/2020/08/Birthday-Dessert-Ideas-Red-Velvet-Cake.webp"
    },
    {
      name: "Drinks",
      image: "https://images.immediate.co.uk/production/volatile/sites/30/2021/11/Summer-cup-mocktail-5c22b8e.jpg?quality=90&webp=true&fit=1300,866"
    }
]

function CategoryList() {
    return (
      <>
      <Typography
        variant="h5"
        textAlign="center"
        marginRight="2rem"
        marginY = "1rem"
        fontFamily="cursive"
        color="limegreen"
      >
        Food Categories
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
          categories.map((category, index)=> (
              <Grid item
              xs={5}
              md={3}
              key={uuidv4()}
              >
              <CategoryCard category={category} />
              </Grid>
          ))}
      </Grid>
      </>
    )
}

export default CategoryList;

