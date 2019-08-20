import Vue from "vue";
import Vuex from "vuex";
import getters from "./getter";
import user from "./modules/user";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user
  },
  getters,
  plugins: [createPersistedState]
});

export default store;
