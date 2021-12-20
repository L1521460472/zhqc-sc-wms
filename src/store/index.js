import Vue from 'vue'
import Vuex from 'vuex'
import tagsView from './modules/tagsView'
import login from './modules/login'
import power from './modules/power'

import getters from './getters'
import persistedstate from './modules/persistedstate'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const context = require.context('./../page', true, /\.store.js$/)
const moduleStores = {}
context.keys().forEach(key => {
  const fileName = key.split('/')
  const size = fileName.length
  const modName = fileName[size - 1].split('.')[0]
  const fileModule = context(key).default
  moduleStores[modName] = {
    ...fileModule,
    namespaced: true // 文件中有写可以省略；不过这样写可以不用给每个文件写入；这个属性不知道自己去查文档；
  }
})

const store = new Vuex.Store({
  modules: {
    login,
    tagsView,
    power,
    persistedstate,
    ...moduleStores
  },
  plugins: [createPersistedState({ storage: window.localStorage, reducer(val) {
    return {
      persistedstate: val.persistedstate
    }
  } })],
  getters
})

export default store
