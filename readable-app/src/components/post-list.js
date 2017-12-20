import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import FontAwesome from 'react-fontawesome';

import SortOn, { FIELD_DATE, ORDER_DESC } from './sort-on';
import Post from './post';
import AppAlert from './app-alert';

import * as ReadableApi from '../api/readable-api';

class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      sortParams: { field: FIELD_DATE, order: ORDER_DESC }
    };

    this.onDeletePost = this.onDeletePost.bind(this);
    this.onChangeSortParams = this.onChangeSortParams.bind(this);
    this.onVotePost = this.onVotePost.bind(this);
  }

  componentDidMount() {
    this.getPosts();
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.getPosts();
    }
  }

  getPosts() {
    const category = this.props.category;
    let postsPromise = category
      ? ReadableApi.getPostsForCategory(category)
      : ReadableApi.getPosts();

    postsPromise
      .then(posts => {
        console.log(
          `SUCCESS: Get posts successful! (category: ${
            category ? category : 'all'
          })`
        );
        this.setState({ posts });
      })
      .catch(error => {
        console.log(
          `ERROR: Get posts failed! (category: ${category ? category : 'all'})`,
          error
        );
      });
  }

  onDeletePost(id) {
    ReadableApi.deletePost(id)
      .then(() => {
        console.log(`SUCCESS: Delete post successful! (id: ${id})`);
        this.setState(prevState => {
          return { posts: prevState.posts.filter(post => post.id !== id) };
        });
      })
      .catch(error => {
        console.log(`ERROR: Delete post failed! (id: ${id})`, error);
      });
  }

  onChangeSortParams(sortParams) {
    this.setState({ sortParams });
  }

  onVotePost(id, voteOption) {
    ReadableApi.votePost(id, voteOption)
      .then(updatedPost => {
        console.log(
          `SUCCESS: Vote post successful! (id: ${id}, voteOption: ${voteOption})`
        );
        this.setState(prevState => {
          const posts = prevState.posts.filter(post => post.id !== id);
          let post = prevState.posts.find(post => post.id === id);
          post = Object.assign({}, updatedPost);
          posts.unshift(post);
          return { posts };
        });
      })
      .catch(error => {
        console.log(
          `ERROR: Vote post failed! (id: ${id}, voteOption: ${voteOption})`,
          error
        );
      });
  }

  render() {
    const { category } = this.props;
    const { posts, sortParams } = this.state;

    const sortedPosts = _.orderBy(posts, sortParams.field, sortParams.order);

    return (
      <div>
        <div className="pull-right">
          <Link to="/posts/new" className="btn btn-sm btn-primary">
            <span className="glyphicon glyphicon-plus" /> New Post
          </Link>
        </div>
        <h4>
          <FontAwesome name="envelope" /> Posts (Category:{' '}
          {category ? category : 'all'})
        </h4>
        {sortedPosts.length > 0 ? (
          <div>
            <SortOn
              params={this.state.sortParams}
              changeSortParams={this.onChangeSortParams}
            />
            {sortedPosts.map(post => (
              <Post
                key={post.id}
                post={post}
                deletePost={this.onDeletePost}
                votePost={this.onVotePost}
              />
            ))}
          </div>
        ) : (
          <AppAlert
            type="info"
            message="No posts available for selected category."
          />
        )}
      </div>
    );
  }
}

export default PostList;
