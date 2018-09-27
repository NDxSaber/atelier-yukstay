const initialState = {
  data: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        data: action.data
      };

    default:
      return state;
  }
};

export const setData = data => {
  return {
    type: 'SET_DATA',
    data
  };
};
