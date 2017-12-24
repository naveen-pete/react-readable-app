import _ from 'lodash';

import * as PostActionType from '../actions/post-types';
import { FIELD_DATE, ORDER_DESC } from '../components/common/sort-on';

// --------------------------------------------
// Reducer to manage posts within the store
// --------------------------------------------
export function posts(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case PostActionType.GET_POSTS:
      newState = _.mapKeys(action.payload, 'id');
      return newState;

    case PostActionType.GET_POST:
    case PostActionType.ADD_POST:
    case PostActionType.UPDATE_POST:
    case PostActionType.VOTE_POST:
      newState = { ...state, [action.payload.id]: action.payload };
      return newState;

    case PostActionType.DELETE_POST:
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
    case PostActionType.POSTS_SORT_PARAMS:
      return action.payload;

    default:
      return state;
  }
}
