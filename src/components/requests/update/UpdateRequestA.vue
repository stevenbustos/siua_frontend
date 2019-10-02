<template>
  <div>
    <div class="row">
      <div class="col-md-8 offset-md-2" style="margin-bottom:50px;">
        <div class="row">
          <div class="col">
            <button class="btn btn-primary" type="button" @click="cancel()" style="background:#003e1e;border-color:#003e1e;">
              <font-awesome-icon icon="arrow-left" size="lg"></font-awesome-icon>
            </button>
          </div>
        </div>
        <div>&nbsp;</div>
        <modal name="create-person" :adaptive="true" :scrollable="true" width="50%" height="auto">
          <create-person
          :hide_modal="modal_show"
          @modalShow="closeModalCreatePerson"
          ></create-person>
        </modal>
        <modal name="create-clause" :adaptive="true" :scrollable="true" width="50%" height="auto">
          <create-clause
          :hide_modal="modal_show"
          @modalShow="closeModalCreateClause"
          ></create-clause>
        </modal>
        <div class="row justify-content-center">
          <div class="col-10 align-self-center">
            <form v-on:submit.prevent="saveContinue" novalidate>
              <div class="form-group" :class="{ 'form-group--error': $v.tipo_solicitud.$error }">
                <div class="row">
                  <div class="col">
                    <label for="request_type">Seleccione tipo de solicitud:</label>
                  </div>
                  <div class="col-6">
                    <input type="text" class="form-control" id="request_type" aria-describedby="request_type" :placeholder="tipo_solicitud.nombre" disabled>
                    <div class="alert alert-danger" role="alert" v-if="$v.tipo_solicitud.$dirty && !$v.tipo_solicitud.required">Es requerido un tipo de solicitud</div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col">
                    <label for="request_type">Número de solicitud:</label>
                  </div>
                  <div class="col-6">
                    <input v-model="request_number" type="text" class="form-control" id="request_type" aria-describedby="request_type" placeholder="Número">
                  </div>
                </div>
              </div>
              <div class="form-group" :class="{ 'form-group--error': $v.interventor.$error }">
                <div class="row">
                  <div class="col">
                    <label for="interventors">Seleccione interventor:</label>
                  </div>
                  <div class="col-6">
                    <multiselect id="" v-model.trim="$v.interventor.$model" :options="personasInterventor" :value="interventorStore" track-by="_id" label="nombre" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Escoja un interventor"  @input="updatePersonasInterventorAction">
                    </multiselect>
                    <div class="alert alert-danger" role="alert" v-if="$v.interventor.$dirty && !$v.interventor.required">Es requerido un interventor</div>
                  </div>
                  <div class="col">
                    <button class="btn btn-primary" type="button" @click="showModalCreatePerson()" style="background:#003e1e;border-color:#003e1e;">
                      <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                      Crear Nuevo
                    </button>
                  </div>
                </div>
              </div>
              <div class="form-group" :class="{ 'form-group--error': $v.contratista.$error }">
                <div class="row">
                  <div class="col">
                    <label for="contratistas">Seleccione contratista:</label>
                  </div>
                  <div class="col-6">
                    <multiselect id="box2" v-model.trim="$v.contratista.$model" :options="personasContratista" :value="contratistaStore" track-by="_id" label="nombre" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Escoja un interventor" @input="updatePersonasContratistaAction">
                    </multiselect>
                    <div class="alert alert-danger" role="alert" v-if="$v.contratista.$dirty && !$v.contratista.required">Es requerido un contratista</div>
                  </div>
                  <div class="col">
                    <button class="btn btn-primary" type="button" @click="showModalCreatePerson()" style="background:#003e1e;border-color:#003e1e;">
                      <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                      Crear Nuevo
                    </button>
                  </div>
                </div>
              </div>
              <h3 style="color:#003e1e"> Plazo </h3>
              <div>&nbsp;</div>
              <div class="row">
                <div class="col">
                  <label for="startDate">Fecha inicio:</label>
                </div>
                <div class="col-4">
                  <div class="form-group" :class="{ 'form-group--error': $v.start_request_date.$error }">
                    <input type="date" v-model.trim="$v.start_request_date.$model" class="form-control" id="startDate" aria-describedby="startDate">
                    <div class="alert alert-danger" role="alert" v-if="$v.start_request_date.$dirty && !$v.start_request_date.required">Es requerida una fecha de inicio</div>
                  </div>
                </div>
                <div class="col">
                  <label for="endDate">Fecha final:</label>
                </div>
                <div class="col-4">
                  <div class="form-group" :class="{ 'form-group--error': $v.end_request_date.$error }">
                    <input type="date" v-model.trim="$v.end_request_date.$model" class="form-control" id="endDate" aria-describedby="endDate" @input="changeEndRequestDate">
                    <div class="alert alert-danger" role="alert" v-if="$v.end_request_date.$dirty && !$v.end_request_date.required">Es requerida una fecha final</div>
                    <div class="alert alert-danger" role="alert" v-if="correct_date">La fecha final no puede ser menor a la fecha de inicio</div>
                  </div>
                </div>
              </div>
              <div>&nbsp;</div>
              <div class="form-group">
                <div class="row justify-content-center">
                  <div class="col-auto">
                    <label for="totalDays">Total en dias:</label>
                  </div>
                  <div class="col-5">
                    <input type="text" v-model="total_days" class="form-control" id="totalDays" aria-describedby="totalDays" placeholder="Total" disabled>
                  </div>
                </div>
              </div>
              <div class="form-group" :class="{ 'form-group--error': $v.causal.$error }">
                <div class="row justify-content-center">
                  <div class="col-auto">
                    <label for="selectionCausal">Causal de selección:</label>
                  </div>
                  <div class="col-6">
                    <multiselect v-model.trim="$v.causal.$model" :options="causals" track-by="_id" label="nombre" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Causal">
                    </multiselect>
                    <div class="alert alert-danger" role="alert" v-if="$v.causal.$dirty && !$v.causal.required">Es requerido un causal de selección</div>
                  </div>
                </div>
              </div>
              <h3 style="color:#003e1e"> Clausulas adicionales (marcar) </h3>
              <div>&nbsp;</div>
              <div class="row justify-content-center">
                <div class="col-6">
                  <div class="form-group" :class="{ 'form-group--error': $v.clausulas.$error }">
                    <multiselect v-model.trim="$v.clausulas.$model" :options="clauses" :multiple="true" :close-on-select="true" :clear-on-select="false" :hide-selected="true" :preserve-search="true" placeholder="Escoja las clausulas" label="nombre" track-by="_id" :preselect-first="false">
                    </multiselect>
                    <div class="alert alert-danger" role="alert" v-if="$v.clausulas.$dirty && !$v.clausulas.required">Es requerida al menos una clausula</div>
                  </div>
                </div>
                <div class="col-auto">
                  <button class="btn btn-primary" type="button" @click="showModalCreateClause()" style="background:#003e1e;border-color:#003e1e;">
                    <font-awesome-icon icon="plus" size="lg"></font-awesome-icon>
                    Adicionar otras
                  </button>
                </div>
              </div>
              <div>&nbsp;</div>
              <h3 style="color:#003e1e; text-align:center;"> Si tiene clausula de responsabilidad de bienes por favor seleccione el responsable de los bienes </h3>
              <div>&nbsp;</div>
              <div class="form-group" >
                <div class="row">
                  <div class="col">
                    <label for="interventors">Personas a cargo:</label>
                  </div>
                  <div class="col-6">
                    <multiselect v-model="person_charge" :options="personasResponsable" track-by="_id" label="nombre" :value="responsableStore" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Escoja un interventor" @input="updatePersonasResponsableAction">
                    </multiselect>
                  </div>
                  <div class="col">
                    <button class="btn btn-primary" type="button" @click="showModalCreatePerson()" style="background:#003e1e;border-color:#003e1e;">
                      <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                      Crear Nuevo
                    </button>
                  </div>
                </div>
              </div>
              <div>&nbsp;</div>
              <div class="row justify-content-center">
                <div class="col-3 text-center">
                  <button class="btn btn-primary" type="submit" :disabled="correct_date || submitting" style="background:#003e1e;border-color:#003e1e;">
                    <font-awesome-icon icon="save" size="lg"></font-awesome-icon>
                    Guardar y continuar
                  </button>
                </div>
                <div class="col-3 text-center">
                  <button class="btn btn-primary" type="button" @click="cancel()" style="background:#003e1e;border-color:#003e1e;">
                    <font-awesome-icon icon="times-circle" size="lg"></font-awesome-icon>
                    Cancelar
                  </button>
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
import {axios} from '../../../helpers/axios';
import { required } from 'vuelidate/lib/validators'
import CreatePerson from '../../persons/CreatePersonModal.vue'
import CreateClause from '../../clauses/CreateClauseModal.vue'
var API_IP = process.env.VUE_APP_API_IP

