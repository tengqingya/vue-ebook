/**
 * Created by tengqingya on 2017/6/6.
 */
const localStorage = window.localStorage

const getLocalStorage = function (item) {
  return JSON.parse(localStorage.getItem(item))
}

const getLocalStorageString = function (item) {
  return localStorage.getItem(item)
}

const setLocalStorage = function (key,value) {
  localStorage.setItem(key, value)
}

/**
 * 根据localstorage和vuex检查是否登录
 * 主要用来显示用户名
 * 和
 * 如果没登录，则直接跳转
 * @param vue
 * @returns {undefined}
 */
const checkLogin = function (vue) {
  let info = getLocalStorage("user_info")
  if (info) {
    vue.$store.dispatch("login", info)
    return info
  }
  info = vue.$store.state.user.info
  if(info.access_token){
    setLocalStorage("user_info",JSON.stringify(info))
    return info
  }
  return undefined
}

/**
 * 检查是否登录并且验证localstorage和vuex中的token有效性
 * @param vue
 * @returns {undefined}
 */
const checkLoginAndValidateToken = function (vue,{ajaxFunction}) {
  if(checkLogin(vue)){
    //vuex或者localstorage有登录信息
    return ajaxFunction
  }else{
    return undefined
  }
}

export {
  getLocalStorage,
  setLocalStorage,
  checkLogin,
  getLocalStorageString,
  checkLoginAndValidateToken
}
