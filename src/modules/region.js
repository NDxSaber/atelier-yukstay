import { LIST } from './building'

const initialState = {
  list: [],
  stubIndex: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LIST:
      let countMap = {};
      let regionLookup = action.data.list.reduce((lookup, obj) => {
        if(!obj.fields.regions) {
          return lookup;
        }

        obj.fields.regions.forEach((region) => {
          let stub = region.fields.stub;
          countMap[stub] = (stub in countMap) ? countMap[stub] + 1 : 1;
          lookup[region.fields.stub] = region;
        });
        return lookup;
      }, {});

      let regionsList = Object.entries(countMap).sort((a, b) => b[1] - a[1])
        .map((entry) => regionLookup[entry[0]]);

      let newState = {
        ...state,
        list: regionsList,
        stubIndex: regionLookup
      };
      return newState;

    default:
      return state;
  }
};
