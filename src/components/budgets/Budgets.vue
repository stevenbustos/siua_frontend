<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Presupuestos</li>
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
              <a class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" href="/presupuestos/crear">
                <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                Nuevo presupuesto
              </a>
            </div>
          </div>
          <div>&nbsp;</div>
          <div class="row">
            <div class="col">
              <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                <thead style="background-color: #003e1e; color:white;">
                  <tr>
                    <th scope="col">Presupuesto</th>
                    <th scope="col">Dependencia</th>
                    <th scope="col">Número de resolución</th>
                    <th scope="col">Fecha de resolución</th>
                    <th scope="col">Numero Quipu</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Año</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for='(budget, index) in budgets' :key='index'>
                    <td><a v-bind:href="budget.url">{{budget.name}}</a></td>
                    <td>{{budget.dependency}}</td>
                    <td>{{budget.resolutionNumber}}</td>
                    <td>{{budget.resolutionDate}}</td>
                    <td>{{budget.quipu}}</td>
                    <td>{{budget.value}}</td>
                    <td>{{budget.year}}</td>
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
      budgets: []
    }
  },
  mounted () {
    axios
    .get(API_IP+'/budget')
    .then(response => {
      for(var k in response.data.data) {
        var budget = {}
        budget["url"] = "/presupuestos/"+response.data.data[k]._id;
        budget["name"] = response.data.data[k].nombre;
        budget["dependency"] = response.data.data[k].dependencia.nombre;
        budget["resolutionNumber"] = response.data.data[k].dependencia.resolucion_numero;
        budget["resolutionDate"] = response.data.data[k].dependencia.resolucion_fecha.substring(0,10);
        budget["quipu"] = response.data.data[k].dependencia.quipu_codigo;
        budget["value"] = response.data.data[k].valor;
        budget["year"] = response.data.data[k].año;

        this.budgets.push(budget);
      }
    })
  }
}
</script>
