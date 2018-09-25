import axios from "axios";

import config from "../app/config";
import { buildProtocolUrl } from "../app/helper";

export const LIST = "listing/LIST";
export const GET = "listing/GET";

const initialState = {
  current: null,
  list: [],
  byUnitList: {},
  idIndex: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LIST:
      let newState = {
        ...state,
        list: action.data.list,
        byUnitList: action.data.list.reduce(function(map, obj) {
          let unit = obj.fields.unit;
          let buildingId = unit.fields.building.id;

          if (!(buildingId in map)) {
            map[buildingId] = {};
          }

          if (!(unit.id in map[buildingId])) {
            map[buildingId][unit.id] = [];
          }

          map[buildingId][unit.id].push(obj);

          return map;
        }, {}),
        idIndex: action.data.list.reduce(function(map, obj) {
          map[obj.id] = obj;
          return map;
        }, {})
      };
      return newState;

    case GET:
      let getNewState = {
        ...state,
        current: action.data
      };
      return getNewState;

    default:
      return state;
  }
};

export const getListings = buildingId => dispatch => {
  return axios.get(buildProtocolUrl(config.site.API_ENDPOINT_V2) + "/listing?building=" + buildingId)
    .then((response) => {
      if (+response.data.statusCode === 200) {
        dispatch({
          type: LIST,
          data: response.data.result
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getListing = (listingId) => dispatch => {
  return axios.get(buildProtocolUrl(config.site.API_ENDPOINT_V2) + "/listing/" + listingId)
    .then((response) => {
      if (+response.data.statusCode === 200) {
        dispatch({
          type: GET,
          data: response.data.result
        });

        return response.data.result;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const removeListing = () => dispatch => {
  return new Promise(resolve => {
    dispatch({
      type: GET,
      data: null
    });

    resolve({});
  });
}

export const getAllListing = () => dispatch => {
  return axios.get(buildProtocolUrl(config.site.API_ENDPOINT_V2) + "/listing")
    .then((response) => {
      if (+response.data.statusCode === 200) {
        dispatch({
          type: LIST,
          data: response.data.result
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
