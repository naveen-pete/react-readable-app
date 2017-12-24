import { GET_CATEGORIES } from './post-types';
import * as ReadableApi from '../api';

// ------------------------------------------
// Action creator for getting all categories
// ------------------------------------------
export function getCategories() {
  const request = ReadableApi.getCategories();

  return {
    type: GET_CATEGORIES,
    payload: request
  };
}
