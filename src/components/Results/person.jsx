import React, { PropTypes } from 'react';

const Person = props => (
  <li className="results__item">
    <h3 className="results__title">{props.item.name}</h3>
    <ul className="results__info">
      <li>Gender <span>{props.item.gender}</span></li>
      <li>Height <span>{props.item.height}cm</span> </li>
      <li>Weight <span>{props.item.mass}kg</span> </li>
    </ul>
  </li>
);

Person.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    gender: PropTypes.string,
    height: PropTypes.string,
    mass: PropTypes.string,
    type: PropTypes.string,
  }),
};

export default Person;
