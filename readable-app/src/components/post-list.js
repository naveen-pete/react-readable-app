import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as ReadableApi from '../api/readable-api';

class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = { posts: [] };
  }

  componentDidMount() {
    this.getPosts();
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.getPosts();
    }
  }

  getPosts() {
    const category = this.props.category;
    let postsPromise = category
      ? ReadableApi.getPostsForCategory(category)
      : ReadableApi.getPosts();

    postsPromise
      .then(posts => {
        console.log(
          `SUCCESS: Get posts successful! (category: ${
            category ? category : 'all'
          })`
        );
        this.setState({ posts });
      })
      .catch(error => {
        console.log(
          `ERROR: Get posts failed! (category: ${category ? category : 'all'})`,
          error
        );
      });
  }

  deletePost(id) {
    ReadableApi.deletePost(id)
      .then(() => {
        console.log(`SUCCESS: Delete post successful! (id: ${id})`);
        this.setState(prevState => {
          return { posts: prevState.posts.filter(post => post.id !== id) };
        });
      })
      .catch(error => {
        console.log(`ERROR: Delete post failed! (id: ${id})`, error);
      });
  }

  renderSortBy() {
    return (
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
    );
  }

  renderTableBody() {
    return this.state.posts.map(post => (
      <tr key={post.id}>
        <td>{post.title}</td>
        <td>{post.author}</td>
        <td>{post.commentCount}</td>
        <td>{post.voteScore}</td>
        <td>
          <div className="btn-group btn-group-sm">
            <Link className="btn btn-info" to={`/${post.category}/${post.id}`}>
              <span className="glyphicon glyphicon-info-sign" />
            </Link>
            <Link className="btn btn-primary" to={`/posts/${post.id}`}>
              <span className="glyphicon glyphicon-edit" />
            </Link>
            <button
              onClick={() => this.deletePost(post.id)}
              className="btn btn-warning"
            >
              <span className="glyphicon glyphicon-trash" />
            </button>
          </div>
        </td>
      </tr>
    ));
  }

  renderTable() {
    return (
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
        <tbody>{this.renderTableBody()}</tbody>
      </table>
    );
  }

  render() {
    const { category } = this.props;
    return (
      <div>
        <div className="pull-right">
          <Link to="/posts/new" className="btn btn-primary">
            <span className="glyphicon glyphicon-plus" />
          </Link>
        </div>
        <h3>Posts (Category: {category ? category : 'all'})</h3>
        {this.renderSortBy()}
        {this.renderTable()}
      </div>
    );
  }
}

export default PostList;
