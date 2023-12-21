import {configureStore} from '@reduxjs/toolkit';
import recipeReducer from './recipes/recipesSlice';
export const store = configureStore({
    reducer: {
        recipes: recipeReducer,
    }
});