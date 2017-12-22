import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import uuid from 'uuid';

import {
  getCategories,
  getPost,
  addPost,
  updatePost,
  NEW_ID
} from '../../actions';

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {
        id: NEW_ID,
        title: '',
        body: '',
        author: '',
        category: '',
        timestamp: 0
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCategories();
    const id = this.props.match.params.id;
    if (id) {
      this.getPost(id);
    }
  }

  getPost(id) {
    this.props.getPost(id, post => {
      this.setState({ post });
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const post = Object.assign({}, this.state.post);
    const isNewPost = post.id === NEW_ID;

    const callback = post => {
      this.props.history.push('/');
    };

    if (isNewPost) {
      post.id = uuid();
      post.timestamp = Date.now();

      this.props.addPost(post, callback);
    } else {
      this.props.updatePost(post, callback);
    }
  }

  handleChange(event) {
    // Retrieve name, value and control type flag of the form control
    const { name, value } = event.target;

    this.setState(prevState => {
      // Assign the updated value
      prevState.post[name] = value;

      return { post: prevState.post };
    });
  }

  render() {
    const { post } = this.state;

    return (
      <div>
        <h4>
          <FontAwesome name="envelope" /> Post Form
        </h4>
        <div className="well well-lg">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                required
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={post.title}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Body</label>
              <textarea
                required
                className="form-control"
                id="body"
                name="body"
                cols="30"
                rows="4"
                value={post.body}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                required
                type="text"
                className="form-control"
                id="author"
                name="author"
                value={post.author}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                required
                className="form-control"
                id="category"
                name="category"
                value={post.category}
                onChange={this.handleChange}
              >
                <option value="" />
                {this.props.categories.map(category => (
                  <option key={category.path} value={category.path}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-sm smallMargin"
            >
              <span className="glyphicon glyphicon-ok" /> Save
            </button>
            <Link to="/" className="btn btn-warning btn-sm smallMargin">
              <span className="glyphicon glyphicon-remove" /> Cancel
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => ({ categories });

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => dispatch(getCategories()),
    getPost: (id, callback) => dispatch(getPost(id, callback)),
    addPost: (post, callback) => dispatch(addPost(post, callback)),
    updatePost: (post, callback) => dispatch(updatePost(post, callback))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
