const api = 'http://localhost:3001';

let token = 'readable-naveen-pete';

const headers = {
  Accept: 'application/json',
  Authorization: token
};

export const getPosts = () =>
  fetch(`${api}/posts`, { headers }).then(res => res.json());

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getPost = id =>
  fetch(`${api}/posts/${id}`, { headers }).then(res => res.json());
