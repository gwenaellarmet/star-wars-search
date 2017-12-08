import React, { PropTypes } from 'react';

import { Link } from 'react-router';

const Species = props => (
  <li className="results__item">
    <h3 className="results__title">
      {props.item.name}
    </h3>
    <ul className="results__info">
      <li>Designation <span>{props.item.designation}</span> </li>
      <li>Classification <span>{props.item.classification}</span> </li>
      <li>Language <span>{props.item.language}</span> </li>
    </ul>
    <ul className="results__link">
      <Link to={"species/" + props.item.id}>See details...</Link>
    </ul>
  </li>
);

Species.propTypes = {
  item: PropTypes.shape({
    designation: PropTypes.string,
    name: PropTypes.string.isRequired,
    classification: PropTypes.string,
    language: PropTypes.string,
    type: PropTypes.string.isRequired,
  }),
};

export default Species;
