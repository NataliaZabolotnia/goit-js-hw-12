import axios from 'axios';
const API_KEY = '50865810-65dd075ae8c3362400e1c5e2f';
export function getImagesByQuery(query) {
  return axios('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  })
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
}
