import { combineReducers } from 'redux';

import auth from './auth';
import building from './building';
import listing from './listing';
import unit from './unit';
import region from './region';

export default combineReducers({
  auth,
  building,
  listing,
  unit,
  region
});
