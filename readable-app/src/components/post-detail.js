import React, { Component } from 'react';

import * as ReadableApi from '../api/readable-api';

class PostDetail extends Component {
  constructor(props) {
    super(props);

    this.state = { post: {} };
  }

  componentDidMount() {
    const id = '6ni6ok3ym7mf1p33lnez';
    ReadableApi.getPost(id)
      .then(post => {
        console.log(`SUCCESS: Get post successful! (id: ${id})`);
        this.setState({ post });
      })
      .catch(error => {
        console.log(`ERROR: Get post failed! (id: ${id})`, error);
      });
  }

  render() {
    const { post } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <h3>Post Detail</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <a className="btn btn-primary smallMargin">
              <span className="glyphicon glyphicon-chevron-left" />
            </a>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">{post.title}</h3>
              </div>
              <div className="panel-body">
                <p>{post.body}</p>
              </div>
              <ul className="list-group">
                <li className="list-group-item">Author: {post.author}</li>
                <li className="list-group-item">
                  No. of Comments: {post.commentCount}
                </li>
                <li className="list-group-item">
                  Vote Score: {post.voteScore}
                </li>
              </ul>
              <div className="panel-footer">
                <a className="btn btn-primary btn-sm smallMargin">
                  <span className="glyphicon glyphicon-edit" />
                </a>
                <a className="btn btn-warning btn-sm smallMargin">
                  <span className="glyphicon glyphicon-trash" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostDetail;
