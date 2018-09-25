import axios from "axios";
import {buildProtocolUrl} from "../app/helper"

import config from "../app/config"

export const LIST = "building/LIST";

const initialState = {
  list: [],
  idIndex: null,
  stubIndex: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LIST:
      let newState = {
        ...state,
        list: action.data.list,
        idIndex: action.data.list.reduce(function(map, obj) {
          map[obj.id] = obj;
          return map;
        }, {}),
        stubIndex: action.data.list.reduce(function(map, obj) {
          map[obj.fields.stub] = obj;
          return map;
        }, {})
      };
      return newState;

    default:
      return state;
  }
};

export const getBuildings = () => dispatch => {
  return axios.get(buildProtocolUrl(config.site.API_ENDPOINT_V2) + '/building')
    .then((response) => {
      if(+response.data.statusCode === 200) {
        dispatch({
          type: LIST,
          data: response.data.result
        });

        return response.data.result;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
