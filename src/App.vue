<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/template/Header.vue'
import {axios} from './helpers/axios';
import store from './store.js'
import router from './router'
const Swal = require('sweetalert2')


export default {
  components: {
    Header
  },
  created: function () {
    axios.interceptors.response.use(function (response) {
      if (response.data.valid == -1 && store.getters.isLoggedIn) {
        let logo = new Promise((resolve,reject)=>{
          store.dispatch('logout')
          resolve()
        })
        logo.then(()=>{
          Swal({
            title: 'Error',
            html: 'Ha caducado la sesión',
            type: 'error',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            Swal({
              title: 'Redireccionando al login',
              type: 'success'
            }).then((result) => {
              if (result.value) {
                router.push({ name: 'login' });
              }
            });
          });
        })
      }
      return response;
    }, function (error) {
      return Promise.reject(error);
    });
  }
}
</script>

<style>
#app {
  background-image: url("/assets/images/fondo.jpg");
  background-size: 100%;
  /* Full height */
  height: 100%;
  /* width: 100%; */
  /* Center and scale the image nicely */
  /* background-position: center; */
  background-repeat: no-repeat;
  background-size: cover;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
</style>
