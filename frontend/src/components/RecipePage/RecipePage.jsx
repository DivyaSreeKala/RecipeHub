import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';

const RecipePage = () => {
    const { id } = useParams();
    const [recipe,setRecipe] = useState({})
    useEffect( () => {
      try {
        const geRecipe = async () => {
              const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
              setRecipe(response.data.meals[0])
              console.log(response.data.meals[0])
      }
      geRecipe();
      }catch(err) {
        console.log(err)
      }
  },[])
    if (!recipe) return <div>No recipe found.</div>;
   const getIngredientsList = (recipe) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(
          (measure && measure.trim() !== "" ? `${measure.trim()} ` : "") +
          ingredient.trim()
        );
      }
    }
    return ingredients;
  };
  const ingredients = getIngredientsList(recipe);


  return (
    <div style={{
      maxWidth: 600,
      margin: "32px auto",
      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      borderRadius: 16,
      background: "#fff",
      overflow: "hidden",
      fontFamily: "sans-serif"
    }}>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        style={{
          width: "100%",
          height: 320,
          objectFit: "cover",
          display: "block"
        }}
      />
      <div style={{ padding: 24 }}>
        <h1 style={{ margin: "0 0 8px 0", fontSize: "2rem" }}>{recipe.strMeal}</h1>
        <div style={{ color: "#888", marginBottom: 16, fontSize: "1rem" }}>
          {recipe.strCategory} | {recipe.strArea}
        </div>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ marginBottom: 8, fontSize: "1.3rem" }}>Instructions</h2>
          <p style={{ margin: 0, whiteSpace: "pre-line" }}>{recipe.strInstructions}</p>
        </div>
        <div>
          <h2 style={{ marginBottom: 8, fontSize: "1.3rem" }}>Ingredients</h2>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            {ingredients.map((item, idx) => (
              <li key={idx} style={{ marginBottom: 8 }}>{item}</li>
             ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default RecipePage