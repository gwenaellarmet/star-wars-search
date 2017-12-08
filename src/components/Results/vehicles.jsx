import React, { PropTypes } from 'react';

import { Link } from 'react-router';

const Vehicle = props => (
  <li className="results__item">
    <h3 className="results__title">
      {props.item.name}
    </h3>
    <ul className="results__info">
      <li>Model <span>{props.item.model}</span> </li>
      <li>Manufacturer <span>{props.item.manufacturer}</span> </li>
      <li>Cost in credits <span>{props.item.cost_in_credits}</span> </li>
    </ul>
    <ul className="results__link">
      <Link to={"vehicle/" + props.item.id}>See details...</Link>
    </ul>
  </li>
);

Vehicle.propTypes = {
  item: PropTypes.shape({
    model: PropTypes.string,
    name: PropTypes.string.isRequired,
    manufacturer: PropTypes.string,
    hyperdrive_rating: PropTypes.string,
    type: PropTypes.string.isRequired,
  }),
};

export default Vehicle;
