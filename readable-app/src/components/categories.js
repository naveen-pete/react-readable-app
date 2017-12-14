import React, { Component } from 'react';

import * as ReadableApi from '../api/readable-api';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = { categories: [] };
  }

  componentDidMount() {
    ReadableApi.getCategories()
      .then(categories => {
        console.log('SUCCESS: Get categories successful!');
        this.setState({ categories });
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
            <a key={category.name} className="list-group-item">
              {category.name}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

export default Categories;
