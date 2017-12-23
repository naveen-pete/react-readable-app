import {
  GET_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT,
  COMMENTS_SORT_PARAMS,
  CLEAR_EDIT_COMMENT,
  NEW_ID
} from './types';

import * as ReadableApi from '../api';

// --------------------------------------------
// Action creator for getting all comments for
// a post
// --------------------------------------------
export function getComments(postId) {
  const request = ReadableApi.getComments(postId);

  return {
    type: GET_COMMENTS,
    payload: request
  };
}

// --------------------------------------------
// Action creator for creating a new comment
// for a post
// --------------------------------------------
export function addComment(comment, callback = null) {
  const request = ReadableApi.addComment(comment);
  if (callback) {
    request.then(comment => callback(comment));
  }

  return {
    type: ADD_COMMENT,
    payload: request
  };
}

// --------------------------------------------
// Action creator to update an existing comment
// --------------------------------------------
export function updateComment(comment, callback = null) {
  const request = ReadableApi.updateComment(comment);
  if (callback) {
    request.then(comment => callback(comment));
  }

  return {
    type: UPDATE_COMMENT,
    payload: request
  };
}

// --------------------------------------
// Action creator for deleting a comment
// --------------------------------------
export function deleteComment(id, callback = null) {
  const request = ReadableApi.deleteComment(id);
  if (callback) {
    request.then(() => callback());
  }

  return {
    type: DELETE_COMMENT,
    payload: request
  };
}

// ------------------------------------
// Action creator for voting a comment
// ------------------------------------
export function voteComment(id, voteOption) {
  const request = ReadableApi.voteComment(id, voteOption);

  return {
    type: VOTE_COMMENT,
    payload: request
  };
}

// --------------------------------------------
// Action creator for storing sort parameters
// for list of comments of a post
// --------------------------------------------
export function setCommentsSortParams(sortParams) {
  return {
    type: COMMENTS_SORT_PARAMS,
    payload: sortParams
  };
}

// --------------------------------------------------
// Action creator for retrieving a comment when Edit
// button is clicked
// --------------------------------------------------
export function editComment(id) {
  const request = ReadableApi.getComment(id);

  return {
    type: EDIT_COMMENT,
    payload: request
  };
}

// -----------------------------------------------
// Action creator for cancelling the Edit Comment
// request
// -----------------------------------------------
export function clearEditComment() {
  const payload = {
    id: NEW_ID,
    body: '',
    author: '',
    timestamp: 0,
    parentId: '',
    voteScore: 0
  };

  return {
    type: CLEAR_EDIT_COMMENT,
    payload
  };
}
