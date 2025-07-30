export default {
  namespaced: true,
  state() {
    return {
      userName: "fffff",
      email: "ee@eee",
      mobile: "12345678",
    };
  },
  mutations: {
    setUser(state, payload) {
      state.userName = payload.fullName;
      state.email = payload.email;
      state.mobile = payload.mobile;
    },
  },
  getters: {
    getUsers(state) {
      return {
        fullName: state.userName,
        email: state.email,
        mobile: state.mobile,
      };
    },
  },
  actions: {},
};
