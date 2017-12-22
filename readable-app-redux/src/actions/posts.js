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

export function getPosts(category) {
  const request = category
    ? ReadableApi.getPostsForCategory(category)
    : ReadableApi.getPosts();

  return {
    type: GET_POSTS,
    payload: request
  };
}

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

export function votePost(id, voteOption) {
  const request = ReadableApi.votePost(id, voteOption);

  return {
    type: VOTE_POST,
    payload: request
  };
}

export function setPostsSortParams(sortParams) {
  return {
    type: POSTS_SORT_PARAMS,
    payload: sortParams
  };
}
