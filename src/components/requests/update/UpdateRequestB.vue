<template>
  <div>
    <div class="row">
      <div class="col-md-8 offset-md-2" style="margin-bottom:50px;">
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
              <div class="form-group" :class="{ 'form-group--error': $v.justification.$error }">
                <label for="justification">Justificación:</label>
                <textarea v-model.trim="$v.justification.$model" class="form-control" aria-label="justification"
                placeholder="Justificación" :rows="6" :max-rows="10"></textarea>
                <div class="alert alert-danger" role="alert" v-if="$v.justification.$dirty && !$v.justification.required">Es requerida una fecha de inicio</div>
              </div>
              <div class="form-group">
                <label for="aditionalJustification">Justificación adicional:</label>
                <textarea v-model="aditional_justification" class="form-control" :disabled="no_aditional_justification" aria-label="aditionalJustification"
                placeholder="Justificación adicional" :rows="6" :max-rows="10"></textarea>
              </div>
              <div class="form-group" :class="{ 'form-group--error': $v.general_objective.$error }">
                <label for="generalObjective">Objetivo general de la contratación requerida:</label>
                <textarea v-model.trim="$v.general_objective.$model" class="form-control" aria-label="generalObjective"
                placeholder="Objetivo general" :rows="6" :max-rows="10"></textarea>
                <div class="alert alert-danger" role="alert" v-if="$v.general_objective.$dirty && !$v.general_objective.required">Es requerida una fecha de inicio</div>
              </div>
              <div class="form-group" :class="{ 'form-group--error': $v.place.$error }">
                <label for="place">Lugar de ejecución o de entrega:</label>
                <multiselect id="box2" v-model.trim="$v.place.$model" :options="cities" :searchable="false" :close-on-select="true" :show-labels="true" track-by="_id" label="nombre" placeholder="Escoja un lugar">
                </multiselect>
                <div class="alert alert-danger" role="alert" v-if="$v.place.$dirty && !$v.place.required">Es requerida una fecha de inicio</div>
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
import Multiselect from 'vue-multiselect'
import {axios} from '../../../helpers/axios';
import { required } from 'vuelidate/lib/validators'
var API_IP = process.env.VUE_APP_API_IP

export default {
  props: ['stp'],
  components: {
    Multiselect
  },
  data () {
    return {
      justification: '',
      aditional_justification:'',
      general_objective:'',
      place:'',
      cities: [],
      step: this.stp,
      end_request_date: '',
      submitting: false,
      no_aditional_justification: true
    }
  },
  validations: {
    justification: {required},
    general_objective: {required}, place: {required},
  },
  mounted () {
    axios
    .get(API_IP+'/request/'+this.$route.params.id)
    .then(response => {
      // Parametros necesarios en esta vista
      this.justification = response.data.data.justificacion
      this.aditional_justification = response.data.data.justificacion_adicional
      this.general_objective = response.data.data.objetivo_general
      this.place = response.data.data.ciudad
      // Parametros necesarios para el update general
      this.tipo_solicitud = response.data.data.tipo_solicitud
      this.trabajadores = response.data.data.trabajadores
      this.start_request_date= response.data.data.fecha_inicio.substring(0,10)
      this.end_request_date = response.data.data.fecha_final.substring(0,10)
      //Funcion para el total de dias
      var sd=new Date(this.start_request_date);
      var ed=new Date(this.end_request_date);
      sd.setDate(sd.getDate()+1)
      ed.setDate(ed.getDate()+1)
      var differentDays = Math.ceil(Math.abs( ed.getTime() - sd.getTime()) / (1000 * 3600 * 24));
      this.total_days=differentDays;
      this.causal= response.data.data.causal_seleccion
      this.clausulas = response.data.data.clausulas
      this.request_auditoria = response.data.data.auditoria
      this.request_id = response.data.data._id
      this.request_state = response.data.data.estado
      this.request_number = response.data.data.numero_solicitud
      this.request_value = response.data.data.valor_solicitud
      this.request_obligations = response.data.data.obligaciones_especificas
      this.request_especifications = response.data.data.especificaciones_tecnicas
      this.request_budget = response.data.data.rubros
      this.payment_amount = response.data.data.cantidad_pagos
      this.payment_type = response.data.data.tipo_pago
      // Parametros usados en el padre
      this.request_url = "/solicitudes/"+response.data.data.tipo_solicitud.nombre.toLowerCase()+"/"+response.data.data._id
      this.request_type_url = "/solicitudes/"+response.data.data.tipo_solicitud.nombre.toLowerCase()
      this.request_type = response.data.data.tipo_solicitud.nombre
      this.$emit('request_id', this.request_id)
      this.$emit('request_url', this.request_url)
      this.$emit('request_type', this.request_type)
      this.$emit('request_type_url', this.request_type_url)
      this.aditionalJustificationStatus()
    });
    axios
    .get(API_IP+'/city')
    .then(response => {
      for (var k in response.data.data){
        var city = {}
        city["_id"] = response.data.data[k]._id;
        city["nombre"] = response.data.data[k].nombre;
        this.cities.push(city);
      }
    });
  },
  methods:{
    aditionalJustificationStatus(){
      var curYear = new Date();
      var endYear = new Date();
      var yyyy = curYear.getFullYear();
      curYear = yyyy;
      endYear = this.end_request_date.substring(0,4);
      if ( endYear > curYear ){
        this.no_aditional_justification = false
      } else {
        this.no_aditional_justification = true
      }
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
        axios
        .put(API_IP+'/request/'+this.$route.params.id, {
          // Parametros enviados por esta vista
          justificacion: this.justification,
          justificacion_adicional: this.aditional_justification,
          objetivo_general: this.general_objective,
          ciudad: this.place._id,
          // Parametros enviados para completar el update
          auditoria: this.request_auditoria,
          _id: this.request_id,
          tipo_solicitud: this.tipo_solicitud,
          trabajadores: this.trabajadores,
          fecha_inicio: this.start_request_date,
          fecha_final: this.end_request_date,
          causal_seleccion: this.causal,
          clausulas: this.clausulas,
          estado: this.request_state,
          numero_solicitud: this.request_number,
          valor_solicitud: this.request_value,
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
            text: 'Se actualizo la solicitud con exito.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.value) {
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
  }
}
</script>
