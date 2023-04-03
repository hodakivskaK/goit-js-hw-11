import { fetchImages } from './fetchImage';
import Notiflix from 'notiflix';


const searchFormEl = document.querySelector('.search-form');
const galleryBoxEl = document.querySelector('.gallery');
const btnLoadMoreEl = document.querySelector('.load-more')
let searchQuery = '';
let NUMBER_PAGE = 1;

const onSearchConstSubmit =  evn => {
  evn.preventDefault();
  clearMarkupGallery();
  setTimeout(() => btnLoadMoreEl.classList.remove("is-hidden"), 1000);
    searchQuery = evn.currentTarget.elements.searchQuery.value.trim();
    console.log(searchQuery);

    NUMBER_PAGE = 1;
    if (searchQuery.length === 0) {
        return Notiflix.Notify.failure("Sorry..");
    }
  fetchImages(searchQuery, NUMBER_PAGE).then(images => images.map(image => createMarkupGallery(image.webformatURL, image.tag, image.likes, image.views, image.comments, image.downloads)));  // image.tag, image.views, image.comments, image.downloads//
  
}

function onLoadMore() {
    NUMBER_PAGE += 1;

  fetchImages(searchQuery, NUMBER_PAGE).then(images =>
        
    images.map(image => createMarkupGallery(image.webformatURL, image.tag, image.likes, image.views, image.comments, image.downloads)));  // image.tag, image.views, image.comments, image.downloads//
    
    btnLoadMoreEl.classList.remove("is-hidden")
}

searchFormEl.addEventListener("submit", onSearchConstSubmit)
btnLoadMoreEl.addEventListener("click", onLoadMore)
// , tag, likes, views, comments, downloads
function createMarkupGallery(pageURL, tag, likes, views, comments, downloads) {
  console.log(downloads)
   let markup =  `<div class="photo-card">
  <img src='${pageURL}' alt="${tag}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes </b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views </b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads </b>${downloads}
    </p>
  </div>
</div>`
    
    galleryBoxEl.insertAdjacentHTML("beforeend", markup)
     
}

function clearMarkupGallery() {
  galleryBoxEl.innerHTML = ''; 
}