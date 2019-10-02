<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Usuarios</li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-md-8 offset-md-2" style="margin-bottom:80px;">
          <div class="row">
            <div class="col">
              <a class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" href="/">
                <font-awesome-icon icon="arrow-left" size="lg"></font-awesome-icon>
              </a>
            </div>
          </div>
          <div>&nbsp;</div>
          <div class="row">
            <div class="col-auto mr-auto">
              <a class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" href="/usuarios/crear">
                <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                Nuevo Usuario
              </a>
            </div>
            <!-- TODO -->
            <!-- <div class="col-auto">
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Buscar usuario" aria-label="Buscar usuario" aria-describedby="Buscar usuario">
                <div class="input-group-append">
                  <button type="button" class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;">
                    <font-awesome-icon icon="search" size="lg"></font-awesome-icon>
                    Buscar
                  </button>
                </div>
              </div>
            </div> -->
          </div>
          <div>&nbsp;</div>
          <div class="row">
            <div class="col">
              <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                <thead style="background-color: #003e1e; color:white;">
                  <tr>
                    <th scope="col">Usuario</th>
                    <th scope="col">Nombres</th>
                    <th scope="col">Apellidos</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Fecha inicio contrato</th>
                    <th scope="col">Fecha final contrato</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="clickable-row" v-for='(user, index) in users' :key='index'>
                    <td><a v-bind:href="user.url">{{user.username}}</a></td>
                    <td>{{user.name}}</td>
                    <td>{{user.lastname}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.startDate}}</td>
                    <td>{{user.endDate}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {axios} from '../../helpers/axios'
var API_IP = process.env.VUE_APP_API_IP

export default {
  data () {
    return {
      users : []
    }
  },
  mounted () {
    axios
    .get(API_IP+'/user')
    .then(response => {
      for(var k in response.data.data) {
        var user = {}
        user["username"] = response.data.data[k].nombre_usuario;
        user["name"] = response.data.data[k].persona.primer_nombre+" "+response.data.data[k].persona.segundo_nombre;
        user["lastname"] = response.data.data[k].persona.primer_apellido+" "+response.data.data[k].persona.segundo_apellido;
        user["email"] = response.data.data[k].persona.correo_electronico;
        user["startDate"] = response.data.data[k].fecha_inicio_contrato.substring(0,10);
        user["endDate"] = response.data.data[k].fecha_fin_contrato.substring(0,10);
        user["id"] = response.data.data[k]._id;
        user["url"] = "/usuarios/"+response.data.data[k]._id;
        this.users.push(user);
      }
    })
  }
}
</script>
<style>
.breadcrumb {
  background-color: initial!important;
}
</style>
