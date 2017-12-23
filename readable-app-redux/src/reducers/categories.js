import { GET_CATEGORIES } from '../actions';

// --------------------------------------------
// Reducer to setup category list of the store
// --------------------------------------------
export function categories(state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.payload;

    default:
      return state;
  }
}
