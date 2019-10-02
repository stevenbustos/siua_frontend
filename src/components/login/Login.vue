<template>
  <div class="container">
    <!-- Imagen del logo -->
    <div class="row justify-content-md-center" style="margin-top:50px; margin-bottom: 50px;">
      <img src="@/assets/images/logo.png" style="width:20%; height:20%;" alt="Logo de SIUA">
    </div>
    <!-- Formulario del login -->
    <div class="row justify-content-md-center" style="margin-bottom: 80px;">
      <div class="card" style="background-color:rgba(255, 255, 255, 0.7);width:400px;">
        <form style="margin:40px;"  v-on:submit.prevent="login">
          <div class="form-group">
            <label for="userInput">Usuario: </label>
            <div class="input-group mb-3">
              <input v-model="user" type="text" class="form-control" id="userInput" aria-describedby="Usuario del SIA">
              <div class="input-group-append">
                <span class="input-group-text" id="unalDomain">@unal.edu.co</span>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="passwordInput">Contraseña: </label>
            <input v-model="password" type="password" class="form-control" id="passwordInput">
          </div>
          <div class="row justify-content-md-center">
            <button type="submit" class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;">Entrar</button>
          </div>
        </form>
        <div class="card-body" style="background-color: white;">
          <p class="card-text" style="text-align:center;">
            ¿Olvido su contraseña? <br>
            Comuniquese con la unidad administrativa <br>
            <a href="mailto:unidadm_fibog@unal.edu.co">unidadm_fibog@unal.edu.co</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var headersDic = {};
headersDic[process.env.VUE_APP_KEY_HEADER_NAME] = process.env.VUE_APP_KEY_HEADER_CONTENT;
headersDic[process.env.VUE_APP_USER_HEADER_NAME] = "";
headersDic[process.env.VUE_APP_PASS_HEADER_NAME] = "";
headersDic[process.env.VUE_APP_MODULE_HEADER_NAME] = "auth";

export default{

  data() {
    return {
      info: null,
      user:"",
      password:""
    }
  },
  mounted () {
  },
  methods: {
    login: function(){
      let user = this.user
      let password = this.password

      this.$store.dispatch('login', {user, password})
      .then(response => {
        console.log(response);
        if (response.data.data == true) {
          this.$swal({
            title: 'Exito!',
            text: 'Ingreso exitoso.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            console.log(result);
            this.$router.push('/home')
            location.reload();
          });
        }
      })
      .catch(err => {
        console.log(err)
        this.$swal({
          title: 'Error!',
          text: 'Usuario o contraseña incorrectos',
          type: 'error',
          confirmButtonText: 'Cerrar'
        });
      })
    }
  }
}

// headersDic[process.env.VUE_APP_USER_HEADER_NAME] = this.user
// // headersDic[process.env.VUE_APP_PASS_HEADER_NAME] = sha512(this.password)
// headersDic[process.env.VUE_APP_PASS_HEADER_NAME] = this.passwor

// axios
// .get(API_IP,{headers:headersDic})
// .then(response => {
//   if (response.data.data == true) {
//     this.$swal({
//       title: 'Exito!',
//       text: 'Ingreso exitoso.',
//       type: 'success',
//       confirmButtonText: 'Aceptar'
//     }).then((result) => {
//        // this.$session.set(process.env.VUE_APP_TOKEN_HEADER_NAME,response.headers[process.env.VUE_APP_TOKEN_HEADER_NAME])
//        localStorage.setItem(process.env.VUE_APP_TOKEN_HEADER_NAME,response.headers[process.env.VUE_APP_TOKEN_HEADER_NAME])
//     });
//   }
//   else {
//     this.$swal({
//       title: 'Error!',
//       text: 'Usuario o contraseña incorrectos',
//       type: 'error',
//       confirmButtonText: 'Cerrar'
//     });
//   }
// })
</script>
