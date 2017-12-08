import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Layout.scss';

export class Layout extends Component {

  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}