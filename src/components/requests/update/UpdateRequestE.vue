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
                      <input v-model="request_value" type="number" class="form-control"  aria-describedby="number" placeholder="Valor de solicitud" @input="changeValueRequest">
                      <div class="input-group-append">
                        <span class="input-group-text">$</span>
                      </div>
                      <div class="alert alert-danger" role="alert" v-if="$v.request_value.$dirty && !$v.request_value.required">Es requerido el valor de la solicitud</div>
                    </div>
                  </div>
                  <p>
                    ¿Esta orden se hara con recursos compartidos?
                  </p>
                  <div class="form-group">
                    <div class="row">
                      <div class="col">
                        <multiselect v-model="shared_resources" :options="shared_options" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Seleccione un tipo de pago">
                        </multiselect>
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
                              <input v-model="newBudget2.rubros2.saldo" type="number" class="form-control" aria-describedby="number" placeholder="Número" disabled>}
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
                  </div>
                  <!-- Recursos compartidos: No -->
                  <div v-if="shared_resources === 'No' ">
                    <hr>
                    <h4>
                      Seleccione los rubros que va a afectar
                    </h4>
                    <hr>
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
        <div>&nbsp;</div>
        <br>
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
                <tr v-for='(budget, index) in (budget_request)' :key='index'>
                  <td>{{budget.presupuesto_name}}</td>
                  <td>{{budget.rubro_name}}</td>
                  <td>{{budget.valor}}$</td>
                  <td>
                    <button type="button" class="btn btn-primary" v-on:click="remove(index,budget.presupuesto,budget.rubro,budget.rubro_name)" style="background:#003e1e;border-color:#003e1e;">
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
</template>

<script>
import Vue from 'vue';
import Multiselect from 'vue-multiselect'
import Vuex from 'vuex';
import router from '../../../router'
import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import {axios} from '../../../helpers/axios';

var API_IP = process.env.VUE_APP_API_IP

