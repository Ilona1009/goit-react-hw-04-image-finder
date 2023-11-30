import axios from 'axios';

const URL = 'https://pixabay.com/api/';

export async function fetchPhoto(query, page) {
  const searchParams = new URLSearchParams({
    key: '38402918-c2c574f4e6229d1d2da3cdead',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page: page,
  });
  const response = await axios.get(`${URL}?${searchParams}`);
  return response.data;
}
