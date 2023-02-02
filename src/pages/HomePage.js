import React from 'react'
import { Stack, Typography, useMediaQuery } from '@mui/material'
import CategoryList from '../components/category/CategoryList'

function HomePage() {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Stack
        p={2} pt={4}
            mt={6}
            gap={3}
            sx={{
                background: "#eee"
        }}
    >
        <Stack>
            <Typography
              variant={isNonMobile ? "h4" : "h5"}
              textAlign="center"
              marginRight="2rem"
              marginY = "1rem"
              fontFamily="cursive"
              color="limegreen"
            >
              The Home Of Recipes
            </Typography>
            <CategoryList />
        </Stack>
    </Stack>
  )
}

export default HomePage