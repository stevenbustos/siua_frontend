<template>
  <div id="modal">
    <div class="container-fluid">
      <div style="margin:10px;background-color:rgba(255, 255, 255, 0.7);">
        <div class="row justify-content-center">
          <div class="col-6 align-self-center" style="margin:10px">
            <div class="row justify-content-center">
              <div class="col-12 align-self-center">
                <form @submit.prevent="submit" novalidate>
                  <div>
                    <div class="row">
                      <div class="col">
                        <div class="form-group" :class="{ 'form-group--error': $v.valor.$error }">
                          <label for="personName">Valor:</label>
                          <div class="form-group">
                            <input v-model.trim="$v.valor.$model" type="number" class="form-control" id="payment_value" aria-describedby="paymentValue" placeholder="Valor">
                            <div class="alert alert-danger" role="alert" v-if="$v.valor.$dirty && !$v.valor.required">Es requerido un valor</div>
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group" :class="{ 'form-group--error': $v.fecha.$error }">
                          <label for="personName">Fecha:</label>
                          <div class="form-group">
                            <input v-model.trim="$v.fecha.$model" type="date" class="form-control" id="payment_date" aria-describedby="paymentDate">
                            <div class="alert alert-danger" role="alert" v-if="$v.fecha.$dirty && !$v.fecha.required">Es requerido una fecha</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label for="personName">No. de planilla:</label>
                          <div class="form-group">
                            <input  type="number" v-model="planilla_numero" class="form-control" id="payment_number" aria-describedby="payment_number">
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group" :class="{ 'form-group--error': $v.planilla_fecha.$error }">
                          <label for="personName">Fecha de pago de planilla:</label>
                          <div class="form-group">
                            <input v-model.trim="$v.planilla_fecha.$model" type="date" class="form-control" id="payment_planilladate" aria-describedby="paymentPlanilladate">
                            <div class="alert alert-danger" role="alert" v-if="$v.planilla_fecha.$dirty && !$v.planilla_fecha.required">Es requerido una fecha</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="row justify-content-center">
                      <div class="col-10">
                        <div class="form-group">
                          <label for="personName">ORPA:</label>
                          <div class="form-group">
                            <input v-model="numero_ORPA" type="number" class="form-control" id="payment_ORPA" aria-describedby="paymentORPA" placeholder="ORPA">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>&nbsp;</div>
                  <div class="row justify-content-center">
                    <div class="col-4 text-center">
                      <button class="btn btn-primary" type="submit" :disabled="submitting" style="background:#003e1e;border-color:#003e1e;">
                        <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                        Crear nuevo
                      </button>
                    </div>
                    <div class="col-4 text-center">
                      <button class="btn btn-primary" type="button" @click="close()" style="background:#003e1e;border-color:#003e1e;">
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
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import {axios} from '../../helpers/axios';
import { required, requiredIf } from 'vuelidate/lib/validators'
var API_IP = process.env.VUE_APP_API_IP

export default {
  props: ['hide_modal','id_pay'],
  components: {
    Multiselect
  },
  data () {
    return {
      id:"",
      estado:"",
      numero:"",
      fecha:"",
      valor:"",
      solicitud:"",
      planillas:[],
      planilla_fecha:"",
      planilla_numero:"",
      numero_ORPA:"",
      auditoria:"",
      submitting: false,
      hide: this.hide_modal
    }
  },
  validations: {
    valor: { required },
    fecha: { required },
    planilla_fecha: {
      required: requiredIf(function (){
        return this.planilla_numero !== ""
      })
    }
  },
  mounted () {
    axios
    .get(API_IP+'/payment/'+this.id_pay)
    .then(response => {
      this.numero = response.data.data.numero
      this.id = response.data.data._id
      this.valor = response.data.data.valor
      this.fecha = (response.data.data.fecha!== null && response.data.data.fecha!== undefined )? response.data.data.fecha.substring(0,10): response.data.data.fecha
      if(response.data.data.planillas[0] !== null && response.data.data.planillas[0] !== undefined){
        this.planillas = response.data.data.planillas
        this.planilla_numero = response.data.data.planillas[0].planilla_numero
        this.planilla_fecha = (response.data.data.planillas[0].planilla_fecha !== undefined && response.data.data.planillas[0].planilla_fecha!== null) ? response.data.data.planillas[0].planilla_fecha.substring(0,10) : response.data.data.planillas[0].planilla_fecha;
      }
      this.numero_ORPA = response.data.data.numero_ORPA
      this.solicitud = response.data.data.solicitud
      this.auditoria = response.data.data.auditoria
      this.estado = response.data.data.estado
    });
  },
  methods : {
    clearTypes(){
      this.student_program= "",
      this.teacher_type= "",
      this.teacher_ocupation= "",
      this.plant_appoiment="",
      this.ods_number=""
    },
    submit() {
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
        var payData= {}
        payData['auditoria']= this.auditoria
        payData['valor']= this.valor
        payData['fecha']= this.fecha
        payData['planillas']= [{ planilla_numero:this.planilla_numero, planilla_fecha: this.planilla_fecha }]
        payData['numero_ORPA']= this.numero_ORPA
        payData['estado']= this.estado
        axios
        .put(API_IP+'/payment/'+this.id_pay, payData)
        .then(response => {
          console.log(response);
          this.$swal({
            title: 'Exito!',
            text: 'Se creo el pago satisfactoriamente.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.value) {
              this.submitting = false;
              this.hide = true;
              this.$emit('modalShow',this.hide)
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
    close() {
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
              this.hide = true;
              this.$emit('modalShow',this.hide);
            }
          });
        }
      });
    }
  }
}
</script>

<style>
#modal {
  /* background-color: gray; */
  background-image: url("/assets/images/fondo.jpg");
  background-size: 100%;
  /* Full height */
  height: 100%;
  /* width: 100%; */
  /* Center and scale the image nicely */
  /* background-position: center; */
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
