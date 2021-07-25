import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// 模拟数据请求
function fetchData () {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      let data = {
        msg: "success"
      };
      resolve(data)
    }, 500)
  })
}

export function createStore () {
  return new Vuex.Store({
    state: {
      message: ""
    },
    actions: {
      fetchData ({ commit }) {
        return fetchData().then(item => {
          commit("setMessage", item.msg);
        })
      }
    },
    mutations: {
      setMessage (state, msg) {
        this.state.msg = msg;
      }
    }
  })
}
