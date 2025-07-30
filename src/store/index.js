import { createStore } from "vuex";
import appointmentModule from "./modules/appointment.js";
import userModule from "./modules/user.js";

const store = createStore({
  modules: {
    appointment: appointmentModule,
    user: userModule,
  },
  state() {
    return {
      isAuthenticated: false,
    };
  },
  mutations: {},
  getters: {
    auth(state) {
      return state.isAuthenticated;
    },
  },
});

export default store;
