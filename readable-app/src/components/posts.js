import React, { Component } from 'react';

import Categories from './categories';
import PostList from './post-list';

class Posts extends Component {
  render() {
    const { category } = this.props.match.params;
    return (
      <div>
        <div className="row">
          <div className="col-sm-2">
            <Categories />
          </div>
          <div className="col-sm-10">
            <PostList category={category} />
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
