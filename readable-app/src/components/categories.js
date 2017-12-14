import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import * as ReadableApi from '../api/readable-api';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.all = { name: 'all', path: '' };
    this.state = { categories: [this.all] };
  }

  componentDidMount() {
    ReadableApi.getCategories()
      .then(categories => {
        console.log('SUCCESS: Get categories successful!');
        this.setState({ categories: [this.all, ...categories] });
      })
      .catch(error => {
        console.log('ERROR: Get categories failed!', error);
      });
  }

  render() {
    return (
      <div>
        <h3>Categories</h3>
        <div className="list-group">
          {this.state.categories.map(category => (
            <NavLink
              key={category.name}
              to={`/${category.path}`}
              className="list-group-item"
              activeClassName="active"
              exact
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
    );
  }
}

export default Categories;
