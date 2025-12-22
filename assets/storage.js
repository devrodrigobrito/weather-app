
const STORAGE_KEY = 'weatherapp_favorites';

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


export const addFavorite = (cityData) => {
    const favorites = getFavorites();

    const alreadyExists = favorites.find(item => 
    item.city.toLowerCase() === cityData.city.toLowerCase());

  if(alreadyExists){
    return false;
  }

  favorites.push(cityData);
  saveFavorites(favorites);
  return true;
};


export const removeFavorite = (cityName) => {
    const favorites = getFavorites();

    const filteredList = favorites.filter(item => 
    item.city.toLowerCase() !== cityName.toLowerCase());
    
    const removedSomething = filteredList.length < favorites.length;

    saveFavorites(filteredList);

    return removedSomething; 
};


export const isFavorite = (cityName) => {
    const favorites = getFavorites();

    return favorites.some(item => 
    item.city.toLowerCase() === cityName.toLowerCase());
};