const { mapActions, mapState ,mapGetters } = Vuex

import router from '../../../router'

Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    profesores:[],
    contratistas:[],
    planta:[],
    interventorStore:{},
    contratistaStore:{},
    responsableStore:{},
    valuex:"",
    valuey:"",
    allpersonas:[],
    personasInterventor:[],
    personasContratista:[],
    personasResponsable:[],
    personasInterventorOriginal:[],
    personasContratistaOriginal:[],
    personasResponsableOriginal:[],
    clauses:[],
    causals:[],
    types_request:[],
    request_data:{}
  },
  actions: {
    loadData({commit}) {
      axios.get(API_IP+"/person/").then(response => {
        var personas=[]
        for (var k in response.data.data){
          var person = {}
          person["_id"] = response.data.data[k]._id;
          person["nombre"] = response.data.data[k].primer_nombre+" "+response.data.data[k].segundo_nombre+" "+response.data.data[k].primer_apellido+" "+response.data.data[k].segundo_apellido;
          personas.push(person);
        }
        commit('loadPersonas',personas);
        axios.get(API_IP+"/person/",{params:"profesor"}).then(response => {
          var profesores=[]
          for (var k in response.data.data){
            var profesor = {}
            profesor["_id"] = response.data.data[k]._id;
            profesor["nombre"] = response.data.data[k].primer_nombre+" "+response.data.data[k].segundo_nombre+" "+response.data.data[k].primer_apellido+" "+response.data.data[k].segundo_apellido;
            profesores.push(profesor);
          }
          commit('loadProfesores',profesores);
          axios.get(API_IP+"/person/",{params:"contratista"}).then(response => {
            var contratistas=[]
            for (var k in response.data.data){
              var contratista = {}
              contratista["_id"] = response.data.data[k]._id;
              contratista["nombre"] = response.data.data[k].primer_nombre+" "+response.data.data[k].segundo_nombre+" "+response.data.data[k].primer_apellido+" "+response.data.data[k].segundo_apellido;
              contratistas.push(contratista);
            }
            commit('loadContratistas',contratistas);
            axios.get(API_IP+"/person/",{params:"planta"}).then(response => {
              var plantas=[]
              for (var k in response.data.data){
                var planta = {}
                planta["_id"] = response.data.data[k]._id;
                planta["nombre"] = response.data.data[k].primer_nombre+" "+response.data.data[k].segundo_nombre+" "+response.data.data[k].primer_apellido+" "+response.data.data[k].segundo_apellido;
                plantas.push(planta);
              }
              commit('loadPlanta',plantas);
              axios
              .get(API_IP+"/clause/").then(response => {
                var clauses=[]
                for (var k in response.data.data){
                  var clause = {}
                  clause["_id"] = response.data.data[k]._id;
                  clause["nombre"] = response.data.data[k].nombre
                  clauses.push(clause);
                }
                axios
                .get(API_IP+'/request/'+router.currentRoute.params.id)
                .then(response => {
                  let request_data=response.data.data
                  for(var k in request_data.trabajadores){
                    let trabajador={}
                    if (request_data.trabajadores[k].tipo == "Interventor") {
                      trabajador["_id"] = request_data.trabajadores[k].persona._id
                      trabajador["nombre"] = request_data.trabajadores[k].persona.primer_nombre+" "+request_data.trabajadores[k].persona.segundo_nombre+" "+request_data.trabajadores[k].persona.primer_apellido+" "+request_data.trabajadores[k].persona.segundo_apellido
                      commit('loadInterventor', trabajador)
                    } else if(request_data.trabajadores[k].tipo == "Contratista"){
                      trabajador["_id"] = request_data.trabajadores[k].persona._id
                      trabajador["nombre"] = request_data.trabajadores[k].persona.primer_nombre+" "+request_data.trabajadores[k].persona.segundo_nombre+" "+request_data.trabajadores[k].persona.primer_apellido+" "+request_data.trabajadores[k].persona.segundo_apellido
                      commit('loadContratista', trabajador)
                    } else if (request_data.trabajadores[k].tipo == "Responsable"){
                      trabajador["_id"] = request_data.trabajadores[k].persona._id
                      trabajador["nombre"] = request_data.trabajadores[k].persona.primer_nombre+" "+request_data.trabajadores[k].persona.segundo_nombre+" "+request_data.trabajadores[k].persona.primer_apellido+" "+request_data.trabajadores[k].persona.segundo_apellido
                      commit('loadResponsable', trabajador)
                    }
                  }
                  commit('loadRequestData',response.data.data);
                  commit('loadClauses',clauses);
                  axios
                  .get(API_IP+"/causalSelection/").then(response => {
                    var causals=[]
                    for (var k in response.data.data){
                      var causal= {}
                      causal["_id"] = response.data.data[k]._id;
                      causal["nombre"] = response.data.data[k].nombre
                      causals.push(causal);
                    }
                    commit('loadCausals',causals)
                    axios
                    .get(API_IP+"/requesttype/").then(response => {
                      var types_request=[]
                      for (var k in response.data.data){
                        var type= {}
                        type["_id"] = response.data.data[k]._id;
                        type["nombre"] = response.data.data[k].nombre;
                        types_request.push(type);
                      }
                      commit('loadTypesRequest',types_request)
                    })
                  })
                })
              })
            })
          })
        })
      })
    },
    updateValueXAction({commit},valuex){
      commit('updateValuex',valuex)
    },
    updateValueYAction({commit},valuey){
      commit('updateValuey',valuey)
    },
    updatePersonasInterventorAction({commit},interventorStore){
      commit('updatePersonasInterventor',interventorStore)
    },
    updatePersonasContratistaAction({commit},contratistaStore){
      commit('updatePersonasContratista',contratistaStore)
    },
    updatePersonasResponsableAction({commit},responsableStore){
      commit('updatePersonasCargo',responsableStore)
    }
  },
  getters:{
    getRequestData: (state) => {
      return state.request_data
    }
  },
  mutations:{
    loadInterventor(state,interventor){
      state.interventorStore=interventor
    },
    loadContratista(state,contratista){
      state.contratistaStore=contratista
    },
    loadResponsable(state,responsable){
      state.responsableStore=responsable
    },
    loadProfesores(state,profesores){
      state.profesores=profesores
    },
    loadContratistas(state,contratistas){
      state.contratistas=contratistas
    },
    loadPlanta(state,planta){
      state.planta=planta
      state.personasInterventorOriginal=state.profesores.concat(state.contratistas).concat(state.planta);
      state.personasContratistaOriginal=state.contratistas;
      state.personasResponsableOriginal=state.profesores.concat(state.contratistas).concat(state.planta);
      state.personasInterventor=state.profesores.concat(state.contratistas).concat(state.planta);
      state.personasContratista=state.contratistas;
      state.personasResponsable=state.profesores.concat(state.contratistas).concat(state.planta);
    },
    loadClauses(state,clauses){
      state.clauses=clauses;
    },
    loadCausals(state,causals){
      state.causals=causals;
    },
    loadRequestData(state,request_data){
      state.request_data=request_data
    },
    loadTypesRequest(state,types_request){
      state.types_request=types_request;
    },
    loadPersonas(state,personas){
      state.allpersonas=personas;
      state.personasInterventor=personas;
      state.personasContratista=personas;
    },
    updatePersonasInterventor(state,interventorStore){
      state.interventorStore=((interventorStore != null) ? interventorStore : "")
      state.personasInterventor=state.personasInterventorOriginal.filter(person=> (person._id!=state.contratistaStore._id && person._id!=state.responsableStore._id));
      state.personasContratista=state.personasContratistaOriginal.filter(person=> (person._id!=state.interventorStore._id && person._id!=state.responsableStore._id));
      state.personasResponsable=state.personasResponsableOriginal.filter(person=> (person._id!=state.interventorStore._id && person._id!=state.contratistaStore._id));
    },
    updatePersonasContratista(state,contratistaStore){
      state.contratistaStore=((contratistaStore != null) ? contratistaStore : "")
      state.personasInterventor=state.personasInterventorOriginal.filter(person=> (person._id!=state.contratistaStore._id && person._id!=state.responsableStore._id));
      state.personasContratista=state.personasContratistaOriginal.filter(person=> (person._id!=state.interventorStore._id && person._id!=state.responsableStore._id));
      state.personasResponsable=state.personasResponsableOriginal.filter(person=> (person._id!=state.interventorStore._id && person._id!=state.contratistaStore._id));
    },
    updatePersonasCargo(state,responsableStore){
      state.responsableStore=((responsableStore != null) ? responsableStore : "")
      state.personasInterventor=state.personasInterventorOriginal.filter(person=> (person._id!=state.contratistaStore._id && person._id!=state.responsableStore._id));
      state.personasContratista=state.personasContratistaOriginal.filter(person=> (person._id!=state.interventorStore._id && person._id!=state.responsableStore._id));
      state.personasResponsable=state.personasResponsableOriginal.filter(person=> (person._id!=state.interventorStore._id && person._id!=state.contratistaStore._id));
    }
  }
})
export default {
  props: ['stp'],
  store,
  components: {
    Multiselect,
    'create-person': CreatePerson,
    'create-clause': CreateClause
  },
  data () {
    return {
      interventoresSelect:"",
      contratistasSelect:"",
      request_number: "",
      interventor:{},
      contratista:{},
      person_charge:{},
      start_request_date:"",
      end_request_date:"",
      total_days:"",
      causal: {},
      clausulas: [],
      clausulas_request:[],
      message:"",
      tipo_solicitud:"",
      trabajadores:[],
      step: this.stp,
      modal_show: false,
      submitting: false,
      correct_date: false
    }
  },
  validations: {
    tipo_solicitud:{required}, interventor:{required}, contratista:{required}, clausulas:{required},
    start_request_date:{required}, end_request_date:{required},
    causal:{required}
  },
  computed:{
    ...mapGetters(['getRequestData']),
    ...mapState(['personasInterventorOriginal','personasContratistaOriginal','personasResponsableOriginal','allpersonas','personasInterventor','valuex','valuey','contratistaStore','interventorStore','personasContratista','clauses','causals','types_request','personasResponsable','responsableStore','request_data'])
  },
  watch: {
    interventorStore(){
      this.interventor=this.$store.state.interventorStore
      this.$store.dispatch('updatePersonasInterventorAction',this.interventor)
    },
    contratistaStore(){
      // this.$store.dispatch('updatePersonasInterventorAction',this.interventor)
      this.contratista=this.$store.state.contratistaStore
    },
    responsableStore(){
      // this.$store.dispatch('updatePersonasInterventorAction',this.interventor)
      this.person_charge=this.$store.state.responsableStore
    },
    getRequestData(requestData){
      this.tipo_solicitud = requestData.tipo_solicitud
      this.start_request_date= requestData.fecha_inicio.substring(0,10)
      this.end_request_date = requestData.fecha_final.substring(0,10)
      // Funcion para calcular el total de dias
      var sd=new Date(this.start_request_date);
      var ed=new Date(this.end_request_date);
      sd.setDate(sd.getDate()+1)
      ed.setDate(ed.getDate()+1)
      var differentDays = Math.ceil(Math.abs( ed.getTime() - sd.getTime()) / (1000 * 3600 * 24));
      this.total_days=differentDays+1;
      this.causal= requestData.causal_seleccion
      this.clausulas = requestData.clausulas
      // Parametros usados en el padre
      this.request_id = requestData._id
      this.request_url = "/solicitudes/"+requestData.tipo_solicitud.nombre.toLowerCase()+"/"+requestData._id
      this.request_type_url = "/solicitudes/"+requestData.tipo_solicitud.nombre.toLowerCase()
      this.request_type = requestData.tipo_solicitud.nombre
      this.$emit('request_id', this.request_id)
      this.$emit('request_url', this.request_url)
      this.$emit('request_type', this.request_type)
      this.$emit('request_type_url', this.request_type_url)
      // Parametros necesarios para el update genera
      this.request_auditoria = requestData.auditoria
      this.request_state = requestData.estado
      this.request_number = requestData.numero_solicitud
      this.request_value = requestData.valor_solicitud
      this.$emit('request_value', this.request_value)
      // if(requestData.ciudad._id !== undefined && requestData.ciudad._id !== null){
      //   this.request_city = requestData.ciudad._id
      // }
      this.request_justification = requestData.justificacion
      this.request_aditional_justification = requestData.justificacion_adicional
      this.request_objetivo = requestData.objetivo_general
      this.request_obligations = requestData.obligaciones_especificas
      this.request_especifications = requestData.especificaciones_tecnicas
      this.request_budget = requestData.rubros
      this.payment_amount = requestData.cantidad_pagos
      this.payment_type = requestData.tipo_pago
    }
  },
  methods:{
    ...mapActions(['getPersonas','updatePersonasInterventorAction','updatePersonasContratistaAction','updatePersonasResponsableAction']),
    changeEndRequestDate(){
      var sd=new Date(this.start_request_date);
      var ed=new Date(this.end_request_date);
      if (sd > ed) {
        this.correct_date = true
        this.total_days=0;
      } else {
        this.correct_date = false
        sd.setDate(sd.getDate()+1)
        ed.setDate(ed.getDate()+1)
        var differentDays = Math.ceil(Math.abs( ed.getTime() - sd.getTime()) / (1000 * 3600 * 24));
        this.total_days=differentDays+1;
      }
      this.changeTotalDays();
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
              this.$router.push({ name: 'showrequest', params: { type: this.request_type.toLowerCase() ,id: this.request_id } });
            }
          });
        }
      });
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
        this.submitting = true
        for(var k in this.clausulas){
          this.clausulas_request.push(this.clausulas[k]._id)
        }
        axios
        .put(API_IP+'/request/'+this.$route.params.id, {
          // Parametros enviados por esta vista
          tipo_solicitud: this.tipo_solicitud._id,
          trabajadores: [
            {
              persona:this.contratista._id,tipo:"Contratista"
            },
            {
              persona:this.interventor._id,tipo:"Interventor"
            },
            {
              persona:this.person_charge._id,tipo:"Responsable"
            }
          ],
          fecha_inicio:this.start_request_date,
          fecha_final: this.end_request_date,
          causal_seleccion:this.causal._id,
          clausulas:this.clausulas_request,
          // Parametros enviados para completar el update
          auditoria: this.request_auditoria,
          _id: this.request_id,
          estado:this.request_state,
          numero_solicitud: this.request_number,
          valor_solicitud:this.request_value,
          ciudad: this.request_city,
          justificacion:this.request_justification,
          justificacion_adicional:this.request_aditional_justification,
          objetivo_general:this.request_objetivo,
          especificaciones_tecnicas:this.request_especifications,
          obligaciones_especificas:this.request_obligations,
          rubros:this.request_budget,
          cantidad_pagos: this.payment_amount,
          tipo_pago: this.payment_type
        })
        .then(response => {
          console.log(response);
          this.$swal({
            title: 'Exito!',
            text: 'Se creo la solicitud con exito.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.value) {
              this.submitting = false;
              this.step++
              this.$emit('nextStep', this.step)
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
    // Modal para la creación de personas
    showModalCreatePerson () {
      this.modal_show = false;
      this.$modal.show('create-person');
    },
    closeModalCreatePerson (value) {
      this.modal_show = value;
      if(this.modal_show === true){
        this.$modal.hide('create-person');
        location.reload();
      }
    },
    showModalCreateClause () {
      this.modal_show = false;
      this.$modal.show('create-clause');
    },
    closeModalCreateClause (value) {
      this.modal_show = value;
      if(this.modal_show === true){
        this.$modal.hide('create-clause');
        location.reload();
      }
    }
  },
  created(){
    this.$store.dispatch('loadData')
  }
}
</script>
