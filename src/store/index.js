import { createStore } from 'vuex'
import AuthService from '@/service/AuthService'
import authHeader from '@/service/auth-header'

export default createStore({
  state: {
    id:null,
    user:null,
    loggedIn: false,
    sideBarOpen: false
  },
  getters: {
    isLoggedIn: state => state.loggedIn,

    sideBarOpen: state => {
      return state.sideBarOpen
  }
  },
  mutations: {
    loginSuccess(state, user){
      state.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.loggedIn = false;
    },
    registerFailure(state) {
      state.loggedIn = false;
    },
    toggleSidebar (state) {
      state.sideBarOpen = !state.sideBarOpen
  }

  },
  actions: {
     loggedIn({commit},user){
      return AuthService.login(user).then(
        user=>{
        //  localStorage.setItem('token',user.data)
          commit('loginSuccess',user)
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      )
     },
    logout({ commit }) {
      AuthService.logout()
      commit('logout');
    },

    toggleSidebar(context) {
      context.commit('toggleSidebar')
  }

  },
  modules: {
    authHeader
  }
})
