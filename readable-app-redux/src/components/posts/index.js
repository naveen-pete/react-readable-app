import React from 'react';

import Categories from './categories';
import PostList from './post-list';

const PostsRoot = props => {
  const { category } = props.match.params;
  return (
    <div>
      <div className="row">
        <Categories />
        <PostList category={category} />
      </div>
    </div>
  );
};

export default PostsRoot;
