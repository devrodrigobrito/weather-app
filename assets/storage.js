
const STORAGE_KEY = 'weatherapp_favorites';

export const getFavorites = () => {
    try{
        const favoritesCity = localStorage.getItem(STORAGE_KEY);
        if(!favoritesCity) return [];

        return JSON.parse(favoritesCity)
    }catch(error){
        console.error('Erro ao ler favoritos:', error);
        return [];
    }  
};