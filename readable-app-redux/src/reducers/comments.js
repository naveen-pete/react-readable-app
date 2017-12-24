import _ from 'lodash';

import * as CommentActionType from '../actions/comment-types';
import { FIELD_DATE, ORDER_DESC } from '../components/common/sort-on';

// --------------------------------------------
// Reducer to manage comments within the store
// --------------------------------------------
export function comments(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case CommentActionType.GET_COMMENTS:
      newState = _.mapKeys(action.payload, 'id');
      return newState;

    case CommentActionType.EDIT_COMMENT:
    case CommentActionType.ADD_COMMENT:
    case CommentActionType.UPDATE_COMMENT:
    case CommentActionType.VOTE_COMMENT:
      newState = { ...state, [action.payload.id]: action.payload };
      return newState;

    case CommentActionType.DELETE_COMMENT:
      newState = _.omit(state, action.payload.id);
      return newState;

    default:
      return state;
  }
}

// ----------------------------------------------
// Reducer to store sort parameters for the list
// of comments
// ----------------------------------------------
export function commentsSortParams(
  state = { field: FIELD_DATE, order: ORDER_DESC },
  action
) {
  switch (action.type) {
    case CommentActionType.COMMENTS_SORT_PARAMS:
      return action.payload;

    default:
      return state;
  }
}

// --------------------------------------------
// Reducer to setup or cancel 'Edit Comment'
// request
// --------------------------------------------
export function commentToEdit(
  state = {
    id: CommentActionType.NEW_ID,
    body: '',
    author: '',
    voteScore: 0,
    timestamp: 0,
    parentId: ''
  },
  action
) {
  switch (action.type) {
    case CommentActionType.EDIT_COMMENT:
    case CommentActionType.CLEAR_EDIT_COMMENT:
      return action.payload;

    default:
      return state;
  }
}
