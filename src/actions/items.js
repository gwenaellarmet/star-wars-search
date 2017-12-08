import fetch from 'isomorphic-fetch';

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const UPDATE_SRC = 'UPDATE_SRC';

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

function updateSrcString(searchStr) {
  return {
    type: UPDATE_SRC,
    searchStr,
  };
}

function requestItems(searchStr) {
  return {
    type: REQUEST_ITEMS,
    searchStr,
  };
}

function receiveItems(searchStr, items) {
  return {
    type: RECEIVE_ITEMS,
    searchStr,
    items,
    receivedAt: Date.now(),
  };
}

function prepareRelatives(relatives) {
  return relatives.map(item => {
    if(item) {
      let splited = item.slice(0, -1).split('/');
      let res = {
        id: splited.pop(),
        type: splited.pop()
      }

      res.type = (res.type == 'people') ? 'person' : 
                 (res.type == 'films') ? 'film' :
                 (res.type == 'starships') ? 'starship' :
                 (res.type == 'vehicles') ? 'vehicle' :
                 (res.type == 'planets') ? 'planet' : res.type;
      return res;
    }
  })
}

function prepareItems(array) {
  let combined = [];
  array.forEach((item) => {
    combined = combined.concat(item.results);
  });

  return combined.map((item) => {
    if (Object.hasOwnProperty.call(item, 'episode_id')) {
      return {
        type: 'film',
        name: item.title,
        episode_id: item.episode_id,
        director: item.director,
        producer: item.producer,
        release_date: item.release_date,
        id: item.url.slice(0, -1).split('/').pop(),
        relatives: prepareRelatives(item.characters.concat(item.species)
                                                   .concat(item.starships)
                                                   .concat(item.vehicules))
      };
    } else if (Object.hasOwnProperty.call(item, 'vehicle_class')) {
      return {
        type: 'vehicle',
        name: item.name,
        model: item.model,
        cost_in_credits: item.cost_in_credits,
        manufacturer: item.manufacturer,
        id: item.url.slice(0, -1).split('/').pop(),
        relatives: prepareRelatives(item.films.concat(item.pilots))
      };
    } else if (Object.hasOwnProperty.call(item, 'hyperdrive_rating')) {
      return {
        type: 'starship',
        name: item.name,
        model: item.model,
        hyperdrive_rating: item.hyperdrive_rating,
        manufacturer: item.manufacturer,
        id: item.url.slice(0, -1).split('/').pop(),
        relatives: prepareRelatives(item.films.concat(item.pilots))
      };
    } else if (Object.hasOwnProperty.call(item, 'classification')) {
      return {
        type: 'species',
        name: item.name,
        classification: item.classification,
        designation: item.designation,
        language: item.language,
        id: item.url.slice(0, -1).split('/').pop(),
        relatives: prepareRelatives(item.films.concat(item.people))
      };
    } else if (Object.hasOwnProperty.call(item, 'orbital_period')) {
      return {
        type: 'planet',
        name: item.name,
        gravity: item.gravity,
        terrain: item.terrain,
        population: item.population,
        id: item.url.slice(0, -1).split('/').pop(),
        relatives: prepareRelatives(item.films.concat(item.residents))
      };
    }
    return {
      type: 'person',
      name: item.name,
      gender: item.gender,
      height: item.height,
      mass: item.mass,
      id: item.url.slice(0, -1).split('/').pop(),
      relatives: prepareRelatives(item.films.concat(item.species)
                                            .concat(item.starships)
                                            .concat(item.vehicules)
                                            .concat(item.homeworld))
    };
  }).sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
}

function fetchAllNext(array) {
  let nexts = getAllNext(array);
 
  if(nexts.length > 0) {
    return getAllUrl(nexts).then(results => {
      array.map(item => {
        item.next = null;
        return item;
      });
      array = array.concat(results);
      return fetchAllNext(array);
    })
  } else {
    return array;
  }
}

function getAllUrl(urls) {
  return Promise.all(urls.map(url =>
           fetch(url).then(resp => resp.json())
         ));
}

function getAllNext(array) {
  let nexts = []
  array.map(item => {
    if (item && item.next) {
      nexts.push(item.next);
    }
  });
  return nexts
}

function fetchAllItems(searchStr) {
  const endpoints = [
    'https://swapi.co/api/people/?search=' + searchStr,
    'https://swapi.co/api/films/?search=' + searchStr,
    'https://swapi.co/api/starships/?search=' + searchStr,
    'https://swapi.co/api/species/?search=' + searchStr,
    'https://swapi.co/api/planets/?search=' + searchStr,
    'https://swapi.co/api/vehicles/?search=' + searchStr
  ];

  return (dispatch) => {
    dispatch(updateSrcString(searchStr));
    dispatch(requestItems(searchStr));

    return getAllUrl(endpoints)
      .then(results => fetchAllNext(results))
      .then(array => prepareItems(array))
      .then(json => dispatch(receiveItems(searchStr, json)))
    ;
  };
}


function shouldFetchItems(state, searchStr) {
  const posts = state.itemsBySearchString[searchStr];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  }
  return false;
}

export function fetchItemsIfNeeded(searchStr) {
  return (dispatch, getState) => {
    if (shouldFetchItems(getState(), searchStr)) {
      return dispatch(fetchAllItems(searchStr));
    }
    return dispatch(updateSrcString(searchStr));
  };
}

