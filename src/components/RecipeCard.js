import { Card, CardHeader, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
const RecipeCard = ({ title, image, id}) => {
    const navigate = useNavigate();
    const navigateToDetailsPage = () => {
        navigate(`/recipe/${id}`);
    }
  return (
    <Card sx={{
        width: 350,
        margin: '20px',
        transition: 'transform 0.3s', // Adding transition for the hover effect
        '&:hover': {
          transform: 'scale(1.02)', 
          cursor: 'pointer', 
          boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)', 
        },
      }} onClick={navigateToDetailsPage}>
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
    </Card>
  );
};
export default RecipeCard;
