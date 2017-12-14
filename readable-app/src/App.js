import React, { Component } from 'react';

import Posts from './components/posts';
import PostDetail from './components/post-detail';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h2>Readable</h2>
          </div>
        </div>
        <Posts />
        <PostDetail />
      </div>
    );
  }
}

export default App;
