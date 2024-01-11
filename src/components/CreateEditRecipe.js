import {
  Dialog,
  DialogContent,
  Button,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Box } from "@mui/system";
import { Fragment, useEffect, useState } from "react";
import axiosInstance from "../axios-instance";
import { BASE_INGREDIENT } from "../constants";
import { useDispatch } from "react-redux";
import { addRecipe, editRecipe } from "../redux/recipes/recipesSlice";
const CreateEditRecipe = ({ open, handleClose, isEditMode, recipeToEdit }) => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([{ ...BASE_INGREDIENT }]);
  const [steps, setSteps] = useState([""]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const textFieldStyle = {
    width: "60%",
    marginTop: "5px",
  };
  const handleIngredientChange = (fieldToChange, index, value) => {
    const ingredientsCopy = JSON.parse(JSON.stringify(ingredients));
    ingredientsCopy[index][fieldToChange] = value;
    setIngredients(ingredientsCopy);
  };
  const handleStepChange = (index, value) => {
    const ingredientsCopy = JSON.parse(JSON.stringify(steps));
    ingredientsCopy[index] = value;
    setSteps(ingredientsCopy);
  };
  const handleAddingIngredient = () => {
    setIngredients((prevState) => [...prevState, { ...BASE_INGREDIENT }]);
  };
  const handleAddingStep = () => {
    setSteps((prevState) => [...prevState, ""]);
  };
  const resetModalClose = () => {
    handleClose();
    setName("");
    setIngredients([{ ...BASE_INGREDIENT }]);
    setSteps([""]);
  };
  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    setMessage('');
  };
  const createRecipe = async () => {
    try {
      if (isEditMode) {
        const recipe = {
          ...recipeToEdit,
          name,
          ingredients,
          steps,
          imageURL: recipeToEdit?.imageURL,
        };
        const result = await axiosInstance.put(
          `/recipes/${recipeToEdit.id}`,
          recipe
        );
        if (result.status === 200) {
          resetModalClose();
          dispatch(editRecipe(recipe));
          setMessage("Recipe successfully edited");
          setShowSnackbar(true);
        }
        console.log(result);
      } else {
        const recipe = {
          id: uuidv4(),
          name,
          ingredients,
          steps,
          imageURL: "",
        };
        const result = await axiosInstance.post("/recipes", recipe);
        if (result?.status === 201) {
          dispatch(addRecipe(result.data));
          setMessage("Recipe successfully added");
          setShowSnackbar(true);
          resetModalClose();
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    if (isEditMode) {
      setName(recipeToEdit.name);
      setIngredients(recipeToEdit.ingredients);
      setSteps(recipeToEdit.steps);
    }
  }, [isEditMode]);
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnackbar}
        onClose={handleCloseSnackbar}
        message={message}
        key={"top" + "right" + message}
        autoHideDuration={6000}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
        {message}
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Create recipe</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            sx={textFieldStyle}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Box
            sx={{
              borderTop: "1px solid gray",
              marginTop: "10px",
              paddingTop: "5px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {ingredients.map((ingredient, index) => (
              <Fragment key={index}>
                <TextField
                  label="Ingredient name"
                  variant="outlined"
                  sx={textFieldStyle}
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange("name", index, e.target.value)
                  }
                />
                <TextField
                  label="Ingredient quantity"
                  variant="outlined"
                  sx={textFieldStyle}
                  value={ingredient.quantity}
                  onChange={(e) =>
                    handleIngredientChange("quantity", index, e.target.value)
                  }
                />
                <FormControl sx={textFieldStyle}>
                  <InputLabel id="ingredient-type-label">Type</InputLabel>
                  <Select
                    labelId="select-type-label"
                    //id="demo-simple-select"
                    value={ingredient.type}
                    label="Type"
                    onChange={(e) =>
                      handleIngredientChange("type", index, e.target.value)
                    }
                  >
                    <MenuItem value="Meat">Meat</MenuItem>
                    <MenuItem value="Vegetable">Vegetable</MenuItem>
                    <MenuItem value="Dairy">Dairy</MenuItem>
                  </Select>
                </FormControl>
              </Fragment>
            ))}
            <Button
              variant="outlined"
              sx={{ alignSelf: "end" }}
              onClick={() => handleAddingIngredient()}
            >
              + Add ingredient
            </Button>
            <Box
              sx={{
                borderTop: "1px solid gray",
                marginTop: "10px",
                paddingTop: "5px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {steps.map((step, index) => (
                <TextField
                  label={`Step ${index + 1}`}
                  variant="outlined"
                  sx={textFieldStyle}
                  value={step}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  key={index}
                />
              ))}
            </Box>
            <Button
              variant="outlined"
              sx={{ alignSelf: "end" }}
              onClick={handleAddingStep}
            >
              + Add step
            </Button>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "end", padding: "20px 24px" }}
        >
          <Button variant="outlined" onClick={resetModalClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={createRecipe}>
            {isEditMode ? "Edit" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default CreateEditRecipe;
