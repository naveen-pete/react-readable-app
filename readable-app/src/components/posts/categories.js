import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import * as ReadableApi from '../../api/readable-api';

const CATEGORY_ALL = { name: 'all', path: '' };

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = { categories: [CATEGORY_ALL] };
  }

  componentDidMount() {
    ReadableApi.getCategories()
      .then(categories => {
        console.log('SUCCESS: Get categories successful!');
        this.setState({ categories: [CATEGORY_ALL, ...categories] });
      })
      .catch(error => {
        console.log('ERROR: Get categories failed!', error);
      });
  }

  render() {
    return (
      <div>
        <h4>
          <FontAwesome name="object-group" /> Category
        </h4>
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
