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
      btnLoadMoreEl.classList.add("is-hidden")

    searchQuery = evn.currentTarget.elements.searchQuery.value.trim();
    console.log(searchQuery);

    NUMBER_PAGE = 1;
    if (searchQuery.length === 0) {
        return Notiflix.Notify.failure("Sorry.. Please write anything");
  }

  fetchImages(searchQuery, NUMBER_PAGE).then(images => {
    if (images === undefined) {
      return
    }

    images.hits.map(image => createMarkupGallery(image.webformatURL,
    image.tag,
    image.likes,
    image.views,
    image.comments,
    image.downloads))
    });
}

function onLoadMore() {
  NUMBER_PAGE += 1;
  
  fetchImages(searchQuery, NUMBER_PAGE).then(images => {
    if (images.totalHits <= 40) {
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
      btnLoadMoreEl.classList.add("is-hidden");
    }

    images.hits.map(image => createMarkupGallery(image.webformatURL,
      image.tag,
      image.likes,
      image.views, image.comments, image.downloads))
  }); 
}

searchFormEl.addEventListener("submit", onSearchConstSubmit)
btnLoadMoreEl.addEventListener("click", onLoadMore)

function createMarkupGallery(pageURL, tag, likes, views, comments, downloads) {
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
  
  setTimeout(() => removeClassHidden(), 1000);
  
  galleryBoxEl.insertAdjacentHTML("beforeend", markup);
     
}

function clearMarkupGallery() {
  galleryBoxEl.innerHTML = ''; 
}

function removeClassHidden() {
  btnLoadMoreEl.classList.remove("is-hidden");
}