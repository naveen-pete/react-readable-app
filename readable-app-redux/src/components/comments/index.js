import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import _ from 'lodash';

import CommentForm from './comment-form';
import Comment from './comment';
import AppAlert from '../common/app-alert';
import SortOn from '../common/sort-on';

import { getComments, setCommentsSortParams } from '../../actions';

// --------------------------------------------------------------------
// The root component for managing comments for a post. This component
// uses:
// 1. CommentForm component to add a new or update an existing comment
// 2. Comment component to show comments in a list
// 3. SortOn component to display and change the sort field and
//    sort order
// 4. AppAlert component to display a message if not comments are
//    available for the post
// --------------------------------------------------------------------
class CommentsRoot extends Component {
  constructor(props) {
    super(props);

    this.onChangeSortParams = this.onChangeSortParams.bind(this);
  }

  componentDidMount() {
    this.getComments();
  }

  getComments() {
    const { postId } = this.props;
    if (!postId) return;

    this.props.getComments(postId);
  }

  onChangeSortParams(sortParams) {
    this.props.setCommentsSortParams(sortParams);
  }

  render() {
    const { comments, commentsSortParams } = this.props;

    const sortedComments = _.orderBy(
      _.map(comments),
      commentsSortParams.field,
      commentsSortParams.order
    );

    return (
      <div>
        <h4>
          <FontAwesome name="comments-o" /> Comments
        </h4>
        <hr />
        <div className="row">
          <div className="col-sm-4">
            <CommentForm postId={this.props.postId} />
          </div>
          {sortedComments.length > 0 ? (
            <div className="col-sm-8">
              <SortOn
                sortParams={commentsSortParams}
                changeSortParams={this.onChangeSortParams}
              />
              {sortedComments.map(comment => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          ) : (
            <div className="col-sm-8">
              <AppAlert
                type="info"
                message="No comments available for this post."
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ comments, commentsSortParams }) => ({
  comments,
  commentsSortParams
});

const mapDispatchToProps = dispatch => {
  return {
    getComments: postId => dispatch(getComments(postId)),
    setCommentsSortParams: sortParams =>
      dispatch(setCommentsSortParams(sortParams))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsRoot);
