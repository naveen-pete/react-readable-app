import React from 'react';
import FontAwesome from 'react-fontawesome';

import Voter from '../common/voter';

const Comment = props => {
  const { comment, editComment, deleteComment, voteComment } = props;

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
            <Voter
              score={comment.voteScore}
              vote={voteOption => voteComment(comment.id, voteOption)}
            />
          </div>
          <div className="col-sm-6">
            <FontAwesome name="clock-o" />{' '}
            {new Date(Number(comment.timestamp)).toString().substr(0, 21)}
          </div>
        </div>
      </div>
      <div className="panel-footer">
        <button
          onClick={() => editComment(comment.id)}
          className="btn btn-xs btn-primary smallMargin"
        >
          <span className="glyphicon glyphicon-edit" /> Edit
        </button>
        <button
          onClick={() => deleteComment(comment.id)}
          className="btn btn-xs btn-warning smallMargin"
        >
          <span className="glyphicon glyphicon-trash" /> Delete
        </button>
      </div>
    </div>
  );
};

export default Comment;
