<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/presupuestos">Presupuestos</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{budget_name}}</li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-md-8 offset-md-2" style="margin-bottom:80px;">
          <div class="row">
            <div class="col">
              <a class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" href="/presupuestos">
                <font-awesome-icon icon="arrow-left" size="lg"></font-awesome-icon>
              </a>
            </div>
          </div>
          <div>&nbsp;</div>
          <div class="row">
            <div class="col-md-auto">
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
                  <tr>
                    <td>{{budget_name}}</td>
                    <td>{{budget_dependency}}</td>
                    <td>{{budget_resolution_number}}</td>
                    <td>{{budget_resolution_date}}</td>
                    <td>{{budget_quipu}}</td>
                    <td>{{budget_value}}</td>
                    <td>{{budget_year}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-lg-2">
              <div class="row justify-content-end">
                <div class="col-2">
                  <a class="btn btn-primary" v-bind:href="budget_update_url" style="background:#003e1e;border-color:#003e1e;">
                    <font-awesome-icon icon="save" size="lg"></font-awesome-icon>
                    Editar
                  </a>
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
                    <th scope="col">Rubro</th>
                    <th scope="col">Valor Asignado</th>
                    <th scope="col">Egreso</th>
                    <th scope="col">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for='(entry, index) in entries' :key='index'>
                    <td>{{entry.name}}</td>
                    <td>{{entry.value}}</td>
                    <td>{{entry.egress}}</td>
                    <td>{{entry.balance}}</td>
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
      budget_name: "",
      budget_dependency: "",
      budget_resolution_number: "",
      budget_resolution_date: "",
      budget_quipu: "",
      budget_year: "",
      budget_value: "",
      entries: [],
      budget_update_url: ""
    }
  },
  mounted () {
    axios
    .get(API_IP+'/budget/'+this.$route.params.id)
    .then(response => {
      this.budget_id = response.data.data._id
      this.budget_name = response.data.data.nombre
      this.budget_dependency = response.data.data.dependencia.nombre
      this.budget_resolution_number = response.data.data.dependencia.resolucion_numero
      this.budget_resolution_date = response.data.data.dependencia.resolucion_fecha.substring(0,10);
      this.budget_quipu = response.data.data.dependencia.quipu_codigo;
      this.budget_year = response.data.data.año
      this.budget_value = response.data.data.valor
      this.budget_update_url = "/presupuestos/"+response.data.data._id+"/actualizar"

      for (var k in response.data.data.rubros) {
        var entry = {}
        entry["name"] = response.data.data.rubros[k].rubro.nombre;
        entry["value"] = response.data.data.rubros[k].valor;
        entry["egress"] = response.data.data.rubros[k].egreso;
        entry["balance"] = response.data.data.rubros[k].saldo;
        this.entries.push(entry);
      }
    })
  }
}
</script>
