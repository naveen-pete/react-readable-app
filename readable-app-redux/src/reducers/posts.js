import _ from 'lodash';

import {
  GET_POSTS,
  GET_POST,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  VOTE_POST,
  POSTS_SORT_PARAMS
} from '../actions';
import { FIELD_DATE, ORDER_DESC } from '../components/common/sort-on';

// --------------------------------------------
// Reducer to manage posts within the store
// --------------------------------------------
export function posts(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case GET_POSTS:
      newState = _.mapKeys(action.payload, 'id');
      return newState;

    case GET_POST:
    case ADD_POST:
    case UPDATE_POST:
    case VOTE_POST:
      newState = { ...state, [action.payload.id]: action.payload };
      return newState;

    case DELETE_POST:
      newState = _.omit(state, action.payload.id);
      return newState;

    default:
      return state;
  }
}

// ----------------------------------------------
// Reducer to store sort parameters for the list
// of posts
// ----------------------------------------------
export function postsSortParams(
  state = { field: FIELD_DATE, order: ORDER_DESC },
  action
) {
  switch (action.type) {
    case POSTS_SORT_PARAMS:
      return action.payload;

    default:
      return state;
  }
}
