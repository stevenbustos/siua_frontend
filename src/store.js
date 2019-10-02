import Vue from 'vue'
import Vuex from 'vuex'
import {axios,verifyPermits} from './helpers/axios';

var API_IP = process.env.VUE_APP_API_IP
var headersDic = {};
headersDic[process.env.VUE_APP_KEY_HEADER_NAME] = process.env.VUE_APP_KEY_HEADER_CONTENT;
headersDic[process.env.VUE_APP_USER_HEADER_NAME] = "";
headersDic[process.env.VUE_APP_PASS_HEADER_NAME] = "";
headersDic[process.env.VUE_APP_MODULE_HEADER_NAME] = "auth";

Vue.use(Vuex)

var token_name = process.env.VUE_APP_TOKEN_HEADER_NAME


export default new Vuex.Store({
  state: {
    menu : {
      0:'',
      1:'',
      2:'',
      3:'',
      4:'',
      5:'',
      6:'',
      7:'',
      8:'',
      9:'',
      10:'',
      11:'',
      12:'',
      13:'',
      14:'',
    },
    status: '',
    token: localStorage.getItem(token_name) || '',
  },
  mutations: {
    auth_request(state){
      console.log("loading");
      state.status = 'loading'
    },
    auth_success(state, token){
      console.log("COMPLETE");
      state.status = 'success'
      state.token = token
    },
    auth_error(state){
      console.log("FAIL");
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
    update_token(state, newToken){
      state.token = newToken
    },
    update_menu(state,menu){
      state.menu =  menu
    }
  },
  actions: {
    updateToken({commit},newToken){
      localStorage.setItem(token_name, newToken)
      commit('update_token',newToken)
    },
    async showMenu({commit}){
      let params=[100,101,102,103,104,105,106,107,108,109,110,111,112,113,114];
      let result = await verifyPermits(100,params)
      console.log(result);
      let menuTmp={}
      if(typeof result === 'object'){
          for(var k in result){
            menuTmp[k] = result[k]
          }
          commit('update_menu', menuTmp)
        }
    },
    login({commit}, user){
      headersDic[process.env.VUE_APP_USER_HEADER_NAME] = user.user;
      headersDic[process.env.VUE_APP_PASS_HEADER_NAME] = user.password;

      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios
        .get(API_IP,{headers:headersDic})
        .then(response=>{
          if(response.data.data !== false){
            const token = response.headers[token_name]
            localStorage.setItem(token_name, token)
            commit('auth_success', token)
            resolve(response)
          }
          else {
            commit('auth_error')
            localStorage.removeItem(token_name)
            reject(response)
          }
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem(token_name)
          reject(err)
        })
      })
    },
    logout({commit}){
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem(token_name)
        resolve()
      })
    }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    menuPermits: state => state.menu,
  }
})
