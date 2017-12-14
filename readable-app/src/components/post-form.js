import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import uuid from 'uuid';

import * as ReadableApi from '../api/readable-api';
const NEW_ID = 'new';

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      post: {
        id: NEW_ID,
        title: '',
        body: '',
        author: '',
        category: '',
        timestamp: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getCategories();
    const id = this.props.match.params.id;
    if (id) {
      this.getPost(id);
    }
  }

  getCategories() {
    ReadableApi.getCategories()
      .then(categories => {
        console.log('SUCCESS: Get categories successful!');
        this.setState({ categories });
      })
      .catch(error => {
        console.log('ERROR: Get categories failed!', error);
      });
  }

  getPost(id) {
    ReadableApi.getPost(id)
      .then(post => {
        console.log(`SUCCESS: Get post successful! (id: ${id})`);
        this.setState({ post });
      })
      .catch(error => {
        console.log(`ERROR: Get post failed! (id: ${id})`, error);
      });
  }

  handleSubmit(event) {
    event.preventDefault();

    const post = Object.assign({}, this.state.post);
    const isNewPost = post.id === NEW_ID;

    let postPromise;
    if (isNewPost) {
      post.id = uuid();
      post.timestamp = Date.now();

      postPromise = ReadableApi.addPost(post);
    } else {
      postPromise = ReadableApi.updatePost(post);
    }

    postPromise
      .then(post => {
        console.log('SUCCESS: Post successfully added/updated!');
        this.props.history.push('/');
      })
      .catch(error => {
        console.log('ERROR: Failed to add/update post.', error);
      });
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
        <h4>Post Form</h4>
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
                {this.state.categories.map(category => (
                  <option key={category.path} value={category.path}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary smallMargin">
              <span className="glyphicon glyphicon-ok" />
            </button>
            <Link to="/" className="btn btn-warning smallMargin">
              <span className="glyphicon glyphicon-remove" />
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default PostForm;
