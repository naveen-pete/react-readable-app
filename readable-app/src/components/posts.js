import React, { Component } from 'react';

import Categories from './categories';
import PostList from './post-list';

class Posts extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-3">
            <Categories />
          </div>
          <div className="col-sm-9">
            <PostList category="all" />
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
