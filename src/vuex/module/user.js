export const user={
  state: {
    test:"user click",
    info:{}
  },
  mutations: {
    click(state){
      state.test = "user click chenge"
    },
    login(state,info){
      state.info = info
    }
  },
  actions: {
    click:({commit })=>{
      commit ('click')
    },
    login:({commit },info)=>{
      commit ('login',info)
    }
  },
  getters: {
    userClick:state=>state.test,
    loginInfo:state=>state.info
  }
}
