import { useParams } from "react-router-dom";

const RecipeDetails = () => {
    const {id} = useParams();
    console.log(id);
    return (
        <div>
            <h1>Details</h1>
        </div>
    )
}
export default RecipeDetails;
