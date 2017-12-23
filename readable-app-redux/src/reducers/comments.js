import _ from 'lodash';

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
} from '../actions';
import { FIELD_DATE, ORDER_DESC } from '../components/common/sort-on';

export function comments(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case GET_COMMENTS:
      newState = _.mapKeys(action.payload, 'id');
      return newState;

    case EDIT_COMMENT:
    case ADD_COMMENT:
    case UPDATE_COMMENT:
    case VOTE_COMMENT:
      newState = { ...state, [action.payload.id]: action.payload };
      return newState;

    case DELETE_COMMENT:
      newState = _.omit(state, action.payload.id);
      return newState;

    default:
      return state;
  }
}

export function commentsSortParams(
  state = { field: FIELD_DATE, order: ORDER_DESC },
  action
) {
  switch (action.type) {
    case COMMENTS_SORT_PARAMS:
      return action.payload;

    default:
      return state;
  }
}

export function commentToEdit(
  state = {
    id: NEW_ID,
    body: '',
    author: '',
    timestamp: 0,
    parentId: '',
    voteScore: 0
  },
  action
) {
  switch (action.type) {
    case EDIT_COMMENT:
    case CLEAR_EDIT_COMMENT:
      return action.payload;

    default:
      return state;
  }
}