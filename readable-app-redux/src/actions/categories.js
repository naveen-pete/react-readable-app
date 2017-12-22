import { GET_CATEGORIES } from './types';

import * as ReadableApi from '../api';

export function getCategories() {
  const request = ReadableApi.getCategories();

  return {
    type: GET_CATEGORIES,
    payload: request
  };
}
