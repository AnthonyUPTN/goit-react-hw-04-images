import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    per_page: 12,
    key: '26775773-5c491c43123f0c4d75768fcb7',
    orientation: 'horizontal',
    image_type: 'photo',
  },
});

export const getImages = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
    },
  });
  return data;
};
