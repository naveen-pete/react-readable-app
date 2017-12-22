import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import uuid from 'uuid';

import {
  addComment,
  updateComment,
  clearEditComment,
  getPost,
  NEW_ID
} from '../../actions';

export const BLANK_COMMENT = {
  id: NEW_ID,
  body: '',
  author: '',
  timestamp: 0,
  parentId: '',
  voteScore: 0
};

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: Object.assign({}, BLANK_COMMENT)
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.commentToEdit.id !== nextProps.commentToEdit.id) {
      this.setState({ comment: nextProps.commentToEdit });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const comment = Object.assign({}, this.state.comment);
    const isNewComment = comment.id === NEW_ID;

    const updateCallback = comment => {
      this.props.clearEditComment();
      this.setState({ comment: Object.assign({}, BLANK_COMMENT) });
    };

    const addCallback = comment => {
      updateCallback(comment);
      this.props.getPost(this.props.postId);
    };

    comment.timestamp = Date.now();
    if (isNewComment) {
      comment.id = uuid();
      comment.parentId = this.props.postId;
      this.props.addComment(comment, addCallback);
    } else {
      this.props.updateComment(comment, updateCallback);
    }
  }

  handleChange(event) {
    // Retrieve name, value and control type flag of the form control
    const { name, value } = event.target;

    this.setState(prevState => {
      // Assign the updated value
      prevState.comment[name] = value;

      return { comment: prevState.comment };
    });
  }

  onCancel() {
    this.props.clearEditComment();
    this.setState({ comment: Object.assign({}, BLANK_COMMENT) });
  }

  render() {
    const { comment } = this.state;

    return (
      <div className="well well-lg">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="author">
              <FontAwesome name="user" /> Author
            </label>
            <input
              required
              type="text"
              className="form-control"
              id="author"
              name="author"
              value={comment.author}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">
              <FontAwesome name="comment-o" /> Comment
            </label>
            <textarea
              required
              className="form-control"
              id="body"
              name="body"
              cols="30"
              rows="4"
              value={comment.body}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-sm smallMargin">
            <span className="glyphicon glyphicon-ok" /> Save
          </button>
          <button
            type="button"
            onClick={this.onCancel}
            className="btn btn-warning btn-sm smallMargin"
          >
            <span className="glyphicon glyphicon-remove" /> Cancel
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ commentToEdit }) => ({ commentToEdit });

const mapDispatchToProps = dispatch => {
  return {
    addComment: (comment, callback) => dispatch(addComment(comment, callback)),
    updateComment: (comment, callback) =>
      dispatch(updateComment(comment, callback)),
    clearEditComment: () => dispatch(clearEditComment()),
    getPost: id => dispatch(getPost(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
