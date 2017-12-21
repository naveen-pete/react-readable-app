import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import _ from 'lodash';

import CommentForm, { BLANK_COMMENT } from './comment-form';
import Comment from './comment';
import AppAlert from '../common/app-alert';

import * as ReadableApi from '../../api/readable-api';

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      commentToEdit: Object.assign({}, BLANK_COMMENT)
    };

    // CommentForm component related event handlers
    this.onAddComment = this.onAddComment.bind(this);
    this.onUpdateComment = this.onUpdateComment.bind(this);
    this.onResetComment = this.onResetComment.bind(this);

    // Comment component related event handlers
    this.onEditComment = this.onEditComment.bind(this);
    this.onDeleteComment = this.onDeleteComment.bind(this);
    this.onVoteComment = this.onVoteComment.bind(this);
  }

  componentDidMount() {
    this.getComments();
  }

  getComments() {
    const { postId } = this.props;
    if (!postId) return;

    ReadableApi.getComments(postId)
      .then(comments => {
        console.log(`SUCCESS: Get comments successful! (postId: ${postId})`);
        this.setState({ comments });
      })
      .catch(error => {
        console.log(`ERROR: Get comments failed! (postId: ${postId})`, error);
      });
  }

  onAddComment(comment) {
    ReadableApi.addComment(comment)
      .then(newComment => {
        console.log(`SUCCESS: Add comment successful!`);

        this.setState(prevState => {
          const comments = prevState.comments;
          comments.unshift(newComment);

          return { comments };
        });
      })
      .catch(error => {
        console.log(`ERROR: Add comment failed!`, error);
      });
  }

  onUpdateComment(comment) {
    ReadableApi.updateComment(comment)
      .then(updatedComment => {
        console.log(`SUCCESS: Update comment successful! (id: ${comment.id})`);

        this.setState(prevState => {
          const prevComments = prevState.comments.filter(
            comment => comment.id !== updatedComment.id
          );
          const comments = [updatedComment, ...prevComments];

          return { comments, commentToEdit: Object.assign({}, BLANK_COMMENT) };
        });
      })
      .catch(error => {
        console.log(`ERROR: Update comment failed! (id: ${comment.id})`, error);
      });
  }

  onResetComment() {
    this.setState({ commentToEdit: Object.assign({}, BLANK_COMMENT) });
  }

  onEditComment(id) {
    if (id === this.state.commentToEdit.id) return;

    ReadableApi.getComment(id)
      .then(comment => {
        console.log(`SUCCESS: Get comment successful! (id: ${id})`);
        this.setState({ commentToEdit: comment });
      })
      .catch(error => {
        console.log(`ERROR: Get comment failed! (id: ${id})`, error);
      });
  }

  onDeleteComment(id) {
    ReadableApi.deleteComment(id)
      .then(comment => {
        console.log(`SUCCESS: Delete comment successful! (id: ${id})`);

        this.setState(prevState => {
          const comments = prevState.comments.filter(
            comment => comment.id !== id
          );
          return { comments, commentToEdit: Object.assign({}, BLANK_COMMENT) };
        });
      })
      .catch(error => {
        console.log(`ERROR: Delete comment failed! (id: ${id})`, error);
      });
  }

  onVoteComment(id, voteOption) {
    ReadableApi.voteComment(id, voteOption)
      .then(updatedComment => {
        console.log(
          `SUCCESS: Vote comment successful! (id: ${id}, voteOption: ${voteOption})`
        );

        this.setState(prevState => {
          const prevComments = prevState.comments.filter(
            comment => comment.id !== updatedComment.id
          );
          const comments = [updatedComment, ...prevComments];
          return { comments, commentToEdit: Object.assign({}, BLANK_COMMENT) };
        });
      })
      .catch(error => {
        console.log(
          `ERROR: Vote comment failed! (id: ${id}, voteOption: ${voteOption})`,
          error
        );
      });
  }

  render() {
    const { comments } = this.state;
    const sortedComments = _.orderBy(comments, 'timestamp', 'desc');

    return (
      <div>
        <h4>
          <FontAwesome name="comments-o" /> Comments
        </h4>
        <hr />
        <div className="row">
          <div className="col-sm-4">
            <CommentForm
              comment={this.state.commentToEdit}
              postId={this.props.postId}
              resetComment={this.onResetComment}
              addComment={this.onAddComment}
              updateComment={this.onUpdateComment}
            />
          </div>
          <div className="col-sm-8">
            {sortedComments.length > 0 ? (
              sortedComments.map(comment => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  editComment={this.onEditComment}
                  deleteComment={this.onDeleteComment}
                  voteComment={this.onVoteComment}
                />
              ))
            ) : (
              <AppAlert
                type="info"
                message="No comments available for this post."
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Comments;
