<template>
  <div>
    <div class="row">
      <div class="col-md-8 offset-md-2" style="margin-bottom:80px;">
        <div class="row">
          <div class="col">
            <button class="btn btn-primary" type="button" @click="previous()" style="background:#003e1e;border-color:#003e1e;">
              <font-awesome-icon icon="arrow-left" size="lg"></font-awesome-icon>
            </button>
          </div>
        </div>
        <div>&nbsp;</div>
        <div class="row justify-content-center">
          <div class="col-10 align-self-center">
            <form v-on:submit.prevent="saveContinue" novalidate>
              <div class="row">
                <div class="col">
                  <div class="form-group" :class="{ 'form-group--error': $v.request_value.$error }">
                    <label for="number">Valor de la solicitud:</label>
                    <div class="input-group mb-3">
                      <input v-model.trim="$v.request_value.$model" type="number" min="0.01" step="0.01" class="form-control"  aria-describedby="number" placeholder="Valor de solicitud" @input="changeValueRequest">
                      <div class="input-group-append">
                        <span class="input-group-text">$</span>
                      </div>
                      <div class="alert alert-danger" role="alert" v-if="$v.request_value.$dirty && !$v.request_value.required">Es requerido el valor de la solicitud</div>
                    </div>
                  </div>
                  <p>
                    ¿Esta orden se hara con recursos compartidos?
                  </p>
                  <div class="form-group" :class="{ 'form-group--error': $v.shared_resources.$error }">
                    <div class="row">
                      <div class="col">
                        <multiselect v-on:input="clearArray" v-model.trim="$v.shared_resources.$model" :options="shared_options" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Seleccione un tipo de pago">
                        </multiselect>
                      </div>
                      <div class="col">
                        <div class="alert alert-danger" role="alert" v-if="$v.shared_resources.$dirty && !$v.shared_resources.required">Es requerido el valor de la solicitud</div>
                      </div>
                    </div>
                  </div>
                  <!-- Recursos compartidos: Si -->
                  <div v-if="shared_resources === 'Si' ">
                    <hr>
                    <h4>
                      Seleccione los rubros que va a afectar
                    </h4>
                    <br>
                    <h5>
                      Dependencia principal
                    </h5>
                    <br>
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label for="budget">Presupuestos de la dependencia:</label>
                          <multiselect v-model="newBudget.presupuesto" :options="allbudgets" track-by="_id" label="name" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Seleccione un prespuesto" @input="newBudget.rubros=[]">
                          </multiselect>
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group" v-if="newBudget.presupuesto.activeRub">
                          <label for="budget">Rubros de {{newBudget.presupuesto.name}}:</label>
                          <multiselect v-model="newBudget.rubros" :options="newBudget.presupuesto.optionBudget" track-by="_id" label="nombre" :searchable="false" :multiple="false" :close-on-select="true" :show-labels="true" placeholder="Seleccione rubros" >
                          </multiselect>
                        </div>
                      </div>
                    </div>
                    <div class="row" v-if="newBudget.rubros.length !== 0">
                      <div class="col">
                        <div class="row">
                          <div class="col">
                            <label for="number">Valor a descontar:</label>
                            <div class="input-group mb-3">
                              <input v-model="newBudget.rubros.value" type="number" class="form-control" aria-describedby="number" placeholder="Valor">
                              <div class="input-group-append">
                                <span class="input-group-text">$</span>
                              </div>
                              <div class="alert alert-danger" role="alert" v-if="no_value">Es requerido el valor a descontar</div>
                            </div>
                          </div>
                          <div class="col">
                            <label for="number">Saldo del rubro:</label>
                            <div class="input-group mb-3">
                              <input v-model="newBudget.rubros.saldo" type="number" class="form-control" aria-describedby="number" placeholder="Número" disabled>
                              <div class="input-group-append">
                                <span class="input-group-text">$</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <center>
                          <button type="button" class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" v-on:click="addBudget">
                            Añadir
                          </button>
                        </center>
                      </div>
                    </div>
                    <div>&nbsp;</div>
                    <h5>
                      Dependencia aportante
                    </h5>
                    <br>
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label for="budget">Presupuestos de la dependencia:</label>
                          <multiselect v-model="newBudget2.presupuesto2" :options="allbudgets" track-by="_id" label="name" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Seleccione un prespuesto" @input="newBudget2.rubros2=[]">
                          </multiselect>
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group" v-if="newBudget2.presupuesto2.activeRub">
                          <label for="budget">Rubros de {{newBudget2.presupuesto2.name}}:</label>
                          <multiselect v-model="newBudget2.rubros2" :options="newBudget2.presupuesto2.optionBudget" track-by="_id" label="nombre" :searchable="false" :multiple="false" :close-on-select="true" :show-labels="true" placeholder="Seleccione rubros" >
                          </multiselect>
                        </div>
                      </div>
                    </div>
                    <div class="row" v-if="newBudget2.rubros2.length !== 0">
                      <div class="col">
                        <div class="row">
                          <div class="col">
                            <label for="number">Valor a descontar:</label>
                            <div class="input-group mb-3">
                              <input v-model="newBudget2.rubros2.value" type="number" class="form-control" aria-describedby="number" placeholder="Número">
                              <div class="input-group-append">
                                <span class="input-group-text">$</span>
                              </div>
                              <div class="alert alert-danger" role="alert" v-if="no_value">Es requerido el valor a descontar</div>
                            </div>
                          </div>
                          <div class="col">
                            <label for="number">Saldo del rubro:</label>
                            <div class="input-group mb-3">
                              <input v-model="newBudget2.rubros2.saldo" type="number" class="form-control" aria-describedby="number" placeholder="Número" disabled>
                              <div class="input-group-append">
                                <span class="input-group-text">$</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <center>
                          <button type="button" class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" v-on:click="addBudget2">
                            Añadir
                          </button>
                        </center>
                      </div>
                    </div>
                    <div>&nbsp;</div>
                    <div class="row">
                      <div class="col">
                        <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                          <thead style="background-color: #003e1e; color:white;">
                            <tr>
                              <th scope="col">Presupuesto</th>
                              <th scope="col">Rubro</th>
                              <th scope="col">Valor</th>
                              <th scope="col">Acción</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for='(budget, index) in budget_request' :key='index'>
                              <td>{{budget.presupuesto_name}}</td>
                              <td>{{budget.rubro_name}}</td>
                              <td>{{budget.valor}}$</td>
                              <td>
                                <button type="button" class="btn btn-primary" v-on:click="removeBudget(index,budget)" style="background:#003e1e;border-color:#003e1e;">
                                  <font-awesome-icon icon="trash-alt" size="lg"></font-awesome-icon>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <!-- Recursos compartidos: No -->
                  <div v-if="shared_resources === 'No' ">
                    <hr>
                    <h4>
                      Seleccione los rubros que va a afectar
                    </h4>
                    <br>
                    <h5>
                      Dependencia principal
                    </h5>
                    <br>
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label for="budget">Presupuestos de la dependencia:</label>
                          <multiselect v-model="newBudget.presupuesto" :options="allbudgets" track-by="_id" label="name" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Seleccione un prespuesto" @input="newBudget.rubros=[]">
                          </multiselect>
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group" v-if="newBudget.presupuesto.activeRub">
                          <label for="budget">Rubros de {{newBudget.presupuesto.name}}:</label>
                          <multiselect v-model="newBudget.rubros" :options="newBudget.presupuesto.optionBudget" track-by="_id" label="nombre" :searchable="false" :multiple="false" :close-on-select="true" :show-labels="true" placeholder="Seleccione rubros" >
                          </multiselect>
                        </div>
                      </div>
                    </div>
                    <div class="row" v-if="newBudget.rubros.length !== 0">
                      <div class="col">
                        <div class="row">
                          <div class="col">
                            <label for="number">Valor a descontar:</label>
                            <div class="input-group mb-3">
                              <input v-model="newBudget.rubros.value" type="number" class="form-control" aria-describedby="number" placeholder="Número">
                              <div class="input-group-append">
                                <span class="input-group-text">$</span>
                              </div>
                              <div class="alert alert-danger" role="alert" v-if="no_value">Es requerido el valor a descontar</div>
                            </div>
                          </div>
                          <div class="col">
                            <label for="number">Saldo del rubro:</label>
                            <div class="input-group mb-3">
                              <input v-model="newBudget.rubros.saldo" type="number" class="form-control" aria-describedby="number" placeholder="Número" disabled>
                              <div class="input-group-append">
                                <span class="input-group-text">$</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <center>
                          <button type="button" class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" v-on:click="addBudget">
                            Añadir
                          </button>
                        </center>
                      </div>
                    </div>
                    <div>&nbsp;</div>
                    <hr>
                    <div class="row">
                      <div class="col">
                        <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                          <thead style="background-color: #003e1e; color:white;">
                            <tr>
                              <th scope="col">Presupuesto</th>
                              <th scope="col">Rubro</th>
                              <th scope="col">Valor</th>
                              <th scope="col">Acción</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for='(budget, index) in budget_request' :key='index'>
                              <td>{{budget.presupuesto_name}}</td>
                              <td>{{budget.rubro_name}}</td>
                              <td>{{budget.valor}}$</td>
                              <td>
                                <button type="button" class="btn btn-primary" v-on:click="removeBudget(index,budget)" style="background:#003e1e;border-color:#003e1e;">
                                  <font-awesome-icon icon="trash-alt" size="lg"></font-awesome-icon>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>&nbsp;</div>
              <div class="row justify-content-center">
                <div class="col-8 align-self-center">
                  <div class="row justify-content-center">
                    <div class="col-3 text-center">
                      <button class="btn btn-primary" type="button" @click="cancel()" style="background:#003e1e;border-color:#003e1e;">
                        <font-awesome-icon icon="times-circle" size="lg"></font-awesome-icon>
                        Cancelar
                      </button>
                    </div>
                    <div class="col-3 text-center">
                      <button class="btn btn-primary" type="button" @click="previous()" style="background:#003e1e;border-color:#003e1e;">
                        <font-awesome-icon icon="arrow-left" size="lg"></font-awesome-icon>
                        Anterior
                      </button>
                    </div>
                    <div class="col-3 text-center">
                      <button class="btn btn-primary" :disabled="submitting" type="submit" style="background:#003e1e;border-color:#003e1e;">
                        <font-awesome-icon icon="save" size="lg"></font-awesome-icon>
                        Guardar y continuar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Multiselect from 'vue-multiselect'
