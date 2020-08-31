import axios from 'axios';
export const getUsersPageOne = () => dispatch => {
  dispatch({ type: 'GET_USERS_PAGE_ONE_REQUEST' })
  axios.get('https://reqres.in/api/users')
    .then(result => {
      dispatch({ type: 'GET_USERS_PAGE_ONE_SUCCESS', payload: result.data.data })
    })
    .catch(err => {
      dispatch({ type: 'GET_USERS_PAGE_ONE_FAILURE', payload: err.response })
    });
};
export const getUsersPageTwo = () => dispatch => {
  dispatch({ type: 'GET_USERS_PAGE_TWO_REQUEST' })
  axios.get('https://reqres.in/api/users?page=2')
    .then(result => {
      dispatch({ type: 'GET_USERS_PAGE_TWO_SUCCESS', payload: result.data.data })
    })
    .catch(err => {
      dispatch({ type: 'GET_USERS_PAGE_TWO_FAILURE', payload: err.response })
    });
};
export const addUser = (data) => dispatch => {
  dispatch({ type: 'ADD_NEW_USER_REQUEST', payload: data })
  axios.post('https://reqres.in/api/users',data)
    .then(result => {
      dispatch({ type: 'ADD_NEW_USER_SUCCESS', payload: result.data })
    })
    .catch(err => {
      dispatch({ type: 'ADD_NEW_USER_FAILURE', payload: err.response })
    });
};
export const deleteUser = (id) => dispatch => {
  dispatch({ type: 'DELETE_USER_REQUEST' })
  axios.post(`https://reqres.in/api/users?id=${id}`)
    .then(result => {
      dispatch({ type: 'DELETE_USER_SUCCESS', payload: id })
    })
    .catch(err => {
      dispatch({ type: 'DELETE_USER_FAILURE', payload: err.response })
    });
};
export const updateUser = (data) => dispatch => {
  dispatch({ type: 'UPDATE_USER_REQUEST', payload: data })
  axios.post(`https://reqres.in/api/users?id=${data.id}`,data)
    .then(result => {
      dispatch({ type: 'UPDATE_USER_SUCCESS', payload: result.data })
    })
    .catch(err => {
      dispatch({ type: 'UPDATE_USER_FAILURE', payload: err.response })
    });
};