import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataList: [],
    userData: {},
    clickData: {},
    commentState: 0
  },
  mutations: {
    updateList(state, data) {
      state.dataList = data
    },
    updateUser(state, data) {
      state.userData = data
    },
    updateClick(state, data) {
      state.clickData = data
    },
    updateComment(state, data) {
      state.commentState = data
    }
  },
  actions: {
    updateList(context, data) {
      context.commit("updateList", data)
    },
    updateUser(context, data) {
      context.commit("updateUser", data)
    },
    updateClick(context, data) {
      context.commit("updateClick", data)
    },
    updateComment(context, data) {
      context.commit("updateComment", data)
    }
  }
});
