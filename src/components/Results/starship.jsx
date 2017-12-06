import React, { PropTypes } from 'react';

const Film = props => (
  <li className="results__item">
    <h3 className="results__title">
      {props.item.name}
    </h3>
    <ul className="results__info">
      <li>Model <span>{props.item.model}</span> </li>
      <li>Manufacturer <span>{props.item.manufacturer}</span> </li>
      <li>Hyperdrive Rating <span>{props.item.hyperdrive_rating}</span> </li>
    </ul>
  </li>
);

Film.propTypes = {
  item: PropTypes.shape({
    model: PropTypes.string,
    name: PropTypes.string.isRequired,
    manufacturer: PropTypes.string,
    hyperdrive_rating: PropTypes.string,
    type: PropTypes.string.isRequired,
  }),
};

export default Film;
