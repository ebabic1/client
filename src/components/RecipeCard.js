import { Card, CardActions, CardHeader, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import  axiosInstance  from "../axios-instance";
import { useDispatch } from "react-redux";
import { removeRecipe } from "../redux/recipes/recipesSlice";
const RecipeCard = ({ title, image, id, handleEdit }) => {
  const navigate = useNavigate();
  const navigateToDetailsPage = () => {
    navigate(`/recipe/${id}`);
  };
  const dispatch = useDispatch();
  const handleDelete = async () => {
      const result = await axiosInstance.delete(`/recipes/${id}`);
      if (result.status === 200){
        dispatch(removeRecipe(id));
      }
  }

  return (
    <Card
      sx={{
        width: 350,
        margin: "20px",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.02)",
          cursor: "pointer",
          boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
        },
      }}
    >
    <Box
    onClick={navigateToDetailsPage}>
    <CardMedia
        component="img"
        height="200"
        width="350"
        image={image}
        alt={title}
      />
      <CardHeader
        title={title}
        sx={{
          height: "50px",
        }}
      />
    </Box>

      <Box
      sx={{
        display:'flex',
        justifyContent:'flex-end',
      }}>
        <CardActions>
          <EditIcon 
            onClick={handleEdit} 
          />
        </CardActions>
        <CardActions>
          <Delete
          onClick={handleDelete} />
        </CardActions>
      </Box>
    </Card>
  );
};
export default RecipeCard;
