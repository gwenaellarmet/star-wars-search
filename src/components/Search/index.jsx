import React, { PropTypes } from 'react';

import './search.scss';
import icon from './images/search.svg';

const Search = (props) => {
  const { value, onChange } = props;

  return (
    <div className="search">
      <div className="search__title">Search in Swapi</div>
      <div className="search__subtitle"><a href="https://swapi.co/">Swapi.co</a></div>
      <div className="search__input">
        <div
          className="search__icon"
          dangerouslySetInnerHTML={{ __html: icon }}
        />
        <input
          type="text"
          placeholder="Enter a search term"
          onChange={e => onChange(e.target.value)}
          value={value}
          autoFocus
        />
      </div>
    </div>
  );
};

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Search;
