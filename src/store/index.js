import Vue from "vue";
import Vuex from "vuex";
import Trend from "vuetrend";

Vue.use(Vuex);
Vue.use(Trend);

export default new Vuex.Store({
  state: {
    countries: []
  },
  mutations: {
    setCountries(state, payload) {
      state.countries = payload;
      console.log(payload);
    }
  },
  actions: {
    getCountries({ commit }) {
      fetch("https://covid2019-api.herokuapp.com/countries")
        .then(res => res.json())
        .then(res =>
          commit(
            "setCountries",
            res.countries.map(item => item.replace(/_/g, " "))
          )
        )
        .catch(err => console.log(err));
    }
  },
  modules: {}
});
