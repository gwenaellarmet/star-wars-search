import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchItemsIfNeeded } from '../actions/items';
import Search from '../components/Search';
import Results from '../components/Results';

import './layout.scss';

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatch, searchStr } = this.props;
    dispatch(fetchItemsIfNeeded(searchStr));
  }

  handleChange(searchStr) {
    this.props.dispatch(fetchItemsIfNeeded(searchStr));
  }

  render() {
    const { searchStr, items, isFetching } = this.props;
    return (
      <div className="container">
        <header className="header">
          <Search value={searchStr} onChange={this.handleChange} />
        </header>
        <section className="content">
          {!isFetching && items.length === 0 &&
            <h2 className="no__result">No Results</h2>
          }
          {items.length > 0 &&
            <Results items={items} />
          }
        </section>
      </div>
    );
}
}

AsyncApp.propTypes = {
  searchStr: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  const { searchStr, itemsBySearchString } = state;
  const { isFetching, items } = itemsBySearchString[searchStr] || {
    searchStr,
    isFetching: true,
    items: [],
  };

  return {
    searchStr,
    items,
    isFetching,
  };
}

export default connect(mapStateToProps)(AsyncApp);
