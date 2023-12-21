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
    }
}) ;
export const {setRecipes} = recipesSlice.actions;
export default recipesSlice.reducer;