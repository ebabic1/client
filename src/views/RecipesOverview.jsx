import { useEffect, useState } from "react";
import axiosInstance from "../axios-instance";
import RecipeCard from "../components/RecipeCard";
import { Box, Button, Typography } from "@mui/material";
const RecipesOverview = () => {
  const [recipes, setRecipes] = useState([]);
  const getRecipes = async () => {
    const result = await axiosInstance.get("/recipes");
    if (result.status === 200) {
      setRecipes(result.data);
    }
  };
  useEffect(() => {
    getRecipes();
  }, []);
  return (
    <Box>
      <Box sx={{
            marginLeft: '20px'
      }}>
        <Typography variant="h2">Recipes overview</Typography>
        <Button variant="contained">+ New recipe</Button>
      </Box>
      <Box display="flex"
      flexWrap="wrap" >
        {recipes?.map((recipe) => {
          return <RecipeCard title={recipe.name} image={recipe.imageURL} id={recipe.id} key={recipe.id}/>;
        })}
      </Box>
    </Box>
  );
};
export default RecipesOverview;
