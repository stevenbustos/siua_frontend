<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Clausulas</li>
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
              <a class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" href="/clausulas/crear">
                <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                Nueva Clausula
              </a>
            </div>
            <div class="col-auto">
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Buscar usuario" aria-label="Buscar usuario" aria-describedby="Buscar usuario">
                <div class="input-group-append">
                  <button type="button" class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;">
                    <font-awesome-icon icon="search" size="lg"></font-awesome-icon>
                    Buscar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>&nbsp;</div>
          <div class="row">
            <div class="col">
              <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                <thead style="background-color: #003e1e; color:white;">
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="clickable-row" v-for='(clause, index) in clauses' :key='index'>
                    <td><a v-bind:href="clause.url">{{clause.name}}</a></td>
                    <td>{{clause.description}}</td>
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
      clauses : []
    }
  },
  mounted () {
    axios
    .get(API_IP+'/clause')
    .then(response => {
      for(var k in response.data.data) {
        var clause = {}
        clause["name"] = response.data.data[k].nombre
        clause["description"] = response.data.data[k].descripcion
        clause["url"] = "/clausulas/"+response.data.data[k]._id;
        this.clauses.push(clause);
      }
    })
  }
}
</script>
