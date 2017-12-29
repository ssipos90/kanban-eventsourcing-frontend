import api from '@/api';
import {decode} from '@/auth.js';

export default {
  state: {
    user: null
  },
  getters: {
    getUser: state => state.user,
    isLoggedIn: state => state.user !== null
  },
  mutations: {
    loginUser: (state, data) => {
      // TODO this is a good place to map user data

      state.user = data;
    },
    logout: state => {
      state.user = null;
    }
  },
  actions: {
    logout: ({commit}) => {
      window.localStorage.removeItem('token');

      return Promise.resolve(commit('logout'));
    },
    login: ({dispatch}, {username, password}) => api
      .auth({username, password})
      .then(({token}) => {
        dispatch('loginFromToken', token);
        window.localStorage.setItem('token', token);
      }),
    loginFromStorage: ({dispatch}) => {
      const token = window.localStorage.getItem('token');
      if (token === null) {
        return Promise.reject(new Error('No token in storage.'));
      }

      return dispatch('loginFromToken', token)
        .catch(e => Promise.reject(new Error('Local storage login: ' + e.message)));
    },
    loginFromToken: ({commit, getters}, token) => {
      const data = decode(token);
      const iat = new Date(data.iat * 1000);
      const exp = new Date(data.exp * 1000);
      if (iat > new Date()) {
        return Promise.reject(new Error('Future token'));
      }
      if (exp < new Date()) {
        return Promise.reject(new Error('Token expired.'));
      }
      commit('loginUser', data);

      return Promise.resolve(getters.getUser);
    }
  }
};
