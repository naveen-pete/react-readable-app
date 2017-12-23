import React from 'react';

import Categories from './categories';
import PostList from './post-list';

// -------------------------------------------------------
// The root component for Posts module. It uses:
// 1. Categories component to show the list of categories
// 2. PostList component to manage list of posts
// -------------------------------------------------------
const PostsRoot = props => {
  const { category } = props.match.params;
  return (
    <div className="row">
      <Categories location={props.location} />
      <PostList category={category} />
    </div>
  );
};

export default PostsRoot;
