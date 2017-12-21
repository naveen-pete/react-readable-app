const baseApiUrl = 'http://localhost:3001';
const authToken = 'readable-naveen-pete';

const headers = {
  Authorization: authToken
};

//-----------
// Posts API
//-----------
// GET /categories
// USAGE:
//   Get all of the categories available for the app. List is found in categories.js.
//   Feel free to extend this list as you desire.
export const getCategories = () =>
  fetch(`${baseApiUrl}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

// GET /posts
// USAGE:
//   Get all of the posts. Useful for the main page when no category is selected.
export const getPosts = () =>
  fetch(`${baseApiUrl}/posts`, { headers }).then(res => res.json());

// GET /:category/posts
// USAGE:
//   Get all of the posts for a particular category
export const getPostsForCategory = category =>
  fetch(`${baseApiUrl}/${category}/posts`, { headers }).then(res => res.json());

// GET /posts/:id
// USAGE:
//   Get the details of a single post
export const getPost = id =>
  fetch(`${baseApiUrl}/posts/${id}`, { headers }).then(res => res.json());

// POST /posts
// USAGE:
//   Add a new post
// PARAMS:
//   id - UUID should be fine, but any unique id will work
//   timestamp - timestamp in whatever format you like, you can use Date.now() if you like
//   title - String
//   body - String
//   author - String
//   category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.
export const addPost = post =>
  fetch(`${baseApiUrl}/posts`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  }).then(response => response.json());

// PUT /posts/:id
// USAGE:
//   Edit the details of an existing post
// PARAMS:
//   title - String
//   body - String
export const updatePost = post =>
  fetch(`${baseApiUrl}/posts/${post.id}`, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  }).then(response => response.json());

// DELETE /posts/:id
// USAGE:
//   Sets the deleted flag for a post to 'true'.
//   Sets the parentDeleted flag for all child comments to 'true'.
export const deletePost = id =>
  fetch(`${baseApiUrl}/posts/${id}`, {
    method: 'DELETE',
    headers
  }).then(response => response.json());

// POST /posts/:id
// USAGE:
//   Used for voting on a post
// PARAMS:
//   option - String: Either "upVote" or "downVote"
export const votePost = (id, option) =>
  fetch(`${baseApiUrl}/posts/${id}`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ option })
  }).then(response => response.json());

//--------------
// Comments API
//--------------
// GET /posts/:id/comments
// USAGE:
//   Get all the comments for a single post
export const getComments = postId =>
  fetch(`${baseApiUrl}/posts/${postId}/comments`, { headers }).then(res =>
    res.json()
  );

// GET /comments/:id
// USAGE:
//   Get the details for a single comment
export const getComment = id =>
  fetch(`${baseApiUrl}/comments/${id}`, { headers }).then(res => res.json());

// POST /comments
// USAGE:
//   Add a comment to a post
// PARAMS:
//   id: Any unique ID. As with posts, UUID is probably the best here.
//   timestamp: timestamp. Get this however you want.
//   body: String
//   author: String
//   parentId: Should match a post id in the database.
export const addComment = comment =>
  fetch(`${baseApiUrl}/comments`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  }).then(response => response.json());

// PUT /comments/:id
// USAGE:
//   Edit the details of an existing comment
// PARAMS:
//   timestamp: timestamp. Get this however you want.
//   body: String
export const updateComment = comment =>
  fetch(`${baseApiUrl}/comments/${comment.id}`, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  }).then(response => response.json());

// DELETE /comments/:id
// USAGE:
//   Sets a comment's deleted flag to 'true'
export const deleteComment = id =>
  fetch(`${baseApiUrl}/comments/${id}`, {
    method: 'DELETE',
    headers
  }).then(response => response.json());

// POST /comments/:id
// USAGE:
//   Used for voting on a comment.
export const voteComment = (id, option) =>
  fetch(`${baseApiUrl}/comments/${id}`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ option })
  }).then(res => res.json());
