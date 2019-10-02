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
              <div class="form-group" :class="{ 'form-group--error': $v.tipo_pago.$error }">
                <div class="row">
                  <div class="col-auto">
                    <label for="payment_type">Forma de pago:</label>
                  </div>
                  <div class="col-6">
                    <multiselect @input="clearPayments" v-model.trim="$v.tipo_pago.$model" :options="payment_types" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Seleccione un tipo de pago">
                    </multiselect>
                    <div class="alert alert-danger" role="alert" v-if="$v.tipo_pago.$dirty && !$v.tipo_pago.required">Es requerido un tipo de pago</div>
                  </div>
                </div>
              </div>
              <div v-if="tipo_pago === 'Fijo' ">
                <hr>
                <div class="form-group" :class="{ 'form-group--error': $v.payment_number.$error }">
                  <div class="row">
                    <div class="col-auto">
                      <label for="payment_number">Numéro de pagos:</label>
                    </div>
                    <div class="col-6">
                      <input type="number" @input="addPay()" v-model.trim="$v.payment_number.$model" class="form-control" id="payment_number" aria-describedby="payment_number">
                      <div class="alert alert-danger" role="alert" v-if="$v.payment_number.$dirty && !$v.payment_number.required">Es requerido el numero de pagos</div>
                    </div>
                  </div>
                </div>
                <div v-if="parseInt(payment_number) !== 0 && tipo_pago != ''" class="form-group">
                  <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                    <thead style="background-color: #003e1e; color:white;">
                      <tr>
                        <th scope="col"># de pago</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(payment, index) in $v.payments.$each.$iter" :key="index">
                        <td>
                          {{parseInt(index)+1}}
                        </td>
                        <td>
                          <div class="input-group mb-3">
                            <input type="number" :value="payment.valor.$model" class="form-control" id="payment_number" aria-describedby="payment_number" disabled>
                            <div class="input-group-append">
                              <span class="input-group-text">$</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="form-group" :class="{ 'form-group--error': $v.$error }">
                            <input type="date" v-model.trim="payment.fecha.$model" class="form-control" id="payment_number" aria-describedby="payment_number">
                            <div class="alert alert-danger" role="alert" v-if="payment.fecha.$dirty && !payment.fecha.required">Es requerida una fecha</div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
import Multiselect from 'vue-multiselect'
import {axios} from '../../../helpers/axios';
import { required, requiredIf } from 'vuelidate/lib/validators'
var API_IP = process.env.VUE_APP_API_IP

export default {
  props: ['stp','object'],
  components: {
    Multiselect
  },
  data () {
    return {
      payment_types: ["Fijo","Variable"],
      obj: this.object,
      step: this.stp,
      tipo_pago: "",
      payment_number: "",
      payments: [],
      submitting: false
    }
  },
  validations: {
    tipo_pago: { required },
    payment_number: {
      required: requiredIf(function (){
        return this.tipo_pago === 'Fijo'
      })
    },
    payments: {
      requiredIf: requiredIf(function (){
        return this.tipo_pago === 'Fijo'
      }),
      $each: {
        fecha: { required },
        valor: { required }
      }
    }
  },
  methods: {
    addPay(){
      this.payments = []
      var payment_value = (this.obj.valor_solicitud)/(this.payment_number)
      if( this.tipo_pago == "Variable"){
        payment_value = ""
      }
      for (var i = 0; i < parseInt(this.payment_number); i++) {
        this.payments.push({
          solicitud: this.obj._id,
          valor: payment_value,
          fecha: "",
          numero: i+1
        })
      }
    },
    clearPayments(){
      this.payment_number= "",
      this.payments= []
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
        // Put a Solicitud
        axios
        .put(API_IP+"/request/"+this.obj._id, {
          // Parametros enviados por esta vista
          cantidad_pagos: parseInt(this.payment_number),
          tipo_pago: this.tipo_pago,
          // Parametros enviados para completar el update
          auditoria:this.obj.auditoria,
          clausulas:this.obj.clausulas,
          estado:this.obj.estado,
          _id:this.obj._id,
          numero_solicitud:this.obj.numero_solicitud,
          tipo_solicitud:this.obj.tipo_solicitud,
          fecha_inicio:this.obj.fecha_inicio,
          fecha_final:this.obj.fecha_final,
          valor_solicitud:this.obj.valor_solicitud,
          justificacion:this.obj.justificacion,
          justificacion_adicional:this.obj.justificacion_adicional,
          objetivo_general:this.obj.objetivo_general,
          especificaciones_tecnicas:this.obj.especificaciones_tecnicas,
          obligaciones_especificas:this.obligations,
          rubros:this.obj.rubros,
          trabajadores:this.obj.trabajadores,
          ciudad:this.obj.ciudad
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
              if(this.tipo_pago === 'Fijo'){
                // Post a pagos
                axios
                .post(API_IP+"/payment/", this.payments )
                .then(response => {
                  console.log(response);
                  this.submitting = false;
                  this.$swal({
                    title: 'Exito!',
                    text: 'Se crearon los pagos correctamente',
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                  }).then((result) => {
                    if (result.value) {
                      this.$router.push({ name: 'showrequest', params: { type: this.obj.tipo_solicitud.nombre.toLowerCase() ,id: this.obj._id } });
                    }
                  });
                })
                .catch(error => {
                  console.log(error.response.data.msg);
                  this.$swal({
                    title: 'Error!',
                    text: error.response.data.msg,
                    type: 'error',
                    confirmButtonText: 'Cerrar'
                  });
                  this.submitting = false;
                });
              } else {
                this.submitting = false;
                this.$router.push({ name: 'showrequest', params: { type: this.obj.tipo_solicitud.nombre.toLowerCase() ,id: this.obj._id } });
              }
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
        })
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
