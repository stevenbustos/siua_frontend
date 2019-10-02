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
        <v-dialog/>
        <div class="row justify-content-center">
          <div class="col-10 align-self-center">
            <form v-on:submit.prevent="saveContinue" novalidate>
              <div class="form-group" :class="{ 'form-group--error': $v.tipo_pago.$error }">
                <div class="row">
                  <div class="col-auto">
                    <label for="payment_type">Forma de pago:</label>
                  </div>
                  <div class="col-6">
                    <multiselect @input="clearPayments(tipo_pago)" v-model.trim="$v.tipo_pago.$model" :options="payment_types" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Seleccione un tipo de pago">
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
                          {{payment.$model.numero}}
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
  props: ['stp', 'value'],
  components: {
    Multiselect
  },
  data () {
    return {
      payment_types: ["Fijo","Variable"],
      step: this.stp,
      tipo_pago: "",
      payment_number: "",
      valor_solicitud: "",
      payments: [],
      submitting: false,
      request_payments: []
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
  mounted () {
    axios
    .get(API_IP+'/request/'+this.$route.params.id)
    .then(response => {
      // Parametros necesarios en esta vista
      this.payment_number = response.data.data.cantidad_pagos,
      this.tipo_pago = response.data.data.tipo_pago,
      // Necesarios para hacer el PUT
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
      this.valor_solicitud = response.data.data.valor_solicitud
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
      axios.
      get(API_IP+"/payment/",{params:this.$route.params.id})
      .then(response => {
        for(var k in response.data){
          for(var j in response.data[k]){
            console.log(response.data[k][j]);
            var payment = {}
            payment["solicitud"] = response.data[k][j].solicitud._id
            payment["valor"] = response.data[k][j].valor
            payment["fecha"] = response.data[k][j].fecha.substring(0,10);
            payment["numero"] = response.data[k][j].numero
            // payment["auditoria"] = response.data[k][j].auditoria
            payment["estado"] = response.data[k][j].estado
            // payment["planillas"] = response.data[k][j].planillas
            payment["_id"] = response.data[k][j]._id
            this.request_payments.push(payment);
            this.payments.push(payment);
          }
        }
        this.requestValueChange();
      });
    });
  },
  methods: {
    requestValueChange(){
      if (this.value !== this.valor_solicitud){
        for(var k in this.request_payments){
          axios
          .delete(API_IP+'/payment/'+this.request_payments[k]._id)
          .then(response => {
            console.log(response);
            this.$swal({
              title: 'Atención!',
              html: 'Como el valor de la solicitud cambio<br>Se borraron los pagos relacionados con la solicitud.',
              type: 'success',
              confirmButtonText: 'Aceptar'
            })
          })
          .catch(error => {
            console.log(error);
            this.$swal({
              title: 'Error!',
              text: error.response.data.msg,
              type: 'error',
              confirmButtonText: 'Cerrar'
            });
          });
        }
        this.payment_number= "",
        this.payments= []
      }
    },
    addPay(){
      this.payments = []
      var payment_value = (this.valor_solicitud)/(this.payment_number)
      if( this.tipo_pago == "Variable"){
        payment_value = ""
      }
      for (var i = 0; i < parseInt(this.payment_number); i++) {
        this.payments.push({
          solicitud: this.request_id,
          valor: payment_value,
          fecha: "",
          numero: i+1
        })
      }
    },
    deletePayments(){
      for(var k in this.request_payments){
        axios
        .delete(API_IP+'/payment/'+this.request_payments[k]._id)
        .then(response => {
          console.log(response);
          this.$swal({
            title: 'Exito!',
            text: 'Se borraron los pagos correctamente',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        })
        .catch(error => {
          console.log(error);
          this.$swal({
            title: 'Error!',
            text: error.response.data.msg,
            type: 'error',
            confirmButtonText: 'Cerrar'
          });
        });
      }
    },
    clearPayments(tipo_pago){
      if(tipo_pago == "Variable"){
        this.$swal({
          title: 'Espere!',
          html: '¿Esta seguro que quiere cambiar el tipo de pago?<br>Al cambiar de fijo a variable se borraran los pagos ya creados de la solicitud',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.value) {
            this.deletePayments();
            this.payment_number= "",
            this.payments= []
          } else {
            this.tipo_pago = "Fijo"
          }
        });
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
        this.submitting = true;
        // Put a Solicitud
        axios
        .put(API_IP+"/request/"+this.$route.params.id, {
          // Parametros enviados por esta vista
          cantidad_pagos: parseInt(this.payment_number),
          tipo_pago: this.tipo_pago,
          // Parametros enviados para completar el update
          auditoria: this.request_auditoria,
          clausulas: this.clausulas,
          estado: this.request_state,
          _id: this.request_id,
          numero_solicitud:this.request_number,
          tipo_solicitud:this.tipo_solicitud,
          fecha_inicio:this.start_request_date,
          fecha_final:this.end_request_date,
          valor_solicitud:this.valor_solicitud,
          justificacion:this.justificacion,
          justificacion_adicional:this.aditional_justification,
          objetivo_general:this.general_objective,
          especificaciones_tecnicas:this.request_especifications,
          obligaciones_especificas:this.request_obligations,
          rubros:this.request_budget,
          trabajadores:this.trabajadores,
          ciudad:this.place
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
              this.deletePayments();
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
                      this.$router.push({ name: 'showrequest', params: { type: this.tipo_solicitud.nombre.toLowerCase() ,id: this.request_id } });
                    }
                  });
                })
                .catch(error => {
                  console.log(error);
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
                this.$router.push({ name: 'showrequest', params: { type: this.tipo_solicitud.nombre.toLowerCase() ,id: this.request_id } });
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
              this.$emit('prevStep', this.step);
            }
          });
        }
      });
    }
  }
}
</script>
