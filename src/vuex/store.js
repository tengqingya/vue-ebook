import Vue from 'vue'
import Vuex from 'vuex'
import {user} from "./module/user"
import {common} from "./module/common"
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
Vue.config.debug = debug

export default new Vuex.Store({
  modules: {
    user,
    common
  },
  strict: debug
})
