import { useEffect, useState } from "react";
import axiosInstance from "../axios-instance";
import RecipeCard from "../components/RecipeCard";
import { Box, Button, Snackbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes } from "../redux/recipes/recipesSlice";
import CreateEditRecipe from "../components/CreateEditRecipe";
const RecipesOverview = () => {
  const dispatch = useDispatch();
  const [isCreateEditModalOpen, setIsCreateEditModalOpen] = useState(false);
  const { recipes } = useSelector((state) => state.recipes);
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const getRecipes = async () => {
    const result = await axiosInstance.get("/recipes");
    if (result.status === 200) {
      dispatch(setRecipes(result.data));
    }
  };

  useEffect(() => {
    getRecipes();
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <Box>
        <Box
          sx={{
            marginLeft: "20px",
          }}
        >
          <Typography variant="h2">Recipes overview</Typography>
          <Button
            variant="contained"
            onClick={() => setIsCreateEditModalOpen(true)}
          >
            + New recipe
          </Button>
        </Box>
        <Box display="flex" flexWrap="wrap">
          {recipes?.map((recipe) => {
            return (
              <RecipeCard
                title={recipe.name}
                image={recipe.imageURL}
                id={recipe.id}
                key={recipe.id}
                handleEdit={() => {
                  setIsEditMode(true);
                  setIsCreateEditModalOpen(true);
                  setRecipeToEdit(recipe);
                }}
              />
            );
          })}
        </Box>
      </Box>
      <CreateEditRecipe
        open={isCreateEditModalOpen}
        handleClose={() => {
          setIsCreateEditModalOpen(false);
          setIsEditMode(false);
          setRecipeToEdit(null);
        }}
        isEditMode = {isEditMode}
        recipeToEdit = {recipeToEdit}
      />

    </>
  );
};
export default RecipesOverview;
