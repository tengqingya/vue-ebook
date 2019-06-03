import Vue from 'vue'
import Router from 'vue-router'
// import homepage from '../components/swiper/homepage'
// import bookdetail from '../components/bookdetail'
// import booklist from '../components/booklist'
// import search from '../components/search'
// import search_detail from '../components/search_detail'

import components from './components'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: components.homepage,
      meta: {
        KeepAlive: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: components.login
    },
    {
      path: '/book/detail',
      name: 'bookdetail',
      component: components.bookdetail
    },
    {
      path: '/book/list',
      name: 'booklist',
      component: components.booklist
    },
    {
      path: '/book/list2',
      name: 'booklist2',
      component: components.booklist2
    },
    {
      path: '/search',
      name: 'search',
      component: components.search
    },
    {
      path: '/search/detail',
      name: 'search_detail',
      component: components.search_detail
    },
    {
      path: '/user/center',
      name: 'user_center',
      component: components.user_center,
      meta: {
        auth: true,
        JumpToLogin:false
      }
    },
    {
      path: '/reader',
      name: 'reader',
      component: components.reader
    },
    {
      path: '/chart',
      name: 'chart',
      component: components.chart
      // meta: {
      //   KeepAlive: true
      // }
    },
    {
      path: '/chartdetail',
      name: 'chartdetail',
      component: components.chartdetail
      // meta: {
      //   KeepAlive: true
      // }
    },
    {
      path: '/category',
      name: 'category',
      component: components.category
    },
    {
      path: '/categorydetail',
      name: 'categorydetail',
      component: components.categorydetail
    }
    ,
    {
      path: '/special',
      name: 'special',
      component: components.special
    }
    ,
    {
      path: '/limit',
      name: 'limit',
      component: components.limit
    }
    ,
    {
      path: '/limit/booklist',
      name: 'limitbooklist',
      component: components.limitbooklist
    }
    ,
    {
      path: '/special/booklist',
      name: 'specialbooklist',
      component: components.specialbooklist
    },
    {
      path: '/purchased',
      name: 'purchased',
      component: components.purchased,
      meta: {
        auth: true,
        //没有权限的时候跳转不跳转登录页面
        JumpToLogin:true
      }
    },
    {
      path: '/favouritebooks',
      name: 'favouritebooks',
      component: components.favouritebooks,
      meta: {
        auth: true,
        //没有权限的时候跳转不跳转登录页面
        JumpToLogin:true
      }
    },
    {
      path: '/collectsubject',
      name: 'collectsubject',
      component: components.collectsubject,
      meta: {
        auth: true,
        //没有权限的时候跳转不跳转登录页面
        JumpToLogin:true
      }
    },
    {
      path: '/mycurrency',
      name: 'mycurrency',
      component: components.mycurrency,
      meta: {
        auth: true,
        JumpToLogin:true
      }
    }
  ]
  // scrollBehavior (to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // }
})
