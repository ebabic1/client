import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import RecipesOverview from "./views/RecipesOverview";
import RecipeDetails from "./views/RecipeDetails";

function App() {
  return (
    <div className="App-header">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RecipesOverview/>} />
          <Route path = "/recipe/:id" element={<div><RecipeDetails/></div>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
