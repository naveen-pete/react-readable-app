import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import Voter from './voter';
import * as ReadableApi from '../api/readable-api';

class PostDetail extends Component {
  constructor(props) {
    super(props);

    this.state = { post: {} };
  }

  componentDidMount() {
    const id = this.props.match.params.postId;
    ReadableApi.getPost(id)
      .then(post => {
        console.log(`SUCCESS: Get post successful! (id: ${id})`);
        this.setState({ post });
      })
      .catch(error => {
        console.log(`ERROR: Get post failed! (id: ${id})`, error);
      });
  }

  deletePost(id) {
    ReadableApi.deletePost(id)
      .then(() => {
        console.log(`SUCCESS: Delete post successful! (id: ${id})`);
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(`ERROR: Delete post failed! (id: ${id})`, error);
      });
  }

  render() {
    const { post } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <h4>
              <FontAwesome name="envelope" /> Post Detail
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <Link to="/" className="btn btn-sm btn-primary smallMargin">
              <span className="glyphicon glyphicon-chevron-left" /> Posts
            </Link>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h3 className="panel-title">
                  <FontAwesome name="envelope" /> {post.title}
                </h3>
              </div>
              <div className="panel-body">
                <p>{post.body}</p>
              </div>
              <ul className="list-group">
                <li className="list-group-item">
                  <FontAwesome name="user" /> Author: {post.author}
                </li>
                <li className="list-group-item">
                  <FontAwesome name="object-group" /> Category: {post.category}
                </li>
                <li className="list-group-item">
                  <FontAwesome name="comments-o" /> {post.commentCount}{' '}
                  comment(s)
                </li>
                <li className="list-group-item">
                  <Voter score={post.voteScore} />
                </li>
              </ul>
              <div className="panel-footer">
                <Link
                  to={`/posts/${post.id}`}
                  className="btn btn-primary btn-sm smallMargin"
                >
                  <span className="glyphicon glyphicon-edit" /> Edit
                </Link>
                <button
                  onClick={() => this.deletePost(post.id)}
                  className="btn btn-warning btn-sm smallMargin"
                >
                  <span className="glyphicon glyphicon-trash" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostDetail;
