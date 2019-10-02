import ax from 'axios';
import store from '../store.js'

var API_IP = process.env.VUE_APP_API_IP

export const axios = ax.create();

export function singlePermits(module, permit){
  let headersDicHelper= {};
  headersDicHelper[process.env.VUE_APP_KEY_HEADER_NAME] = process.env.VUE_APP_KEY_HEADER_CONTENT;
  headersDicHelper[process.env.VUE_APP_TOKEN_HEADER_NAME] = localStorage.getItem(process.env.VUE_APP_TOKEN_HEADER_NAME);
  headersDicHelper[process.env.VUE_APP_MODULE_HEADER_NAME] = module;
  headersDicHelper[process.env.VUE_APP_PERMIT_HEADER_NAME] = permit;

  return new Promise((resolve, reject) => {
    axios
    .get(API_IP, {headers:headersDicHelper})
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      reject(error)
    })
  })
}

export function viewIdPermits(module, permit, id){
  let headersDicHelper= {};
  headersDicHelper[process.env.VUE_APP_KEY_HEADER_NAME] = process.env.VUE_APP_KEY_HEADER_CONTENT;
  headersDicHelper[process.env.VUE_APP_TOKEN_HEADER_NAME] = localStorage.getItem(process.env.VUE_APP_TOKEN_HEADER_NAME);
  headersDicHelper[process.env.VUE_APP_MODULE_HEADER_NAME] = module;
  headersDicHelper[process.env.VUE_APP_PERMIT_HEADER_NAME] = permit;

  return new Promise((resolve, reject) => {
    axios
    .get(API_IP+"/"+id, {headers:headersDicHelper})
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      reject(error)
    })
  })
}

export function verifyPermits(module,paramsPermits){
  var result;
  let headersDicHelper= {};
  headersDicHelper[process.env.VUE_APP_KEY_HEADER_NAME] = process.env.VUE_APP_KEY_HEADER_CONTENT;
  headersDicHelper[process.env.VUE_APP_TOKEN_HEADER_NAME] = localStorage.getItem(process.env.VUE_APP_TOKEN_HEADER_NAME);
  headersDicHelper[process.env.VUE_APP_MODULE_HEADER_NAME] = module;

  return  new Promise((resolve,reject) =>{
    axios
    .get(API_IP,{headers:headersDicHelper , params: {permits :paramsPermits}})
    .then(response => {
      // console.log("A");
      // console.log(headersDicHelper[process.env.VUE_APP_TOKEN_HEADER_NAME]);
      // console.log(response.headers[process.env.VUE_APP_TOKEN_HEADER_NAME]);
      result=response
      // store.dispatch('updateToken',response.headers[process.env.VUE_APP_TOKEN_HEADER_NAME])
      // console.log(response.headers[process.env.VUE_APP_TOKEN_HEADER_NAME]);
      resolve(response.data)
    })
    .catch(error =>{
      result = error
      reject(error)
    })
  })
}

export function requestModulePermit(module, permit, paramsRequest){
  let headersDicHelper= {};
  headersDicHelper[process.env.VUE_APP_KEY_HEADER_NAME] = process.env.VUE_APP_KEY_HEADER_CONTENT;
  headersDicHelper[process.env.VUE_APP_TOKEN_HEADER_NAME] = localStorage.getItem(process.env.VUE_APP_TOKEN_HEADER_NAME);
  headersDicHelper[process.env.VUE_APP_MODULE_HEADER_NAME] = module;
  headersDicHelper[process.env.VUE_APP_PERMIT_HEADER_NAME] = permit;

  return  new Promise((resolve,reject) =>{
    axios
    .get(API_IP,{headers:headersDicHelper , params: paramsRequest})
    .then(response => {
      // console.log("B");
      // store.dispatch('updateToken',response.headers[process.env.VUE_APP_TOKEN_HEADER_NAME])
      // console.log(response);
      resolve(response.data.data)
    })
    .catch(error =>{
      reject(error)
    })
  })
}

export function requestIdModulePermit(module, permit, id){
  let headersDicHelper= {};
  headersDicHelper[process.env.VUE_APP_KEY_HEADER_NAME] = process.env.VUE_APP_KEY_HEADER_CONTENT;
  headersDicHelper[process.env.VUE_APP_TOKEN_HEADER_NAME] = localStorage.getItem(process.env.VUE_APP_TOKEN_HEADER_NAME);
  headersDicHelper[process.env.VUE_APP_MODULE_HEADER_NAME] = module;
  headersDicHelper[process.env.VUE_APP_PERMIT_HEADER_NAME] = permit;

  return  new Promise((resolve,reject) =>{
    axios
    .get(API_IP+'/'+id,{headers:headersDicHelper})
    .then(response => {
      // console.log("B");
      // store.dispatch('updateToken',response.headers[process.env.VUE_APP_TOKEN_HEADER_NAME])
      console.log(response);
      resolve(response.data.data)
    })
    .catch(error =>{
      reject(error)
    })
  })
}


export function postModulePermit(module, permit , data){
  let headersDicHelper= {};
  headersDicHelper[process.env.VUE_APP_KEY_HEADER_NAME] = process.env.VUE_APP_KEY_HEADER_CONTENT;
  headersDicHelper[process.env.VUE_APP_TOKEN_HEADER_NAME] = localStorage.getItem(process.env.VUE_APP_TOKEN_HEADER_NAME);
  headersDicHelper[process.env.VUE_APP_MODULE_HEADER_NAME] = module;
  headersDicHelper[process.env.VUE_APP_PERMIT_HEADER_NAME] = permit;

  return  new Promise((resolve,reject) =>{
    axios
    .post(API_IP,data,{headers:headersDicHelper})
    .then(response => {
      // console.log(response.data);
      resolve(response.data)
    })
    .catch(error =>{
      reject(error)
    })
  })
}


export function putModulePermit(module, permit,id, data){
  let headersDicHelper= {};
  headersDicHelper[process.env.VUE_APP_KEY_HEADER_NAME] = process.env.VUE_APP_KEY_HEADER_CONTENT;
  headersDicHelper[process.env.VUE_APP_TOKEN_HEADER_NAME] = localStorage.getItem(process.env.VUE_APP_TOKEN_HEADER_NAME);
  headersDicHelper[process.env.VUE_APP_MODULE_HEADER_NAME] = module;
  headersDicHelper[process.env.VUE_APP_PERMIT_HEADER_NAME] = permit;

  return  new Promise((resolve,reject) =>{
    axios
    .put(API_IP+'/'+id,data,{headers:headersDicHelper})
    .then(response => {
      // console.log(response.data);
      resolve(response.data)
    })
    .catch(error =>{
      reject(error)
    })
  })
}
