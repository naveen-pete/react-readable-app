import React from 'react';

import Categories from './categories';
import PostList from './post-list';

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
