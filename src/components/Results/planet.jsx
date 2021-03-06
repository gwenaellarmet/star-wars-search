import React, { PropTypes } from 'react';

import { Link } from 'react-router';

const Planet = props => (
  <li className="results__item">
    <h3 className="results__title">
      {props.item.name}
    </h3>
    <ul className="results__info">
      <li>Terrain <span>{props.item.terrain}</span> </li>
      <li>Gravity <span>{props.item.gravity}</span> </li>
      <li>Population <span>{props.item.population}</span> </li>
    </ul>
    <ul className="results__link">
      <Link to={"planet/" + props.item.id}>See details...</Link>
    </ul>
  </li>
);

Planet.propTypes = {
  item: PropTypes.shape({
    terrain: PropTypes.string,
    gravity: PropTypes.string,
    name: PropTypes.string.isRequired,
    population: PropTypes.string,
    type: PropTypes.string,
  }),
};

export default Planet;
