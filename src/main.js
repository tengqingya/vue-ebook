// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'

import {checkLogin} from './localStorage/localStorage'

import PixelSpinner from './views/Spinner/index'
Vue.use(PixelSpinner)

/**
 * todo 全部引入大约50k 可以自定义引入
 */
import animate from 'animate.css'

import { Toast } from 'mint-ui';
import 'mint-ui/lib/style.css';


import '../src/common/css/font.css'

import { Indicator } from 'mint-ui';

import {checkLoginAndValidateToken} from './localStorage/localStorage'
import {
  USER_FAVORITE_COUNT
} from './axios/axios'

/* eslint-disable no-new */
var vue = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  Indicator.open({
    text: 'Loading...',
    spinnerType: 'triple-bounce'
  })
  if(to.meta.auth){
    console.log(to)
    //check 是否有本地缓存 没有直接跳转登录
    //直接刷新不会走路由
    if(checkLogin(vue)){
      //尝试刷新token

      checkLoginAndValidateToken(vue, {ajaxFunction: USER_FAVORITE_COUNT(vue, {type: 2})}).then(e=>{
        console.log(e)
        if(e){
          next()
        }else {
          if(to.meta.JumpToLogin){
            next({ path: '/login' })
          }else {
            next()
          }
        }
      })
        .catch(e=>next({ path: '/login' }))

    }else {
      if(to.meta.JumpToLogin){
        next({ path: '/login' })
      }else {
        next()
      }
    }
  }else {
    next()
  }
  console.log("beofore")
});

router.afterEach(() => {
  window.scrollTo(0,0)
  console.log("done")
  setTimeout(function () {
    Indicator.close();
  },600)

});


// Toast('App Begin!!!!');
