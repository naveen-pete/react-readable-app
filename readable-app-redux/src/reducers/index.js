import { combineReducers } from 'redux';

import { categories } from './categories';
import { posts, postsSortParams } from './posts';
import { comments, commentsSortParams, commentToEdit } from './comments';

// ------------------------------------------------------------------
// The Readable App Redux Store contains following state properties:
// categories         - stores the list of categories
// posts              - stores all posts (or) posts for a category
// postsSortParams    - stores sort parameters for list of posts
// comments           - stores list of comments for a post
// commentsSortParams - stores sort parameters for list of comments
// commentToEdit      - stores comment when user clicks 'Edit'
//                      button for a comment
// ------------------------------------------------------------------
const appReducer = combineReducers({
  categories,
  posts,
  postsSortParams,
  comments,
  commentsSortParams,
  commentToEdit
});

export default appReducer;