import Vuex from 'vuex'
import {axios,requestModulePermit} from '../../../helpers/axios';
import { required } from 'vuelidate/lib/validators'
var API_IP = process.env.VUE_APP_API_IP
const { mapActions, mapState } = Vuex

Vue.use(Vuex)
// const store = new Vuex.Store({
//   state:{
//     allbudgets:[],
//     showrub:false,
//     rubrosOptions:[]
//   },
//   actions: {
//     loadData({ commit }, id_params) {
//       console.log(id_params);
//       axios
//       .get(API_IP+'/budget')
//       .then(response => {
//         var budgets=[]
//         for(var k in response.data.data) {
//           var budget = {}
//           budget["_id"] = response.data.data[k]._id;
//           budget["name"] = response.data.data[k].nombre;
//           budget["rubros"] = response.data.data[k].rubros;
//           budget["optionBudget"]=[]
//           budget["activeRub"]=false
//           for(var j in budget.rubros){
//             var bud={}
//             bud["_id"]=budget.rubros[j].rubro._id;
//             bud["nombre"]=budget.rubros[j].rubro.nombre;
//             bud["saldo"]=budget.rubros[j].saldo;
//             bud["egreso"]=budget.rubros[j].egreso;
//             budget.optionBudget.push(bud)
//           }
//           budget.activeRub=true
//           budgets.push(budget);
//         }
//         commit('loadBudgets',budgets);
//       })
//     },
//     updateShowRub({commit},showrub){
//       commit('toggleRub',showrub)
//     },
//     addOptionRubro({commit},rub){
//       commit('addRub',rub)
//     },
//     removeOptionRubro({commit},bud){
//       commit('removeRub',bud)
//     }
//   },
//   mutations:{
//     loadBudgets(state,budgets){
//       state.allbudgets=budgets;
//     },
//     toggleRub(state){
//       state.showrub=true
//     },
//     addRub(state,rub){
//       var found = state.allbudgets.findIndex(function(element) {
//         return rub.presupuesto == element._id;
//       });
//       state.allbudgets[found].optionBudget.push({"_id":rub._id,"nombre":rub.nombre,"saldo":rub.saldo,"egreso":rub.egreso})
//     },
//     removeRub(state,budget){
//       var found = state.allbudgets.findIndex(function(element) {
//         return budget.presupuesto == element._id;
//       });
//       var indexRub = state.allbudgets[found].optionBudget.findIndex(function(element) {
//         return budget.rubro == element._id;
//       })
//       var tmp = state.allbudgets[found].optionBudget.splice(indexRub,1)
//       console.log(tmp);
//     }
//   }
// })

