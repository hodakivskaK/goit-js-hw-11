import Notiflix from 'notiflix';
const axios = require('axios');

const API_KEY = `35000520-c4969b19b47eca869fc76b6fc`;
const URL = "https://pixabay.com/api/";


export const fetchImages = async (imageName, NUMBER_PAGE) => {
    try {
        const imageResponse = await fetch(`${URL}?key=${API_KEY}&q=${imageName}&image_type=photo&orientation=horizontal&horizontal&safesearch=true&page=${NUMBER_PAGE}&per_page=40`)
        if (!imageResponse.ok) {
            throw new Error(Notiflix.Notify.failure("Sorry, you search wrong"))
        }
        
        const imageJson = await imageResponse.json();
       
        if (imageJson.total === 0) {
            throw new Error(Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again."))
            
        }
        
        return await imageJson;
        
    } catch {
        
    }
   
}

// fetch(`${URL}?key=${API_KEY}&q='cat'&image_type=photo&orientation=horizontal&horizontal&safesearch=true`).then(image => image.json());
