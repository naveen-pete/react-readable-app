import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Posts from './components/posts';
import PostDetail from './components/post-detail';
import PostForm from './components/post-form';

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
          <Route exact path="/" component={Posts} />
          <Route exact path="/posts/new" component={PostForm} />
          <Route path="/posts/:id" component={PostForm} />
          <Route path="/:category/:postId" component={PostDetail} />
          <Route path="/:category" component={Posts} />
        </Switch>
      </div>
    );
  }
}

export default App;