export default {
  props: ['stp','object'],
  components: {
    Multiselect
  },
  data () {
    return {
      allbudgets:[],
      shared_options: ["Si","No"],
      shared_resources: "",
      no_value: false,
      step: this.stp,
      obj:this.object,
      budget_request: [],
      request_value: '',
      newBudget:{
        presupuesto: '',
        value: '',
        rubros:[],
      },
      newBudget2:{
        presupuesto2: '',
        value2: '',
        rubros2:[],
      },
      submitting: false
    }
  },
  validations: {
    request_value: { required },
    shared_resources: { required }
  },
  mounted(){
    this.loadData()
  },
  methods:{
    async loadData(){
      let budgets;
      let bud = await requestModulePermit(207,0)
      for(var k in bud) {
        var budget = {}
        budget["_id"] = bud[k]._id;
        budget["name"] = bud[k].nombre;
        budget["rubros"] = bud[k].rubros;
        budget["optionBudget"]=[]
        budget["activeRub"]=false
        for(var j in budget.rubros){
          var budTmp={}
          budTmp["_id"]=budget.rubros[j].rubro._id;
          budTmp["nombre"]=budget.rubros[j].rubro.nombre;
          budTmp["saldo"]=budget.rubros[j].saldo;
          budTmp["egreso"]=budget.rubros[j].egreso;
          budget.optionBudget.push(budTmp)
        }
        budget.activeRub=true
        this.allbudgets.push(budget);
      }
    },
    removeBudget(index,budget){
      var rub={}
      rub["presupuesto"]=budget.presupuesto
      rub["_id"]=budget.rubro
      rub["nombre"]=budget.rubro_name
      rub["saldo"]=budget.saldo
      rub["egreso"]=budget.egreso
      this.budget_request.splice(index,1)
      this.addRub(rub)
    },
    addRub(rub){
      var found = this.allbudgets.findIndex(function(element) {
        return rub.presupuesto == element._id;
      });
      this.allbudgets[found].optionBudget.push({"_id":rub._id,"nombre":rub.nombre,"saldo":rub.saldo,"egreso":rub.egreso})
    },
    removeRub(budget){
      var found = this.allbudgets.findIndex(function(element) {
        return budget.presupuesto == element._id;
      });
      var indexRub = this.allbudgets[found].optionBudget.findIndex(function(element) {
        return budget.rubro == element._id;
      })
      var tmp = this.allbudgets[found].optionBudget.splice(indexRub,1)
    },
    // saveContinue(){
    //   this.$v.$touch()
    //   if (this.$v.$invalid) {
    //     this.$swal({
    //       title: 'Error!',
    //       text: 'Debe llenar campos necesarios en el formulario',
    //       type: 'error',
    //       confirmButtonText: 'Cerrar'
    //     });
    //   } else {
    //     this.submitting = true;
    //     axios
    //     .put(API_IP+"/request/"+this.obj._id, {
    //       auditoria:this.obj.auditoria,
    //       clausulas:this.obj.clausulas,
    //       estado:this.obj.estado,
    //       _id:this.obj._id,
    //       numero_solicitud:this.obj.numero_solicitud,
    //       tipo_solicitud:this.obj.tipo_solicitud,
    //       fecha_inicio:this.obj.fecha_inicio,
    //       fecha_final:this.obj.fecha_final,
    //       valor_solicitud:this.request_value,
    //       justificacion:this.obj.justificacion,
    //       justificacion_adicional:this.obj.justificacion_adicional,
    //       objetivo_general:this.obj.objetivo_general,
    //       especificaciones_tecnicas:this.obj.especificaciones_tecnicas,
    //       obligaciones_especificas:this.obligations,
    //       rubros:this.budget_request,
    //       trabajadores:this.obj.trabajadores,
    //       ciudad:this.obj.ciudad
    //     })
    //     .then(response => {
    //       console.log(response);
    //       this.$swal({
    //         title: 'Exito!',
    //         text: 'Se actualizo la solicitud con exito.',
    //         type: 'success',
    //         confirmButtonText: 'Aceptar'
    //       }).then((result) => {
    //         if (result.value) {
    //           this.$emit('saveObject',response.data)
    //           this.submitting = false;
    //           this.step++;
    //           this.$emit('nextStep', this.step);
    //         }
    //       });
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       this.$swal({
    //         title: 'Error!',
    //         text: error.response.data.error.msg,
    //         type: 'error',
    //         confirmButtonText: 'Cerrar'
    //       });
    //       this.submitting = false;
    //     });
    //   }
    // },
    addBudget() {
      if (this.newBudget.rubros.value !== undefined && this.newBudget.rubros.value !== null && !isNaN(this.newBudget.rubros.value)
      && this.newBudget.rubros.value !== "") {
        if(this.newBudget.rubros.value < this.newBudget.rubros.saldo) {
          this.no_value = false
          var budget = {}
          budget["presupuesto"] = this.newBudget.presupuesto._id
          budget["presupuesto_name"] = this.newBudget.presupuesto.name
          budget["rubro"] = this.newBudget.rubros._id
          budget["rubro_name"] = this.newBudget.rubros.nombre
          budget["valor"] = parseInt(this.newBudget.rubros.value)
          budget["egreso"] = parseInt(this.newBudget.rubros.egreso)
          budget["saldo"] = parseInt(this.newBudget.rubros.saldo)
          this.budget_request.push(budget)
          this.removeRub(budget)
          this.newBudget = {
            presupuesto: '',
            rubros: [],
            valor: ''
          }
          this.changeBudgetRequest()
        } else {
          this.$swal({
            title: 'Error!',
            text: 'El valor a descontar no debe ser mayor o igual al saldo del rubro',
            type: 'error',
            confirmButtonText: 'Cerrar'
          });
        }
      } else {
        this.no_value = true
        this.$swal({
          title: 'Error!',
          text: 'Debe llenar campos necesarios en el formulario',
          type: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    },
    addBudget2() {
      if (this.newBudget2.rubros2.value !== undefined && this.newBudget2.rubros2.value !== null && !isNaN(this.newBudget2.rubros2.value)
      && this.newBudget2.rubros2.value !== "") {
        if (this.newBudget2.rubros2.value < this.newBudget2.rubros2.saldo) {
          this.no_value = false
          var budget = {}
          budget["presupuesto"] = this.newBudget2.presupuesto2._id
          budget["presupuesto_name"] = this.newBudget2.presupuesto2.name
          budget["rubro"] = this.newBudget2.rubros2._id
          budget["rubro_name"] = this.newBudget2.rubros2.nombre
          budget["valor"] = parseInt(this.newBudget2.rubros2.value)
          this.budget_request.push(budget)
          this.removeRub(budget)
          this.newBudget2 = {
            presupuesto2: '',
            rubros2: [],
            valor2: ''
          }
          this.changeBudgetRequest()
        } else {
          this.$swal({
            title: 'Error!',
            text: 'El valor a descontar no debe ser mayor o igual al saldo del rubro',
            type: 'error',
            confirmButtonText: 'Cerrar'
          });
        }
      } else {
        this.no_value = true;
        this.$swal({
          title: 'Error!',
          text: 'Debe llenar campos necesarios en el formulario',
          type: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    },
    clearArray(){
      this.no_value = false
      if(this.budget_request.length != 0){
        for(var k in this.budget_request){
          var rub={}
          rub["presupuesto"]=this.budget_request[k].presupuesto
          rub["_id"]=this.budget_request[k].rubro
          rub["nombre"]=this.budget_request[k].rubro_name
          rub["saldo"]=this.budget_request[k].saldo
          rub["egreso"]=this.budget_request[k].egreso
          this.addRub(rub)
        }
        this.budget_request = []
      }
    },
    changeValueRequest(){
      this.$emit('changeRequestVal',this.request_value)
    },
    changeBudgetRequest(){
      this.$emit('changeBudRequest',this.budget_request)
    },
    cancel(){
      this.$v.$reset()
      this.$swal({
        title: 'Espere',
        text: '¿Esta seguro que quiere cancelar la operación?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.value) {
          this.$swal({
            title: 'Cancelado',
            type: 'success'
          }).then((result) => {
            if (result.value) {
              this.$router.push({ name: 'requests' });
            }
          });
        }
      });
    },
    previous(){
      this.$swal({
        title: 'Espere',
        html: '¿Esta seguro que quiere volver?<br>Los cambios hechos aqui no se guardaran.',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.value) {
          this.$swal({
            title: 'Volviendo',
            type: 'success'
          }).then((result) => {
            if (result.value) {
              this.$router.push({ name: 'updaterequest', params: { type: this.request_type.toLowerCase() ,id: this.obj._id } });
            }
          });
        }
      });
    }
  }
}
</script>
