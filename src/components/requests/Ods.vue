<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/">Solicitudes</a></li>
            <li class="breadcrumb-item active" aria-current="page">ODS</li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-md-8 offset-md-2" style="margin-bottom:80px;">
          <div class="row">
            <div class="col">
              <button onclick="window.history.back();" class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;">
                <font-awesome-icon icon="arrow-left" size="lg"></font-awesome-icon>
              </button>
            </div>
          </div>
          <div>&nbsp;</div>
          <div class="row">
            <div class="col-auto mr-auto">
              <h2 style="color:#003e1e">
                ODS
              </h2>
            </div>
            <div class="col-auto">
              <button type="button" class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" @click="create()">
                <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                Crear
              </button>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col">
              <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                <thead style="background-color: #003e1e; color:white;">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Tipo de solicitud</th>
                    <th scope="col">Numero</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for='(request, index) in requests' :key='index'>
                    <td>{{request.id}}</td>
                    <td>{{request.type}}</td>
                    <td>{{request.number}}</td>
                    <td>{{request.value}}</td>
                    <td>{{request.state}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div class="row">
            <div class="col-auto mr-auto">
              <h2 style="color:#003e1e">
                Otros si
              </h2>
            </div>
            <div class="col-auto">
              <a class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" href="#/ods/crear/1">
                <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                Crear
              </a>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col">
              <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                <thead style="background-color: #003e1e; color:white;">
                  <tr>
                    <th scope="col">Numero</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for='(order, index) in orders' :key='index'>
                    <td>{{order.number}}</td>
                    <td>{{order.name}}</td>
                    <td>{{order.value}}</td>
                    <td>{{order.state}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> -->
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
      requests: []
    }
  },
  mounted () {
    axios
    .get(API_IP+'/request')
    .then(response => {
      for(var k in response.data.data){
        if (response.data.data[k].tipo_solicitud.nombre === "ODS") {
          var request = {}
          request["id"] = response.data.data[k]._id
          request["number"] = response.data.data[k].numero_solicitud
          request["type"] = response.data.data[k].tipo_solicitud.nombre
          request["value"] = response.data.data[k].valor_solicitud
          request["state"] = response.data.data[k].estado
          request["url"] = "/ods/"+response.data.data[k]._id;
          this.requests.push(request);
        }
      }
    })
  },
  methods: {
    create(){
      this.$router.push({ name: 'createrequest'});
    }
  }
}
</script>
