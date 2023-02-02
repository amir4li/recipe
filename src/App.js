import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';

import Header from './components/Header';
import HomePage from "./pages/HomePage";
import RecipeMenu from './pages/RecipeMenu';
import Recipe from './pages/SingleRecipe';
import MyRecipes from './pages/MyRecipes';
import AddRecipe from './pages/AddRecipe';
import UpdateRecipe from './pages/UpdateRecipe';

import SignUp from './pages/SignUp';
import Login from './pages/Login';





function App() {
  return (
    <BrowserRouter>
      <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/recipes/:menu" element= { <RecipeMenu /> } />
        <Route path="/recipes/:menu/:recipeId" element= { <Recipe /> } />
        <Route path="/my-recipes" element={ <MyRecipes /> }/>
        <Route path="/new-recipe" element={ <AddRecipe/> }/>
        <Route path="/update-recipe/:recipeId" element={ <UpdateRecipe/> }/>
        <Route path="/signup" element={ <SignUp /> }/>
        <Route path="/login" element={ <Login /> }/>
      </Routes>
      <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

