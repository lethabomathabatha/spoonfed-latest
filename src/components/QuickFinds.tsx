import { useState } from 'react';
import '../App.css';
// import { XCircleFill } from 'react-bootstrap-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Custom type definition for recipe data
type Recipe = {
  key: string;
  recipe: {
    uri: string;
    label: string;
    image: string;
    ingredients: string[];
    url: string;
    thumbnailImages: string[];
    totalTime: number;
    source: string;
    yield: number;
    cuisineType: string;
  };
};

export default function QuickFinds() {
  const [loading, setLoading] = useState(false);
  const [foodTypes, setFoodTypes] = useState<Recipe[]>([]);

  const apiId = import.meta.env.VITE_API_ID;
  const apiKey = import.meta.env.VITE_API_KEY;

  // Handle pre-set food-type filtering
  function loadFoodTypes(foodType: string) {
    setLoading(true);
    fetch(
      `https://api.edamam.com/search?q=${foodType}&app_id=${apiId}&app_key=${apiKey}&from=0&to=5`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setFoodTypes(data.hits);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Fetch Error:', error);
        setLoading(false);
      });
  }

  function closeFoodTypes() {
    setFoodTypes([]);
  }

  // Click handlers for different food types
  const handleChickenClick = () => loadFoodTypes('chicken');
  const handleBeefClick = () => loadFoodTypes('beef');
  const handleFishClick = () => loadFoodTypes('fish');
  const handlePorkClick = () => loadFoodTypes('pork');
  const handleVegetarianClick = () => loadFoodTypes('vegetarian');
  const handleRiceClick = () => loadFoodTypes('rice');
  const handleGlutenFreeClick = () => loadFoodTypes('gluten free');

  // Get full recipe instructions from recipe source website
  const getRecipeInstructions = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Quick picks */}
      <div className="d-flex flex-wrap gap-3 m-4 flex-row">
      
        <button onClick={handleChickenClick} className="btn btn-outline-dark py-2 px-3 rounded-pill">
          Chicken
        </button>

        <button onClick={handleBeefClick} className="btn btn-outline-dark py-2 px-4 rounded-pill">
          Beef
        </button>

        <button onClick={handleFishClick} className="btn btn-outline-dark py-2 px-4 rounded-pill">
          Fish
        </button>

        <button onClick={handlePorkClick} className="btn btn-outline-dark py-2 px-4 rounded-pill">
          Pork
        </button>

        <button onClick={handleVegetarianClick} className="btn btn-outline-dark py-2 px-3 rounded-pill">
          Vegetarian
        </button>

        <button onClick={handleRiceClick} className="btn btn-outline-dark py-2 px-4 rounded-pill">
          Rice
        </button>

        <button onClick={handleGlutenFreeClick} className="btn btn-outline-dark py-2 px-3 rounded-pill">
          Gluten Free
        </button>
        </div>

        <div className="d-flex flex-wrap gap-3 m-4 flex-row justify-content-center text-center">
        {/* Render selected food type results */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          foodTypes.map((recipe) => (
            <div key={recipe.recipe.uri} className="card m-2 p-3" style={{ width: '18rem' }}>
              <img src={recipe.recipe.image} className="card-img-top" alt={recipe.recipe.label} />
              <div className="card-body">
                <h5 className="card-title">{recipe.recipe.label}</h5>
                <button
                  onClick={() => getRecipeInstructions(recipe.recipe.url)}
                  className="btn btn-outline-dark"
                >
                  Get Instructions
                </button>
              </div>
            </div>
          ))
        )}

        {/* Conditionally render close button */}
        {foodTypes.length > 0 && (       
          <i className="bi bi-heart-fill w-14 cursor-pointer" style={{ fontSize: '24px', color: 'black' }} onClick={closeFoodTypes}></i>
        )}
      </div>
    </>
  );
}
