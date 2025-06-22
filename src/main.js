import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import { createGallery } from './js/render-functions';
import { clearGallery } from './js/render-functions';
import { showLoader } from './js/render-functions';
import { hideLoader } from './js/render-functions';
import { showLoadMoreButton } from './js/render-functions';
import { hideLoadMoreButton } from './js/render-functions';

const input = document.querySelector('.input-text');
const form = document.querySelector('.form');
const loadMore = document.querySelector('.btn-load');

let page = 1;
let perPage = 15;
let searchQuery = '';

form.addEventListener('submit', handlesubmit);
loadMore.addEventListener('click', handleclick);

async function handlesubmit(event) {
  event.preventDefault();
  searchQuery = input.value.trim();
  page = 1;

  clearGallery();
  hideLoadMoreButton();

  if (searchQuery === '') {
    iziToast.show({
      title: 'Warning',
      color: 'red',
      position: 'topRight',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    input.value = '';
    return;
  }
  showLoader();
  try {
    const data = await getImagesByQuery(searchQuery, page);

    if (data.hits.length === 0) {
      hideLoadMoreButton();
      iziToast.show({
        title: 'Hey',
        color: 'red',
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    createGallery(data.hits);
    const totalPages = Math.ceil(data.totalHits / perPage);
    const totalElementsVisible = data.hits.length * page;
    console.log(totalElementsVisible, data.totalHits);

    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.show({
        title: '!',
        color: 'blue',
        position: 'topRight',
        message: 'We are sorry, but you have reached the end of search results',
      });
    }
  } catch (error) {
    console.error('Fetch error:', error);
  } finally {
    hideLoader();
    input.value = '';
  }
}
async function handleclick(event) {
  event.preventDefault();
  page += 1;

  try {
    showLoader();
    const data = await getImagesByQuery(searchQuery, page);

    createGallery(data.hits);
    hideLoader();

    const gallery = document.querySelector('.gallery');
    const firstItem = gallery.firstElementChild;
    const { height: cardHeight } = firstItem.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const totalPages = Math.ceil(data.totalHits / perPage);
    const totalElementsVisible = page * perPage;
    console.log(totalElementsVisible, data.totalHits);
    if (page >= totalPages) {
      hideLoader();
      iziToast.show({
        title: '!',
        color: 'blue',
        position: 'topRight',
        message: 'We are sorry, but you have reached the end of search results',
      });
      hideLoadMoreButton();
      return;
    }
    showLoadMoreButton();
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
