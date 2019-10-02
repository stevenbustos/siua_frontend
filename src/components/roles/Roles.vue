<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Roles</li>
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
              <a class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" href="/roles/crear">
                <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                Nuevo rol
              </a>
            </div>
          </div>
          <div>&nbsp;</div>
          <div class="row">
            <div class="col">
              <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                <thead style="background-color: #003e1e; color:white;">
                  <tr>
                    <th scope="col">Rol</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for='(rol, index) in roles' :key='index'>
                    <td><a v-bind:href="rol.url">{{rol.rol}}</a></td>
                    <td>{{rol.description}}</td>
                    <td>{{rol.state}}</td>
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
import {axios} from '../../helpers/axios';
var API_IP = process.env.VUE_APP_API_IP

export default {
  data () {
    return {
      roles: []
    }
  },
  mounted () {
    axios
    .get(API_IP+'/rol')
    .then(response => {
      for(var k in response.data.data) {
        var rol = {}
        rol["rol"] = response.data.data[k].nombre;
        rol["description"] = response.data.data[k].descripcion;
        (response.data.data[k].activo)? rol["state"] = "Activo" : rol["state"] ="Inactivo";
        rol["url"] ="/roles/"+response.data.data[k]._id;
        this.roles.push(rol);
      }
    })
  }
}
</script>
