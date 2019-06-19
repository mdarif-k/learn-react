import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  const APP_ID = '1cb20aef';
  const APP_KEY = '9696f28826821885ebd1582d871d05b0';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('banana');

  useEffect(() => {
    getRecipe();
  }, [query]);

  const getRecipe = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const onSubmitSearch = e => {
    e.preventDefault();
    setQuery(search);
  }

  return (
    <div>
       <nav className="navbar navbar-light bg-light">
        <p className="navbar-brand">Recipe App</p>
        <form className="form-inline" onSubmit={onSubmitSearch}>
          <input className="form-control mr-sm-2" placeholder="Search" aria-label="Search" type="text" value={search} onChange={updateSearch} />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>
      <div className="recipe-list">
        {
          recipes && (recipes.length > 0) && recipes.map((recipe, i) => (
            <Recipe
              title={recipe.recipe.label}
              image={recipe.recipe.image}
              calories={recipe.recipe.calories}
              ingredients={recipe.recipe.ingredients}
              key={i}
            />
          ))
        }
      </div>
    </div>
  )
}

export default App;
