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
      // this is a good place to map user data

      state.user = data;
    }
  },
  actions: {
    loginFromStorage: ({commit}) => {
      const token = window.localStorage.getItem('token');
      if (token !== null) {
        const data = decode(token);
        console.log(data);
        const iat = new Date(data.iat * 1000);
        const exp = new Date(data.exp * 1000);
        if (iat > new Date()) {
          // future token
          return;
        }
        if (exp < new Date()) {
          // token expired
          // TODO maybe delete
          return;
        }
        commit('loginUser', data);
      }
    }
  }
};
