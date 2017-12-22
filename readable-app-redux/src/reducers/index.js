import { combineReducers } from 'redux';

import { categories } from './categories';
import { posts, postsSortParams } from './posts';
import { comments, commentsSortParams, commentToEdit } from './comments';

const appReducer = combineReducers({
  categories,
  posts,
  postsSortParams,
  comments,
  commentsSortParams,
  commentToEdit
});

export default appReducer;
