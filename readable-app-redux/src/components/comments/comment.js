import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import Voter from '../common/voter';

import {
  deleteComment,
  voteComment,
  editComment,
  clearEditComment,
  getPost
} from '../../actions';
import { getFormattedDate } from '../../helpers';

// -----------------------------------------------------------------
// Comment component is used to display a single comment for a post.
// Additionally, this component allows the user to:
// 1. Vote a comment
// 2. Delete a comment
// 3. Edit a comment. When Edit button is clicked the comment is
//    displayed in the CommentForm component. The user can then make
//    changes to the comment and update it.
// -----------------------------------------------------------------
class Comment extends Component {
  constructor(props) {
    super(props);

    this.deleteComment = this.deleteComment.bind(this);
    this.voteComment = this.voteComment.bind(this);
    this.editComment = this.editComment.bind(this);
  }

  deleteComment() {
    const { comment, deleteComment, clearEditComment, getPost } = this.props;

    deleteComment(comment.id, () => {
      clearEditComment();
      getPost(comment.parentId);
    });
  }

  voteComment(voteOption) {
    const { comment, voteComment } = this.props;
    voteComment(comment.id, voteOption);
  }

  editComment() {
    const { comment, editComment } = this.props;
    editComment(comment.id);
  }

  render() {
    const { comment } = this.props;

    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <FontAwesome name="user" /> {comment.author}
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-sm-12">
              <FontAwesome name="comment-o" /> {comment.body}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <Voter score={comment.voteScore} vote={this.voteComment} />
            </div>
            <div className="col-sm-6">
              <FontAwesome name="clock-o" />{' '}
              {getFormattedDate(comment.timestamp)}
            </div>
          </div>
        </div>
        <div className="panel-footer">
          <button
            onClick={this.editComment}
            className="btn btn-xs btn-primary smallMargin"
          >
            <span className="glyphicon glyphicon-edit" /> Edit
          </button>
          <button
            onClick={this.deleteComment}
            className="btn btn-xs btn-warning smallMargin"
          >
            <span className="glyphicon glyphicon-trash" /> Delete
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editComment: id => dispatch(editComment(id)),
    clearEditComment: () => dispatch(clearEditComment()),
    deleteComment: (id, callback) => dispatch(deleteComment(id, callback)),
    voteComment: (id, voteOption) => dispatch(voteComment(id, voteOption)),
    getPost: id => dispatch(getPost(id))
  };
};

export default connect(null, mapDispatchToProps)(Comment);
