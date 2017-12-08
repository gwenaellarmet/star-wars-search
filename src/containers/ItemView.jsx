import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchItemsIfNeeded } from '../actions/items';
import Results from '../components/Results';

import './ItemView.scss';

class ItemView extends Component {
  constructor(props) {
    super(props);
    this.getCurrentItem = this.getCurrentItem.bind(this);
    this.getItem = this.getItem.bind(this);
  }

  componentDidMount() {
    const { dispatch, searchStr } = this.props;
    dispatch(fetchItemsIfNeeded(searchStr));
  }

  getCurrentItem() {
    const { type, id } = this.props.params;
    var currentItem = this.getItem(type, id);

    if(currentItem && currentItem.relatives && currentItem.relatives.length > 0) {
        currentItem.relatives.clean(undefined);
        currentItem.relatives = currentItem.relatives.map(
            item => this.getItem(item.type, item.id)
        );
    }
    return currentItem;
  }
  
  getItem(type, id) {
    const { items } = this.props;

    let res = items.filter((item) => item && item.type == type && item.id == id).pop();    
    return res || {};
  }

  render() {
    const { isFetching, items } = this.props;
    const item = this.getCurrentItem();

    console.log("current : ", item)
    
    return (
      <div className="container">
        <header className="header">
            <Link className="back__link" to="/"> Back to search </Link>
            <div className="details">
                <div className="details__title">{item.name}</div>
                <div className="details__subtitle">{item.type}</div>
                <ul className="details__detail">
                    {(item.episode_id) ?        <li> {'episode number : '   + item.episode_id}        </li> : '' }
                    {(item.director) ?          <li> {'director : '         + item.director}          </li> : '' }
                    {(item.producer) ?          <li> {'producer : '         + item.producer}          </li> : '' }
                    {(item.release_date) ?      <li> {'release date : '     + item.release_date}      </li> : '' }
                    {(item.model) ?             <li> {'model : '            + item.model}             </li> : '' }
                    {(item.cost_in_credits) ?   <li> {'cost in credits : '  + item.cost_in_credits}   </li> : '' }
                    {(item.hyperdrive_rating) ? <li> {'hyperdrive rating : '+ item.hyperdrive_rating} </li> : '' }
                    {(item.manufacturer) ?      <li> {'manufacturer : '     + item.manufacturer}      </li> : '' }
                    {(item.classification) ?    <li> {'classification : '   + item.classification}    </li> : '' }
                    {(item.designation) ?       <li> {'designation : '      + item.designation}       </li> : '' }
                    {(item.language) ?          <li> {'language : '         + item.language}          </li> : '' }
                    {(item.gravity) ?           <li> {'gravity : '          + item.gravity}           </li> : '' }
                    {(item.terrain) ?           <li> {'terrain : '          + item.terrain}           </li> : '' }
                    {(item.population) ?        <li> {'population : '       + item.population}        </li> : '' }
                    {(item.gender) ?            <li> {'gender : '           + item.gender}            </li> : '' }
                    {(item.height) ?            <li> {'height : '           + item.height}            </li> : '' }
                    {(item.mass) ?              <li> {'mass : '             + item.mass}              </li> : '' }
                </ul>
            </div>
        </header>
        <section className="content">
          {!isFetching && (!item.relatives || item.relatives.length)=== 0 &&
            <h2 className="no__result">No Relatives</h2>
          }
          {item.relatives && item.relatives.length > 0 &&
            <Results items={item.relatives} />
          }
        </section> 
      </div>
    );
  }
}

ItemView.propTypes = {
  searchStr: PropTypes.string,  
  items: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  const { searchStr, itemsBySearchString } = state;
  const { isFetching, items } = itemsBySearchString[searchStr] || {
    searchStr: searchStr,
    isFetching: true,
    items: [],
  };

  return {
    searchStr,
    items,
    isFetching,
  };
}

export default connect(mapStateToProps)(ItemView);
