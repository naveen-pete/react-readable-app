import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import FontAwesome from 'react-fontawesome';

import SortOn from '../common/sort-on';
import Post from './post';
import AppAlert from '../common/app-alert';

import { getPosts, setPostsSortParams } from '../../actions';

// --------------------------------------------------------------------
// PostList component displays the list of all posts (or) posts
// belonging to a selected category. This component uses:
// 1. Post component to display posts in a list
// 2. SortOn component to display and change the sort field and
//    sort order
// 3. AppAlert component to display a message if no posts are
//    available for a category
// --------------------------------------------------------------------
class PostList extends Component {
  constructor(props) {
    super(props);

    this.onChangeSortParams = this.onChangeSortParams.bind(this);
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
    this.props.getPosts(category);
  }

  onChangeSortParams(sortParams) {
    this.props.setPostsSortParams(sortParams);
  }

  render() {
    const { category, posts, postsSortParams } = this.props;

    const sortedPosts = _.orderBy(
      _.map(posts),
      postsSortParams.field,
      postsSortParams.order
    );

    return (
      <div className="col-sm-9">
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
              sortParams={postsSortParams}
              changeSortParams={this.onChangeSortParams}
            />
            {sortedPosts.map(post => <Post key={post.id} post={post} />)}
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

const mapStateToProps = ({ posts, postsSortParams }) => ({
  posts,
  postsSortParams
});

const mapDispatchToProps = dispatch => {
  return {
    getPosts: category => dispatch(getPosts(category)),
    setPostsSortParams: sortParams => dispatch(setPostsSortParams(sortParams))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
