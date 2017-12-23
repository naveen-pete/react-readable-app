import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import Voter from '../common/voter';
import AppAlert from '../common/app-alert';
import CommentsRoot from '../comments';

import { votePost, deletePost, getPost } from '../../actions';

// ------------------------------------------------------------------------
// PostDetail component displays information related to a particular post.
// It helps the user to perform following operations on a post:
// 1. Vote a post (uses Voter component)
// 2. Delete a post
// 3. Manage comments for a post (uses CommentsRoot component)
// ------------------------------------------------------------------------
class PostDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.postId;
    this.props.getPost(id);
  }

  deletePost(id) {
    this.props.deletePost(id, () => {
      this.props.history.replace('/');
    });
  }

  render() {
    const id = this.props.match.params.postId;
    const post = this.props.posts[id];
    if (!post) {
      return (
        <div>
          <AppAlert type="info" message="The post does not exist!" />
          <Link to="/" className="btn btn-sm btn-primary">
            <span className="glyphicon glyphicon-chevron-left" /> Go to Posts
          </Link>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-sm-12">
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
                    <FontAwesome name="object-group" /> Category:{' '}
                    {post.category}
                  </li>
                  <li className="list-group-item">
                    <FontAwesome name="comments-o" /> {post.commentCount}{' '}
                    comment(s)
                  </li>
                  <li className="list-group-item">
                    <Voter
                      score={post.voteScore}
                      vote={voteOption =>
                        this.props.votePost(post.id, voteOption)
                      }
                    />
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

          <div className="row">
            <div className="col-sm-12">
              <CommentsRoot postId={id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => ({ posts });

const mapDispatchToProps = dispatch => {
  return {
    getPost: id => dispatch(getPost(id)),
    deletePost: (id, callback) => dispatch(deletePost(id, callback)),
    votePost: (id, voteOption) => dispatch(votePost(id, voteOption))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
