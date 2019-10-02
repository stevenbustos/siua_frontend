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
                <multiselect id="box2" v-model.trim="$v.place.$model" :options="cities"  :searchable="false" :close-on-select="true" :show-labels="true" label="nombre" placeholder="Escoja un lugar">
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
import {axios,requestModulePermit,requestIdModulePermit,putModulePermit,verifyPermits} from '../../../helpers/axios';
import { required } from 'vuelidate/lib/validators'
var API_IP = process.env.VUE_APP_API_IP

export default {
  props: ['stp','object'],
  components: {
    Multiselect
  },
  data () {
    return {
      numMod:"",
      permitAll:[0,1,2,3,4],
      justification: '',
      aditional_justification:'',
      general_objective:'',
      place:'',
      cities: [],
      permitsRequest:[],
      step: this.stp,
      obj:this.object,
      request_type: "",
      submitting: false,
      no_aditional_justification: true
    }
  },
  validations: {
    justification: {required},
    general_objective: {required}, place: {required},
  },
  mounted () {
    this.loadData()
    this.aditionalJustificationStatus()
  },
  methods:{
    async loadData(){
      let tipo = await requestIdModulePermit(205,1,this.obj.tipo_solicitud)
      if (tipo.nombre === "ODS") {
        this.numMod = 9
        this.permitsRequest=await verifyPermits(9,this.permitAll)
      }
      else if (tipo.nombre === "ODC") {
        this.numMod = 10
        this.permitsRequest=await verifyPermits(10,this.permitAll)
      }
      else if (tipo.nombre === "ATI") {
        this.numMod = 11
        this.permitsRequest=await verifyPermits(11,this.permitAll)
      }
      this.cities = await requestModulePermit(201,0)
    },
    aditionalJustificationStatus(){
      var curYear = new Date();
      var endYear = new Date();
      var yyyy = curYear.getFullYear();
      curYear = yyyy;
      endYear = this.obj.fecha_final.substring(0,4);
      if ( endYear > curYear ){
        this.no_aditional_justification = false
      } else {
        this.no_aditional_justification = true
      }
    },
    async saveContinue(){
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$swal({
          title: 'Error!',
          text: 'Debe llenar campos necesarios en el formulario',
          type: 'error',
          confirmButtonText: 'Cerrar'
        });
      } else {
        if (this.permitsRequest[3]) {
          this.submitting = true;
          let data={
            auditoria:this.obj.auditoria,
            clausulas:this.obj.clausulas,
            estado:this.obj.estado,
            _id:this.obj._id,
            numero_solicitud:this.obj.numero_solicitud,
            tipo_solicitud:this.obj.tipo_solicitud,
            fecha_inicio:this.obj.fecha_inicio,
            fecha_final:this.obj.fecha_final,
            valor_solicitud:this.obj.valor_solicitud,
            justificacion:this.justification,
            justificacion_adicional:this.aditional_justification,
            objetivo_general:this.general_objective,
            especificaciones_tecnicas:this.obj.especificaciones_tecnicas,
            obligaciones_especificas:this.obj.obligaciones_especificas,
            rubros:this.obj.rubros,
            trabajadores:this.obj.trabajadores,
            ciudad:this.place
          }

          let res = await putModulePermit(this.numMod,3,this.obj._id,data)
          if (res != undefined && res != null){
            if (res.res) {
              this.$swal({
                title: 'Exito!',
                text: 'Se actualizo la solicitud con exito.',
                type: 'success',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                if (result.value) {
                  this.$emit('saveObject',res);
                  this.submitting = false;
                  this.step++
                  this.$emit('nextStep', this.step)
                }
              });
            }
            else if (res.error) {
              this.$swal({
                 title: 'Error!',
                 text: res.error.error.msg,
                 type: 'error',
                 confirmButtonText: 'Cerrar'
               });
               this.submitting = false;
            }
          }

        }
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
