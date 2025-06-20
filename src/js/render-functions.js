import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createGallery(images) {
  const gallery = document.querySelector('.gallery');
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
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}
export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.classList.remove('hidden');
}
export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.classList.add('hidden');
}

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});
