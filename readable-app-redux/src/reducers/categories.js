import { GET_CATEGORIES } from '../actions';

export function categories(state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.payload;

    default:
      return state;
  }
}
