import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api/index.js';
import {connect} from '@/api/ws.js';
import {decode} from '@/auth.js';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    messages: [],
    ws: null,
    user: null
  },
  getters: {
    ws: ({ws}) => ws,
    message: ({messages}) => messages[0],
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
    },
    setWs: (state, ws) => {
      state.ws = ws;
    },
    message: (state, msg) => {
      state.messages.push({
        color: 'info',
        timeout: 3000,
        show: true,
        ...msg
      });
    }
  },
  actions: {
    logout: ({commit}) => {
      window.localStorage.removeItem('token');

      return Promise.resolve(commit('logout'));
    },
    login: ({dispatch}, {username, password}) => api
      .auth
      .login({username, password})
      .then(({data}) =>
        dispatch('loginFromToken', data.token)
          .then(() => {
            window.localStorage.setItem('token', data.token);
          })
      ),
    loginFromStorage: ({dispatch}) => {
      const token = window.localStorage.getItem('token');
      if (token === null) {
        return Promise.reject(new Error('No token in storage.'));
      }

      return dispatch('loginFromToken', token)
        .catch(e => Promise.reject(new Error('Local storage login: ' + e.message)));
    },
    loginFromToken: ({commit, getters, dispatch}, token) => {
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
      dispatch('setWs', connect(token));

      return Promise.resolve(getters.getUser);
    },
    setWs: ({commit}, ws) => {
      ws.onopen = () => {
        console.log('Connected to ws server.');
      };
      ws.onclose = () => {
        console.log('Disconnected from ws server.');
      };
      ws.onerror = error => {
        console.log(error);
      };
      ws.onmessage = (ev) => {
        console.log(ev);
      };
      commit('setWs', ws);
    }
  }
});
