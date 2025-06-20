import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import { createGallery } from './js/render-functions';
import { clearGallery } from './js/render-functions';
import { showLoader } from './js/render-functions';
import { hideLoader } from './js/render-functions';

const input = document.querySelector('.input-text');
const form = document.querySelector('.form');

form.addEventListener('submit', handlesubmit);
async function handlesubmit(event) {
  event.preventDefault();
  const query = input.value.trim();

  clearGallery();
  showLoader();

  if (query === '') {
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
    const data = await getImagesByQuery(query);
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
  } catch (error) {
    console.error('Fetch error:', error);
  } finally {
    hideLoader();
    input.value = '';
  }
}
