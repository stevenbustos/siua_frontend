<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Dependencias</li>
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
              <a class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" href="/dependencias/crear">
                <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                Nueva dependencia
              </a>
            </div>
          </div>
          <div>&nbsp;</div>
          <div class="row">
            <div class="col">
              <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                <thead style="background-color: #003e1e; color:white;">
                  <tr>
                    <th scope="col">Dependencia</th>
                    <th scope="col">Director</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for='(dependency, index) in dependencies' :key='index'>
                    <td><a v-bind:href="dependency.url">{{dependency.name}}</a></td>
                    <td>{{dependency.director}}</td>
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
      dependencies: []
    }
  },
  mounted () {
    axios
    .get(API_IP+"/dependence/")
    .then(response => {
      console.log(response);
      for(var k in response.data.data) {
        var dependence = {}
        dependence["name"] = response.data.data[k].nombre;

        if (response.data.data[k].director !== undefined && response.data.data[k].director !== null) {
          dependence["director"] = response.data.data[k].director.primer_nombre +" "+response.data.data[k].director.segundo_nombre ;
        }else {
           dependence["director"] = "Sin asignar"
        }
        dependence["url"] = "/dependencias/"+response.data.data[k]._id;
        this.dependencies.push(dependence);
      }
    })
  }
}
</script>
