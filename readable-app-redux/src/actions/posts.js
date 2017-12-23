import {
  GET_POSTS,
  GET_POST,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  VOTE_POST,
  POSTS_SORT_PARAMS
} from './types';

import * as ReadableApi from '../api';

// ----------------------------------------
// Action creator for getting all posts or
// posts related to a specific category
// ----------------------------------------
export function getPosts(category) {
  const request = category
    ? ReadableApi.getPostsForCategory(category)
    : ReadableApi.getPosts();

  return {
    type: GET_POSTS,
    payload: request
  };
}

// --------------------------------------------
// Action creator to get a specific post whose
// id is passed as input parameter
// --------------------------------------------
export function getPost(id, callback = null) {
  const request = ReadableApi.getPost(id);
  if (callback) {
    request.then(post => callback(post));
  }

  return {
    type: GET_POST,
    payload: request
  };
}

// ------------------------------------
// Action creator to create a new post
// ------------------------------------
export function addPost(post, callback = null) {
  const request = ReadableApi.addPost(post);
  if (callback) {
    request.then(post => callback(post));
  }

  return {
    type: ADD_POST,
    payload: request
  };
}

// ------------------------------------------
// Action creator to update an existing post
// ------------------------------------------
export function updatePost(post, callback = null) {
  const request = ReadableApi.updatePost(post);
  if (callback) {
    request.then(post => callback(post));
  }

  return {
    type: UPDATE_POST,
    payload: request
  };
}

// --------------------------------
// Action creator to delete a post
// --------------------------------
export function deletePost(id, callback = null) {
  const request = ReadableApi.deletePost(id);
  if (callback) {
    request.then(() => callback());
  }

  return {
    type: DELETE_POST,
    payload: request
  };
}

// ------------------------------
// Action creator to vote a post
// ------------------------------
export function votePost(id, voteOption) {
  const request = ReadableApi.votePost(id, voteOption);

  return {
    type: VOTE_POST,
    payload: request
  };
}

// ----------------------------------------------
// Action creator for saving sort parameters for
// list of posts
// ----------------------------------------------
export function setPostsSortParams(sortParams) {
  return {
    type: POSTS_SORT_PARAMS,
    payload: sortParams
  };
}
