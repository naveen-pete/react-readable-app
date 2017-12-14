const baseApiUrl = 'http://localhost:3001';
const authToken = 'readable-naveen-pete';

const headers = {
  Authorization: authToken
};

export const getPosts = () =>
  fetch(`${baseApiUrl}/posts`, { headers }).then(res => res.json());

export const getCategories = () =>
  fetch(`${baseApiUrl}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getPost = id =>
  fetch(`${baseApiUrl}/posts/${id}`, { headers }).then(res => res.json());

export const getPostsForCategory = category =>
  fetch(`${baseApiUrl}/${category}/posts`, { headers }).then(res => res.json());

export const addPost = post =>
  fetch(`${baseApiUrl}/posts`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  }).then(response => response.json() || {});

export const updatePost = post =>
  fetch(`${baseApiUrl}/posts/${post.id}`, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  }).then(response => response.json() || {});

export const deletePost = id =>
  fetch(`${baseApiUrl}/posts/${id}`, {
    method: 'DELETE',
    headers
  }).then(response => response.json() || {});
