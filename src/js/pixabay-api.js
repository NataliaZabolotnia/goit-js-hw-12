import axios from 'axios';
const API_KEY = '50865810-65dd075ae8c3362400e1c5e2f';

let perPage = 15;

export async function getImagesByQuery(query, page) {
  const response = await axios('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: perPage,
      page: page,
    },
  });
  return response.data;
}
