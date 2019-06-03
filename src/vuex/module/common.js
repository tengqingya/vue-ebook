import {setLocalStorage,getLocalStorageString} from '../../localStorage/localStorage'

export const common={
  state: {
    test:"user click public",
    searchHistory:[],
    chartParam:{},
    chartDetailParam:{},
    categorydetail:{}, //分类详情页默认查询参数
    wish_books:[]
  },
  mutations: {
    click2(state){
      state.test = "user click chenge publick"
    },
    addSearchHistory(state,data){
      state.searchHistory = data
    },
    addChartParam(state,data){
      state.chartParam = data
    },
    addChartDetailParam(state,data){
      state.chartDetailParam = data
    },
    addcategorydetail(state,data){
      state.categorydetail = data
    },
    addwishbooks(state,data){
      if(state.wish_books.length === 0){
        let local_wish_books = getLocalStorageString("wish_books")
        local_wish_books && state.wish_books.push(...local_wish_books.split(",").map(e=>parseInt(e)))
      }
      state.wish_books.push(data)
      setLocalStorage("wish_books",state.wish_books)
    }
  },
  actions: {
    click2:({commit })=>{
      commit ('click2')
    },
    addSearchHistory:({commit},data)=>{
      commit ('addSearchHistory',data)
    },
    addChartParam:({commit},data)=>{
      commit ('addChartParam',data)
    },
    addChartDetailParam:({commit},data)=>{
      commit ('addChartDetailParam',data)
    },
    addcategorydetail:({commit},data)=>{
      commit ('addcategorydetail',data)
    },
    addwishbooks:({commit},data)=>{
      commit ('addwishbooks',data)
    }
  },
  getters: {
    userClick2:state=>state.test,
    searchHistory:state=>state.searchHistory,
    chartParam:state=>state.chartParam,
    chartDetailParam:state=>state.chartDetailParam,
    categorydetail:state=>state.categorydetail,
    wish_books:state=>state.wish_books
  }
}
