import Cookies from 'js-cookie';
import axios from 'axios';

/*
 * ===============
 * Dispatcher
 * ===============
 */
export const setData = data => {
  return {
    type: 'SET_DATA',
    data
  };
};

/*
 * ===============
 * Action
 * ===============
 */
export const loginUser = () => dispatch =>
  new Promise((resolve, reject) => {
    // axios.get(config.API.login, postData)
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        dispatch(setData(response));
      })
      .catch((error) => {
      });
  })

/*
 * ===============
 * Action
 * ===============
 */
// export const loginUser = (email, password) => dispatch =>
//   new Promise((resolve, reject) => {
//     const user = {
//       email,
//       password,
//       name: 'Awesome User'
//     };

//     dispatch(setCurrentUser(user));
//     resolve(user);
//   });

export const logoutUser = () => dispatch =>
  new Promise(resolve => {
    dispatch({
      type: 'AUTHENTICATE',
      authenticated: false
    });

    dispatch({
      type: 'SET_CURRENT_USER',
      user: {}
    });

    Cookies.remove('mywebsite');
    resolve({});
  });