function initialState(){
  var initialState={
    allbudgets:[],
    showrub:false,
    rubrosOptions:[],
    request:{},
    request_budgets:[]
  };
  return initialState
}
const { mapActions, mapState } = Vuex
Vue.use(Vuex)
const store = new Vuex.Store({
  state:initialState,
  getters:{
    getRequestData: state =>{
      return state.request;
    },
    getRequestBudgets: state =>{
      return state.request_budgets;
    }
  },
  actions: {
    loadData({commit}) {
      commit('reset')
      axios
      .get(API_IP+'/budget')
      .then(response => {
        var budgets=[]
        for(var k in response.data.data) {
          var budget = {}
          budget["_id"] = response.data.data[k]._id;
          budget["name"] = response.data.data[k].nombre;
          budget["rubros"] = response.data.data[k].rubros;
          budget["optionBudget"]=[]
          budget["activeRub"]=false
          for(var j in budget.rubros){
            var bud={}
            bud["_id"]=budget.rubros[j].rubro._id;
            bud["nombre"]=budget.rubros[j].rubro.nombre;
            bud["saldo"]=budget.rubros[j].saldo;
            bud["egreso"]=budget.rubros[j].egreso;
            budget.optionBudget.push(bud)
          }
          budget.activeRub=true
          budgets.push(budget);
        }
        commit('loadBudgets',budgets);

        axios
        .get(API_IP+'/request/'+router.currentRoute.params.id)
        .then(response => {
          var requestData = {}
          // Parametros necesarios en esta vista
          requestData['obligations'] = response.data.data.obligaciones_especificas
          // Parametros necesarios para el update general
          requestData['justification'] = response.data.data.justificacion
          requestData['aditional_justification'] = response.data.data.justificacion_adicional
          requestData['general_objective'] = response.data.data.objetivo_general
          requestData['place'] = response.data.data.ciudad
          requestData['tipo_solicitud'] = response.data.data.tipo_solicitud
          requestData['trabajadores'] = response.data.data.trabajadores
          requestData['start_request_date']= response.data.data.fecha_inicio.substring(0,10)
          requestData['end_request_date'] = response.data.data.fecha_final.substring(0,10)
          //Funcion para el total de dias
          requestData['total_days']=response.data.data.total_dias;
          requestData['causal']= response.data.data.causal_seleccion
          requestData['clausulas'] = response.data.data.clausulas
          requestData['request_auditoria'] = response.data.data.auditoria
          requestData['request_id'] = response.data.data._id
          requestData['request_state'] = response.data.data.estado
          requestData['request_number'] = response.data.data.numero_solicitud
          requestData['request_value'] = response.data.data.valor_solicitud
          requestData['especifications'] = response.data.data.especificaciones_tecnicas
          requestData['request_budget'] = response.data.data.rubros
          requestData['payment_amount'] = response.data.data.cantidad_pagos
          requestData['payment_type'] = response.data.data.tipo_pago
          // Parametros usados en el padre
          requestData['request_url'] = "/solicitudes/"+response.data.data.tipo_solicitud.nombre.toLowerCase()+"/"+response.data.data._id
          requestData['request_type_url'] = "/solicitudes/"+response.data.data.tipo_solicitud.nombre.toLowerCase()

          commit('loadRequest',requestData);
        });
      })
    },
    updateShowRub({commit},showrub){
      commit('toggleRub',showrub)
    },
    addOptionRubro({commit},rub){
      commit('addRub',rub)
    },
    removeOptionRubro({commit},bud){
      commit('removeRub',bud)
    }
  },
  mutations:{
    reset(state){
      const s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    },
    loadRequest(state,request){
      state.request=request;
      for(var k in state.request.request_budget){
        var budget = state.request.request_budget[k]
        budget["presupuesto_name"] = request.request_budget[k].presupuesto.nombre
        budget["rubro_name"] = request.request_budget[k].rubro.nombre
        state.request_budgets.push(budget)
      }
      console.log(state.request_budgets);
    },
    loadBudgets(state,budgets){
      state.allbudgets=budgets;
    },
    toggleRub(state){
      state.showrub=true
    },
    addRub(state,rub){
      var found = state.allbudgets.findIndex(function(element) {
        return rub.presupuesto == element._id;
      });
      console.log(found);
      if (found != undefined && found != -1) {
        state.allbudgets[found].optionBudget.push({"_id":rub._id,"nombre":rub.nombre,"saldo":rub.saldo,"egreso":rub.egreso})
      }
    },
    removeRub(state,budget){
      var found = state.allbudgets.findIndex(function(element) {
        return budget.presupuesto == element._id;
      });
      var indexRub = state.allbudgets[found].optionBudget.findIndex(function(element) {
        return budget.rubro == element._id;
      })
      var tmp = state.allbudgets[found].optionBudget.splice(indexRub,1)
    }
  }
})
export default {
  props: ['stp'],
  components: {
    Multiselect
  },
  store,
  data () {
    return {
      currentRequest:{},
      shared_options: ["Si","No"],
      shared_resources: "",
      no_value: false,
      allRequestData:{},
      budget_request: [],
      request_value: "",
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
      step: this.stp,
      submitting: false
    }
  },
  validations: {
    request_value: { required }
  },
  computed:{
    ...mapState(['allbudgets','showrub','rubrosOptions','request','request_budgets']),
    ...mapGetters(['getRequestData','getRequestBudgets'])
  },
  mounted(){
  },
  watch:{
    getRequestData(newValue){
      this.currentRequest = newValue;
      this.request_value=newValue.request_value
      // console.log(this.currentRequest);
    },
    getRequestBudgets(newValue){
      this.budget_request=newValue;
    }
  },
  methods:{
    ...mapActions(['updateShowRub','addOptionRubro']),

    relo(){
      console.log(this.$store.state.rubrosOptions);
      this.$store.state.rubrosOptions=[]
      console.log(this.$store.state.rubrosOptions);
    },
    remove(index,idbudget,idrub,namerub){
      var rub={}
      rub["presupuesto"]=idbudget
      rub["_id"]=idrub
      rub["nombre"]=namerub
      this.budget_request.splice(index,1)
      this.$store.dispatch('addOptionRubro',rub)
    },
    saveContinue(){
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$swal({
          title: 'Error!',
          text: 'Debe llenar campos necesarios en el formulario',
          type: 'error',
          confirmButtonText: 'Cerrar'
        });
      } else {
        this.submitting = true;
        axios
        .put(API_IP+'/request/'+this.$route.params.id, {
          auditoria: this.currentRequest.request_auditoria,
          clausulas: this.currentRequest.clausulas,
          estado: this.currentRequest.request_state,
          _id: this.currentRequest.request_id,
          numero_solicitud: this.currentRequest.request_number,
          tipo_solicitud: this.currentRequest.tipo_solicitud,
          fecha_inicio: this.currentRequest.start_request_date,
          fecha_final: this.currentRequest.end_request_date,
          valor_solicitud: (this.request_value != "")? parseInt(this.request_value) : parseInt(this.currentRequest.request_value),
          justificacion: this.currentRequest.justification,
          justificacion_adicional:this.currentRequest.aditional_justification,
          objetivo_general:this.currentRequest.general_objective,
          especificaciones_tecnicas:this.currentRequest.especifications,
          obligaciones_especificas:this.currentRequest.obligations,
          rubros:this.budget_request,
          trabajadores: this.currentRequest.trabajadores,
          ciudad:this.currentRequest.place
        })
        .then(response => {
          console.log(response);
          this.$swal({
            title: 'Exito!',
            text: 'Se actualizo la solicitud con exito.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.value) {
              this.$emit('saveObject',response.data)
              this.submitting = false;
              this.step++;
              this.$emit('nextStep', this.step);
            }
          });
        })
        .catch(error => {
          console.log(error);
          this.$swal({
            title: 'Error!',
            text: error.response.data.error.msg,
            type: 'error',
            confirmButtonText: 'Cerrar'
          });
          this.submitting = false;
        });
      }
    },
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
          this.$store.dispatch('removeOptionRubro',budget)
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
          this.$store.dispatch('removeOptionRubro',budget)
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
        this.no_value = true
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
          this.$store.dispatch('addOptionRubro',rub)
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
              this.$router.push({ name: 'showrequest', params: { type: this.getRequestData.tipo_solicitud.nombre.toLowerCase() ,id: this.getRequestData.request_id } });
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
              this.step--;
              this.$emit('nextStep', this.step);
            }
          });
        }
      });
    }
  },
  created(){
    this.$store.dispatch('loadData')
  }
}
</script>
