import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { getCategories } from '../../actions';

const CATEGORY_ALL = { name: 'all', path: '' };

// ---------------------------------------------------------------------
// Categories component displays the list of categories within the app.
// ---------------------------------------------------------------------
class Categories extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const categories = [CATEGORY_ALL, ...this.props.categories];

    return (
      <div className="col-sm-3">
        <h4>
          <FontAwesome name="object-group" /> Category
        </h4>
        <div className="list-group">
          {categories.map(({ name, path }) => (
            <NavLink
              key={path}
              to={`/${path}`}
              className="list-group-item"
              activeClassName="active"
              exact
            >
              {name}
            </NavLink>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => ({ categories });

const mapDispatchToProps = dispatch => {
  return { getCategories: () => dispatch(getCategories()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
