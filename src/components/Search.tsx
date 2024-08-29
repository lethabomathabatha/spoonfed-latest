import { useState, useEffect, useRef } from 'react';
import '../App.css';
// import { SunFill, MoonFill, Clock, Heart, ArrowDownLeft, People } from 'react-bootstrap-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Custom type definition for recipe data
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

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);
  const [searchIngredients, setSearchIngredients] = useState('');
  const [numOfResults, setNumOfResults] = useState(3);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number | null>(null);
  const [searchClicked, setSearchClicked] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isBackgroundDimmed, setIsBackgroundDimmed] = useState(false);

  const apiId = import.meta.env.VITE_API_ID;
  const apiKey = import.meta.env.VITE_API_KEY;

  // Handle search from API
  const handleSearch = () => {
    setLoading(true);
    setNumOfResults(3);
    const searchQuery = `${searchIngredients}`;
    fetch(`https://api.edamam.com/search?q=${searchQuery}&app_id=${apiId}&app_key=${apiKey}&from=0&to=${numOfResults}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setRecipesData(data.hits);
        setLoading(false);
        setSearchClicked(true);
      })
      .catch((error) => {
        console.log('Fetch Error:', error);
        setLoading(false);
      });
  };

  // Load more recipes
  const loadMore = () => {
    setLoading(true);
    setNumOfResults((prevResults) => prevResults + 3);
    handleSearch();
  };

  // Display selected recipe's overlay
  const openRecipeOverlay = (recipeIndex: number | null) => {
    setSelectedRecipeIndex(recipeIndex);
    setIsOverlayOpen(true);
    setIsBackgroundDimmed(true);
  };

  const closeRecipeOverlay = () => {
    setSelectedRecipeIndex(null);
    setIsOverlayOpen(false);
    setIsBackgroundDimmed(false);
  };

  // Get full recipe instructions from recipe source website
  const getRecipeInstructions = (url: string) => {
    window.open(url, '_blank');
  };

  // Time-based greeting message
  const [greetingIcon, setGreetingIcon] = useState(<i className="bi bi-brightness-high-fill"></i>);

  // using useRef vs regular variable stores the greeting without forcing too many re-renders
  const greetingRef = useRef<string>('');

  useEffect(() => {
    const time = new Date().getHours();
    if (time >= 3 && time < 12) {
      greetingRef.current = `Good Morning`;
      setGreetingIcon(<i className="bi bi-brightness-alt-high-fill"></i>);
    } else if (time >= 12 && time < 18) {
      greetingRef.current = `Good Afternoon`;
      setGreetingIcon(<i className="bi bi-brightness-high-fill"></i>);
    } else if (time >= 18 && time < 24) {
      greetingRef.current = `Good Evening`;
      setGreetingIcon(<i className="bi bi-moon-stars-fill"></i>);
    } else {
      greetingRef.current = `Good Night`;
      setGreetingIcon(<i className="bi bi-moon-stars-fill"></i>);
    }
  }, []);

  return (
    <>
      <div className="search">
        <div className="d-flex flex-column p-4 text-center">
          <span className="font-weight-semibold display-4">{greetingRef.current}{greetingIcon}</span>
          <span className="display-4">Let's find you something tasty to make!</span>
        </div>

        {/* Search bar for ingredients */}
        <div className="d-flex justify-content-center align-items-center gap-2 mb-4">
          <input
            type="text"
            value={searchIngredients}
            onChange={(e) => setSearchIngredients(e.target.value)}
            placeholder="Enter ingredients"
            className="form-control w-50"
          />
          <i className="bi bi-search h5 cursor-pointer" onClick={handleSearch}></i>
        </div>

        {/* Fetch and map through recipe data */}
        {loading ? (
          <p className="display-4 text-center">Loading...</p>
        ) : (
          <>
            {searchClicked && searchIngredients && (
              <p className="pt-2 text-center display-4">Results for <strong>"{searchIngredients}"</strong></p>
            )}

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {recipesData.map((recipe, index) => (
                <div key={recipe.recipe.uri} className="col">
                  <div className="card h-100 border-dark">
                    <img
                      src={recipe.recipe.image}
                      alt={recipe.recipe.label}
                      className="card-img-top"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title text-center">{recipe.recipe.label}</h5>
                      <p className="card-text text-center">{recipe.recipe.source}</p>
                      {recipe.recipe.totalTime > 0 && (
                        <p className="card-text text-center">
                        <i className="bi bi-alarm">{recipe.recipe.totalTime} min</i>
                          {/* <Clock className="me-2" /> */}
                        </p>
                      )}
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          onClick={() => openRecipeOverlay(index)}
                          className="btn btn-dark"
                        >
                          View Recipe
                        </button>
                        <i className="bi bi-heart h5 cursor-pointer"></i>                    
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Conditionally render 'Load More' button if search results are greater than 3 */}
        {recipesData.length >= 3 && (
          <div className="text-center mt-4">
            <button onClick={loadMore} className="btn btn-dark">
              Load More
            </button>
          </div>
        )}

        {/* Dimming background when overlay is active */}
        {isBackgroundDimmed && <div className="bg-dark opacity-50 position-fixed w-100 h-100 top-0"></div>}

        {/* Overlay */}
        {isOverlayOpen && selectedRecipeIndex !== null && (
          <div className="position-fixed border border-dark p-0 rounded-2xl top-50 start-50 translate-middle w-75 bg-white">
            <div className="relative">
              <img
                src={recipesData[selectedRecipeIndex]?.recipe.image}
                alt={recipesData[selectedRecipeIndex]?.recipe.label}
                className="rounded-top w-100 "
              />
              <i className="bi bi-arrow-down-left-circle-fill position-absolute top-0 end-0 translate-middle bg-dark text-white p-1"
                onClick={closeRecipeOverlay}></i>
            </div>
            <div className="text-center">
              <h2 className="d-flex justify-content-center align-items-center gap-3 p-2 mb-2 bg-white shadow-sm">
                {recipesData[selectedRecipeIndex]?.recipe.label}
                <i className="bi bi-heart"></i>
              </h2>
              <h3 className="d-flex justify-content-center align-items-center gap-1 mb-2">
              <i className="bi bi-people"></i> {recipesData[selectedRecipeIndex]?.recipe.yield}
              </h3>
              <h4 className="text-center">Ingredients</h4>
              <ul className="list-unstyled">
                {recipesData[selectedRecipeIndex]?.recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.text}</li>
                ))}
              </ul>
              <button
                onClick={() => getRecipeInstructions(recipesData[selectedRecipeIndex]?.recipe.url)}
                className="btn btn-light border-dark m-4"
              >
                Get Instructions
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
