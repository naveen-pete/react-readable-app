import React, { Component } from 'react';

import * as ReadableApi from '../api/readable-api';

class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = { posts: [] };
  }

  componentDidMount() {
    ReadableApi.getPosts()
      .then(posts => {
        console.log('SUCCESS: Get all posts successful!');
        this.setState({ posts });
      })
      .catch(error => {
        console.log('ERROR: Get all posts failed!', error);
      });
  }

  render() {
    return (
      <div>
        <div className="pull-right">
          <a className="btn btn-primary">
            <span className="glyphicon glyphicon-plus" />
          </a>
        </div>
        <h3>Posts (Category: {this.props.category})</h3>
        <div className="well well-sm">
          <label className="radio-inline">
            <input
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="option1"
            />{' '}
            Sort by Date
          </label>
          <label className="radio-inline">
            <input
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="option2"
            />{' '}
            Sort by Score
          </label>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th># Comments</th>
              <th>Vote Score</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{post.commentCount}</td>
                <td>{post.voteScore}</td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <a className="btn btn-info">
                      <span className="glyphicon glyphicon-info-sign" />
                    </a>
                    <a className="btn btn-primary">
                      <span className="glyphicon glyphicon-edit" />
                    </a>
                    <a className="btn btn-warning">
                      <span className="glyphicon glyphicon-trash" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PostList;
