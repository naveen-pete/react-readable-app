import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import PostsRoot from './components/posts';
import PostDetail from './components/posts/post-detail';
import PostForm from './components/posts/post-form';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h2>Readable</h2>
          </div>
        </div>

        <Switch>
          <Route exact path="/" component={PostsRoot} />
          <Route exact path="/posts/new" component={PostForm} />
          <Route path="/posts/:id" component={PostForm} />
          <Route path="/:category/:postId" component={PostDetail} />
          <Route path="/:category" component={PostsRoot} />
        </Switch>
      </div>
    );
  }
}

export default App;
