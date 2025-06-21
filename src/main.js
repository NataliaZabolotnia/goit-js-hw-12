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
  showLoader();

  if (searchQuery === '') {
    iziToast.show({
      title: 'Warning',
      color: 'red',
      position: 'topRight',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }

  try {
    const data = await getImagesByQuery(searchQuery, page);

    if (data.hits.length === 0) {
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

    const totalElementsVisible = data.hits.length * page;
    if (totalElementsVisible < data.totalHits) {
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
  const data = await getImagesByQuery(searchQuery, page);
  showLoader();
  createGallery(data.hits);

  hideLoader();

  const listItem = document.querySelector('.list-item');
  const { height: cardHeight } = listItem.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    left: 100,
    behavior: 'smooth',
  });

  showLoadMoreButton();

  const totalElementsVisible = page * perPage;

  if (totalElementsVisible >= data.totalHits) {
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
}
