// app.js
import Vue from 'vue'
import App from './app.vue'
import { createRouter } from './router'
import { createStore } from "./store";
import { sync } from 'vuex-router-sync'

export function createApp () {
  // 创建 router 实例
  const router = createRouter()
  // 创建 vuex 实例
  const store = createStore();
  
  // 同步路由状态(route state)到 store
  sync(store, router)
  
  const app = new Vue({
    // 注入 router 到根 Vue 实例
    router,
    // 注入 vuex 到根 Vue 实例
    store,
    render: h => h(App)
  })
  
  // 返回 app 和 router
  return { app, router, store }
}
