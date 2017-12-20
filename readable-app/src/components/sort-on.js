import React, { Component } from 'react';

export const FIELD_DATE = 'timestamp';
export const FIELD_SCORE = 'voteScore';
export const ORDER_ASC = 'asc';
export const ORDER_DESC = 'desc';

class SortOn extends Component {
  constructor(props) {
    super(props);

    this.onFieldChange = this.onFieldChange.bind(this);
    this.onOrderChange = this.onOrderChange.bind(this);
  }

  onFieldChange(event) {
    const sortParams = {
      field: event.target.value,
      order: this.props.params.order
    };
    this.props.changeSortParams(sortParams);
  }

  onOrderChange(event) {
    const sortParams = {
      field: this.props.params.field,
      order: event.target.value
    };
    this.props.changeSortParams(sortParams);
  }

  render() {
    const { params } = this.props;

    return (
      <div className="well well-sm">
        <div className="row">
          <div className="col-sm-3">
            <label htmlFor="sortField">Sort on:</label>
            <div className="form-group">
              <select
                id="sortField"
                className="form-control"
                value={params.field}
                onChange={this.onFieldChange}
              >
                <option value={FIELD_DATE}>Timestamp</option>
                <option value={FIELD_SCORE}>Score</option>
              </select>
            </div>
          </div>
          <div className="col-sm-3">
            <label htmlFor="sortOrder">Order:</label>
            <div className="form-group">
              <select
                id="sortOrder"
                className="form-control"
                value={params.order}
                onChange={this.onOrderChange}
              >
                <option value={ORDER_ASC}>Ascending</option>
                <option value={ORDER_DESC}>Descending</option>
              </select>
            </div>
          </div>
          <div className="col-sm-6" />
        </div>
      </div>
    );
  }
}

export default SortOn;
