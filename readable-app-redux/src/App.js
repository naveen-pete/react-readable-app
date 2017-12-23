import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import PostsRoot from './components/posts';
import PostDetail from './components/posts/post-detail';
import PostForm from './components/posts/post-form';
import Header from './components/common/header';

// -------------------------------------------------------
// The root component of Readable app. Defines routes for
// various views of the app
// -------------------------------------------------------
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={PostsRoot} />
            <Route exact path="/posts/new" component={PostForm} />
            <Route path="/posts/:id" component={PostForm} />
            <Route path="/:category/:postId" component={PostDetail} />
            <Route path="/:category" component={PostsRoot} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
