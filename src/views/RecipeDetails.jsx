import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, List, ListSubheader, Typography, ListItem } from "@mui/material";
import { fontSize } from "@mui/system";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { recipes } = useSelector((state) => state.recipes);
  useEffect(() => {
    if (id) {
      const viewedRecipe = recipes.find((recipe) => recipe.id === id);
      setRecipe(viewedRecipe);
    }
  }, [recipes]);
  return (
    <div>
      <h1>Details</h1>
      <Box>
        <Box display="flex" alignItems="center" justifyContent="flex-start">
          <Typography variant="h5">Name: </Typography>
          <Typography variant="h5">{recipe?.name}</Typography>
        </Box>
        <Box display="flex" justifyContent="flex-start" flexDirection="column">
          {recipe?.ingredients.map((ingredient, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Typography variant="h5">Ingredient: </Typography>
              <Typography variant="h5">
                {ingredient.name} - {ingredient.quantity}
              </Typography>
            </Box>
          ))}
          <Typography>Steps:</Typography>
          <ol>
            {recipe?.steps.map((step, index) => (
              <li style={{ fontSize: '16px' }} key={index}>{step}</li>
            ))}
            </ol>
        </Box>
        <img src = {recipe?.imageURL}></img>
      </Box>
    </div>
  );
};
export default RecipeDetails;
