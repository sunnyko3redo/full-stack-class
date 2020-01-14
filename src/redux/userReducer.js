import { SIGNUP, LOGIN } from './actionTypes';
import axios from 'axios';

const initialState = {
  user: {},
  redirect: false,
  error: false
};

export const signup = (username, password) => {
  return {
    type: SIGNUP,
    payload: axios
      .post('/api/signup', { username, password })
      .then(res => res.data)
  };
};

export const login = (username, password) => {
  return {
    type: LOGIN,
    payload: axios
      .post('/api/login', { username, password })
      .then(res => res.data)
  };
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  console.log(action);
  switch (type) {
    case `${LOGIN}_FULFILLED`:
      return {
        user: payload,
        redirect: false,
        error: false
      };
    case `${LOGIN}_REJECTED`:
      return {
        ...state,
        error: payload
      };
    case `${SIGNUP}_FULFILLED`:
      return {
        redirect: false,
        user: payload,
        error: false
      };
    case `${SIGNUP}_REJECTED`:
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
}