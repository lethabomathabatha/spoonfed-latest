import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import '../App.css';

// custom type definition for recipe data
type Recipe = {
  key: string;
  recipe: {
    uri: string;
    label: string;
    image: string;
    ingredients: { text: string }[];
    url: string;
    thumbnailImages: string[];
    totalTime: number;
    source: string;
    yield: number;
    cuisineType: string;
  };
};

export default function Recommendations() {
  const [loading, setLoading] = useState(false);
  const [randomRecipesData, setRandomRecipesData] = useState<Recipe[]>([]);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isBackgroundDimmed, setIsBackgroundDimmed] = useState(false);

  const apiId = import.meta.env.VITE_API_ID;
  const apiKey = import.meta.env.VITE_API_KEY;

  // Function to load random recipes
  function loadRandomRecipes() {
    setLoading(true);
    fetch(
      `https://api.edamam.com/search?q=random&app_id=${apiId}&app_key=${apiKey}&from=0&to=10`
    )
      .then((res) => res.json())
      .then((data) => {
        // Randomize results
        const randomRecipes = data.hits.sort(() => Math.random() - 0.5);
        setRandomRecipesData(randomRecipes);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Fetch Error:', error);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadRandomRecipes();
  }, []);

  // Display selected recipe's overlay
  function openRecipeOverlay(recipeIndex: number | null) {
    setSelectedRecipeIndex(recipeIndex);
    setIsOverlayOpen(true);
    setIsBackgroundDimmed(true);
  }

  // get full recipe instructions from recipe source website
  const getRecipeInstructions = (url: string) => {
    window.open(url, '_blank')
  }

  // Close the overlay
  function closeRecipeOverlay() {
    setSelectedRecipeIndex(null);
    setIsOverlayOpen(false);
    setIsBackgroundDimmed(false);
  }

  return (
    <div className='container mt-5 p-4 rounded' style={{ background: 'linear-gradient(210deg, rgba(253,81,29,1) 27%, rgba(252,164,69,1) 88%)' }}>
      <p className='h4 mb-4'>Want to try something new?</p>
      {loading ? (
        <div className='text-center h5'>Loading...</div>
      ) : (
        <div
          className='d-flex overflow-auto position-relative custom-scrollbar'
          style={{ whiteSpace: 'nowrap' }} 
        >
          {randomRecipesData.map((recipe, index) => (
            <div key={recipe.recipe.uri} className='card border-dark me-3' style={{ minWidth: '300px', maxWidth: '300px', overflow: 'hidden' }}>
              <img
                src={recipe.recipe.image}
                alt={recipe.recipe.label}
                className='card-img-top rounded'
                style={{ objectFit: 'cover', height: '200px' }}
              />
              <div className='card-body'>
                <h5 className='card-title text-center' style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {recipe.recipe.label}
                </h5>
                <p className='card-text text-center' style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {recipe.recipe.source}
                </p>
                {recipe.recipe.totalTime > 0 && (
                  <p className='card-text text-center'>
                    {/* <ClockIcon className='me-1' /> {recipe.recipe.totalTime} min */}
                    <i className="bi bi-alarm">{recipe.recipe.totalTime} min</i>
                  </p>
                )}
              </div>
              <div className='card-footer text-center' style={{ background: 'none!important' }}>
                <button
                  onClick={() => openRecipeOverlay(index)}
                  className='btn btn-dark'
                >
                  View Recipe
                </button>
                {/* <HeartIcon className='ms-2' /> */}
                <i className="bi bi-heart"></i>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dimming background when overlay is active */}
      {isBackgroundDimmed && <div className='modal-backdrop show'></div>}

      {/* Recipe overlay */}
      {isOverlayOpen && selectedRecipeIndex !== null && (
        <div className='modal show d-block' role='dialog'>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>{randomRecipesData[selectedRecipeIndex]?.recipe.label}</h5>
                <button type='button' className='btn-close' onClick={closeRecipeOverlay}></button>
              </div>
              <div className='modal-body'>
                <img
                  src={randomRecipesData[selectedRecipeIndex]?.recipe.image}
                  alt={randomRecipesData[selectedRecipeIndex]?.recipe.label}
                  className='img-fluid rounded mb-3'
                />
                <h6>Ingredients</h6>
                <ul className='list-unstyled'>
                  {randomRecipesData[selectedRecipeIndex]?.recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.text}</li>
                  ))}
                </ul>
              </div>
              <div className='modal-footer'>
                <button
                  className='btn btn-primary'
                  onClick={() => getRecipeInstructions(randomRecipesData[selectedRecipeIndex]?.recipe.url)}
                >
                  Get Instructions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
