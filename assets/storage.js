// =========================================================================
// LOCALSTORAGE MANAGEMENT
// =========================================================================

const STORAGE_KEY = 'weatherapp_favorites';

// Retrieve the list of favorite cities from localStorage
export const getFavorites = () => {
    try{
        const favoritesCity = localStorage.getItem(STORAGE_KEY);
        if(!favoritesCity) return [];

        return JSON.parse(favoritesCity);
    }catch(error){
        console.error('Erro ao ler favoritos:', error);
        return [];
    }  
};


// Persist the favorites array to localStorage as a JSON string
export const saveFavorites = (favorites) => {
    try{
        const favoritesString = JSON.stringify(favorites);
        localStorage.setItem(STORAGE_KEY, favoritesString);

        return true;
    }catch (error){
        console.error('Erro ao salvar no localStorage:', error);

        return false;
    }
};


// Add a city to favorites if it doesn't already exist
export const addFavorite = (cityData) => {
    const favorites = getFavorites();

    // Prevent duplicates by checking city name (case-insensitive)
    const alreadyExists = favorites.find(item => 
    item.city.toLowerCase() === cityData.city.toLowerCase());

  if(alreadyExists){
    return false;
  }

  favorites.push(cityData);
  saveFavorites(favorites);
  return true;
};


//Remove a city from the favorites list by name.
export const removeFavorite = (cityName) => {
    const favorites = getFavorites();

    //Create a new list excluding the specified city
    const filteredList = favorites.filter(item => 
    item.city.toLowerCase() !== cityName.toLowerCase());
    
    const removedSomething = filteredList.length < favorites.length;

    saveFavorites(filteredList);

    return removedSomething; 
};


// Check if a specific city is already in the favorites list
export const isFavorite = (cityName) => {
    const favorites = getFavorites();

    return favorites.some(item => 
    item.city.toLowerCase() === cityName.toLowerCase());
};