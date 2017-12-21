import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import Voter from '../common/voter';

const Post = props => {
  const { post, deletePost } = props;
  return (
    <div className="panel panel-info">
      <div className="panel-heading">
        <FontAwesome name="envelope" /> {post.title}
      </div>
      <div className="panel-body">
        <div className="row">
          <div className="col-sm-8">
            <FontAwesome name="user" /> {post.author}
          </div>
          <div className="col-sm-4">
            <FontAwesome name="object-group" /> {post.category}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <FontAwesome name="comments-o" /> {post.commentCount} comment(s)
          </div>
          <div className="col-sm-4">
            <Voter
              score={post.voteScore}
              vote={voteOption => props.votePost(post.id, voteOption)}
            />
          </div>
          <div className="col-sm-4">
            <FontAwesome name="clock-o" />{' '}
            {new Date(Number(post.timestamp)).toString().substr(0, 21)}
          </div>
        </div>
      </div>
      <div className="panel-footer">
        <Link
          className="btn btn-xs btn-primary smallMargin"
          to={`/${post.category}/${post.id}`}
        >
          <FontAwesome name="envelope-open-o" /> View
        </Link>
        <Link
          className="btn btn-xs btn-primary smallMargin"
          to={`/posts/${post.id}`}
        >
          <span className="glyphicon glyphicon-edit" /> Edit
        </Link>
        <button
          onClick={() => deletePost(post.id)}
          className="btn btn-xs btn-warning smallMargin"
        >
          <span className="glyphicon glyphicon-trash" /> Delete
        </button>
      </div>
    </div>
  );
};

export default Post;
