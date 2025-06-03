import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import './HomePage.css'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import Carousel from 'react-bootstrap/Carousel';
import Footer from '../components/Footer/Footer';
import axios from 'axios'
import RecipePage from '../components/RecipePage/RecipePage';
const HomePage = () => {
 // Styled Components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '0.6rem',
  backgroundColor: '#f5f5f5',
  border: '1px solid #ccc',
  // pointerEvents:'none',
  width: '100%',
  maxWidth: 450,
  marginLeft: 0,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  left: 0, // Ensure icon is at the left edge
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'red',
  width: '100%',
  // Make sure the input itself has enough left padding for the icon
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: '5rem', // Space for icon
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));


  const [random, setRandom] = useState([]);
  const [index, setIndex] = useState(0);

  const [searchRecipies, setSearchRecipies] = useState([]);
  const [input, setInput] = useState('');
  useEffect( () => {
      try {
        const getPopularRecipes = async () => {
              const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
              setRandom(response.data.meals)
              console.log(response.data.meals)
      }
      getPopularRecipes();
      }catch(err) {
        console.log(err)
      }
  },[])
  // for carousel using random recipe for main page
    const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
    try {
        const getPopularRecipes = async () => {
              const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
              setRandom(response.data.meals)
              console.log(response.data.meals)
      }
      getPopularRecipes();
      }catch(err) {
        console.log(err)
      }
  };

  // for searching by name
  const handleSearch = async(e) => {
    setInput(e.target.value)
    try {
    const response = await axios.get(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=' + input
    );
    console.log(input)
    if (response.data.meals) {
      setSearchRecipies(response.data.meals);
      console.log(response.data.meals)
    } else {
      setSearchRecipies([]);
    }
  } catch (error) {
    console.error('API call failed:', error);
  }
  }
  return (
    <>
    {/* // <div> */}
      <div className='outer-box hero-background'>
          <NavBar/>
          <div className='inner-box'>
            
            <div className='box1'>
              <div>
                  <h2>Recipe Hub</h2>
                  <h3>Discover, Cook, and Savor Every Flavor!</h3>
              </div>
            </div>
            <div className='box2'>
              {/* <img className='home-image' src="/recipe-homepage.png" alt="recipe-image" /> */}
              <Carousel activeIndex={index} className='home-image' onSelect={handleSelect}>
        {random.map((recipe, index)=>
        
      <Carousel.Item key={index} height="100%">
        <img
          className="d-block w-100 rounded-4"
          src={recipe.strMealThumb} // Adjust property name as per your API
          alt={`Slide ${index + 1}`}
          // style={{ height: "200px", objectFit: "cover" }}
        />
        {/* <Carousel.Caption>
          <h3>Slide {index+1}</h3>
           {/* <p>Delicious recipes to try today!</p> */}
        {/* </Carousel.Caption> */} 
      </Carousel.Item>
        )}
    </Carousel>
            </div>
          </div>
      </div>

       <div className="search-bar" style={{ padding: 32, display: 'flex', justifyContent: 'center' }}>
  <div className="search-input-wrapper">
    <span className="search-icon">
      {/* You can use an SVG or a font icon */}
      <svg width="20" height="20" fill="#888" viewBox="0 0 24 24">
        <path d="M21.71 20.29l-3.4-3.39A8,8,0,1,0,18,19.59l3.39,3.4a1,1,0,0,0,1.41-1.41ZM5,11A6,6,0,1,1,11,17,6,6,0,0,1,5,11Z"/>
      </svg>
    </span>
    <input
      style={{ width: "100%" }}
      type="text"
      placeholder="Enter ingredients (comma-separated)"
      value={input}
      onChange={handleSearch}
      className="search-input"
    />
  </div>
</div>
        {/* <button onClick={handleSearch} className="search-button">
          Search
        </button> */}
       
      {searchRecipies.length > 0 ? 
       <div className='random-recipes'>
          {searchRecipies.map((recipe,index)=>
            <RecipeCard key={index} image={recipe.strMealThumb} name={recipe.strMeal} area={recipe.strArea} id={recipe.idMeal}/>
          )}
       </div> 
       :
       <div style={{padding:'3rem'}}>
         <h3><i>Search New Recipies</i></h3>
       </div>
      }
    {/* // </div> */}
    <Footer/>
  </>
  )
}

export default HomePage
