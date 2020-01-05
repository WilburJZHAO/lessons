import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null, validateAccessCodeEntity: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit("loginSuccess", user);
          return Promise.resolve(user);
        },
        error => {
          commit("loginFailure");
          return Promise.reject(error.response.data);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },
    validateAccessCode({ commit }, validateAccessCodeEntity) {
      return AuthService.validateAccessCode(validateAccessCodeEntity).then(
        data => {
          commit("validateAccessCodeSuccess", data);
          return Promise.resolve(data);
        },
        error => {
          commit("validateAccessCodeFailure");
          return Promise.reject(error.response.data);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status = { loggedIn: true };
      state.user = user.data;
    },
    loginFailure(state) {
      state.status = {};
      state.user = null;
    },
    logout(state) {
      state.status = {};
      state.user = null;
    },
    validateAccessCodeSuccess(state, data) {
      state.status = {};
      state.validateAccessCodeEntity = data.data;
    },
    validateAccessCodeFailure(state) {
      state.status = {};
    }
  }
};
