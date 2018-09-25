import axios from "axios";
import {buildProtocolUrl} from "../app/helper"

import config from "../app/config"
import { GET } from "./listing";

export const UNIT = {
  SUCCESS : "UNIT_SUCCESS",
  FAIL : "UNIT_FAIL",
}

const initialState = {
  current: null,
};

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case UNIT.SUCCESS:
      newState = {
        ...state,
        current: action.data,
      };
      return newState;

    case UNIT.FAIL:
      newState = {
        ...state,
        current: action.data,
      };
      return newState;

    default:
      return state;
  }
};

export const getUnit = (unitId) => dispatch => {
  return axios.get(buildProtocolUrl(config.site.API_ENDPOINT_V2) + '/unit/' +  unitId)
    .then((response) => {
      if(+response.data.statusCode === 200) {
        dispatch({
          type: UNIT.SUCCESS,
          data: response.data.result,
        });

        return response.data.result;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const removeUnit = () => dispatch => {
  return new Promise(resolve => {
    dispatch({
      type: UNIT.SUCCESS,
      data: null
    });

    resolve({});
  });
}
