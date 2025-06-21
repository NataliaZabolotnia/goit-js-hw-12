import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.btn-load');

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="list-item">
      <a href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" width="360"/>
      </a>
      <div class="info">
            <p>Likes ${likes}</p>
            <p>Views ${views}</p>
            <p>Comments ${comments}</p>
            <p>Downloads ${downloads}</p>
        </div>
        
      </li>  
        `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
export function clearGallery() {
  gallery.innerHTML = '';
}
export function showLoader() {
  if (loader) loader.classList.remove('hidden');
}
export function hideLoader() {
  if (loader) loader.classList.add('hidden');
}

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

export function showLoadMoreButton() {
  loadMore.classList.remove('hidden');
}
export function hideLoadMoreButton() {
  loadMore.classList.add('hidden');
}
