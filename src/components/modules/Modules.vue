<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Módulos</li>
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
              <a class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" href="/modulos/crear">
                <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                Nuevo módulo
              </a>
            </div>
          </div>
          <div>&nbsp;</div>
          <div class="row">
            <div class="col">
              <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                <thead style="background-color: #003e1e; color:white;">
                  <tr>
                    <th scope="col">Módulo</th>
                    <th scope="col">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for='(module, index) in modules' :key='index'>
                    <td><a v-bind:href="module.url">{{module.name}}</a></td>
                    <td>{{module.state}}</td>
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
      modules: []
    }
  },
  mounted () {
    axios
    .get(API_IP+'/permit')
    .then(response=>{
      var permits_name={}
      for(var k in response.data.data) {
        permits_name[response.data.data[k]._id]=response.data.data[k].nombre
      }
      axios
      .get(API_IP+'/module')
      .then(response => {
        for(var k in response.data.data) {
          var module = {}
          var permits = ""
          module["name"] = response.data.data[k].nombre;
          module["description"] = response.data.data[k].descripcion;
          module["state"] = response.data.data[k].activo;
          module["code"] = response.data.data[k].codigo;
          for (var j in response.data.data[k].permisos){
            var idper=response.data.data[k].permisos[j]._id;
            permits += permits_name[idper]+" "
          }
          module["permits"] = permits;
          (response.data.data[k].activo)? module["state"] = "Activo" : module["state"] ="Inactivo";
          module["url"] ="/modulos/"+response.data.data[k]._id;
          this.modules.push(module);
        }
      })
    })
  }
}
</script>
