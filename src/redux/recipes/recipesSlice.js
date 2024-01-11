import {createSlice} from '@reduxjs/toolkit'
const recipesSlice = createSlice({
    name : 'recipes',
    initialState: {
        recipes: [],
    },
    reducers: {
        setRecipes: (state, action) => {
            return { ...state, recipes: action.payload };
          },
        addRecipe(state,action){
            const recipe = action.payload;
            state.recipes=[...state.recipes,recipe];
        },
        removeRecipe(state,action){
            const recipeId = action.payload;
            state.recipes = state.recipes.filter(item => item.id !== recipeId);
        },
        editRecipe(state,action){
            const recipe = action.payload;
            const recipeToEdit = state.recipes.findIndex((item) => item.id === recipe.id)
            const recipesCopy = [...state.recipes];
            if (recipeToEdit !== -1) {
                recipesCopy[recipeToEdit] = recipe;
                return {...state,recipes:recipesCopy};
            }
        }
    }
}) ;
export const {setRecipes, addRecipe, removeRecipe, editRecipe} = recipesSlice.actions;
export default recipesSlice.reducer;