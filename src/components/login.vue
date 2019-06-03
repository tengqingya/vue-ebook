/**
*
* @author tengqingya
* @create 2017-06-2017/6/6 16:48
*/
<template>
  <div>
    <input placeholder="name" v-model="name"/>
    <input placeholder="password" type="password" v-model="pwd"/>
    <input type="submit" @click="submit"/>
  </div>
</template>

<script>
  import {getTockenAndSetLocalStorage} from '../axios/axios'

  import {getLocalStorageString} from '../localStorage/localStorage'
  export default {
    name: "",
    data() {
      return {
        name: "",
        pwd: ""
      }
    },
    props: {},
    components: {},
    methods: {
      submit(){
        getTockenAndSetLocalStorage(this.name,this.pwd,this).catch(e=>{
            console.log(e)
          alert("帐号密码错误，请重试")
        })
      }
    },
    created: function () {
        this.name = getLocalStorageString("t_userName")
        this.pwd = getLocalStorageString("t_password")
    },
    watch: {}
  }
</script>

<style scoped>
</style>
