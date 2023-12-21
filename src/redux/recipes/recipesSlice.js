import {createSlice} from '@reduxjs/toolkit'
const recipesSlice = createSlice({
    name : 'recipes',
    initialState: [],
    reducers: {
        setRecipes(state,action){
            state = action.payload;
        }
    }
}) ;
export const {setRecipes} = recipesSlice.actions;
export default recipesSlice.reducer;