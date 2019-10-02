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
            <form v-on:submit.prevent="saveContinue">
              <div class="form-group" :class="{ 'form-group--error': $v.tipo_solicitud.$error }">
                <div class="row">
                  <div class="col">
                    <label for="interventors">Seleccione tipo de solicitud:</label>
                  </div>
                  <div class="col-6">
                    <multiselect id="box1" v-model.trim="$v.tipo_solicitud.$model" :options="types_request" track-by="_id" label="nombre" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Escoja un tipo de solicitud">
                    </multiselect>
                    <div class="alert alert-danger" role="alert" v-if="$v.tipo_solicitud.$dirty && !$v.tipo_solicitud.required">Es requerido un tipo de solicitud</div>

                  </div>
                </div>
              </div>
              <div class="form-group" :class="{ 'form-group--error': $v.interventor.$error }">
                <div class="row">
                  <div class="col">
                    <label for="interventors">Seleccione interventor:</label>
                  </div>
                  <div class="col-6">
                    <multiselect id="box1" v-model.trim="$v.interventor.$model" :options="personasInterventor" track-by="_id" label="name" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Escoja un interventor">
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
                    <multiselect id="box2" v-model.trim="$v.contratista.$model" :options="personasContratista" track-by="name" label="name" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Escoja un contratista">
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
                    <input type="date" v-model.trim="$v.start_request_date.$model" class="form-control" id="startDate" aria-describedby="startDate" @input="changeEndRequestDate">
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
              <div class="form-group" :class="{ 'form-group--error': $v.total_days.$error }">
                <div class="row justify-content-center">
                  <div class="col-auto">
                    <label for="totalDays">Total en dias:</label>
                  </div>
                  <div class="col-5">
                    <input type="text" v-model.trim="$v.total_days.$model" class="form-control" id="totalDays" aria-describedby="totalDays" placeholder="Total" disabled>
                    <div class="alert alert-danger" role="alert" v-if="$v.total_days.$dirty && !$v.total_days.required">Es requerido un total de dias</div>
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
                  <div class="form-group">
                    <multiselect v-model="clausulas" :options="clauses" :multiple="true" :close-on-select="true" :clear-on-select="false" :hide-selected="true" :preserve-search="true" placeholder="Escoja las clausulas" label="nombre" track-by="_id" :preselect-first="false">
                    </multiselect>
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
                      <multiselect v-model="responsable" :options="personasResponsable" track-by="_id" label="name" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Escoja un interventor">
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
            <br>
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
import {axios,verifyPermits,requestModulePermit,postModulePermit} from '../../../helpers/axios';
import { required } from 'vuelidate/lib/validators'
import CreatePerson from '../../persons/CreatePersonModal.vue'
import CreateClause from '../../clauses/CreateClauseModal.vue'

var API_IP = process.env.VUE_APP_API_IP
const { mapActions, mapState } = Vuex

export default {
  props: ['stp'],
  components: {
    Multiselect,
    'create-person': CreatePerson,
    'create-clause': CreateClause
  },
  data () {
    return {
      types_request:[],
      permitODS:[],
      permitODC:[],
      permitATI:[],
      permitAll:[0,1,2,3,4],

      personasInterventor:[],
      personasContratista:[],
      personasResponsable:[],


      interventoresSelect:[],
      contratistasSelect:[],
      responsablesSelect:[],

      interventor:"",
      contratista:"",
      responsable:"",

      start_request_date:"",
      end_request_date:"",
      total_days:"",

      causals:[],
      clauses:[],


      causal: "",
      clausulas: "",
      clausulas_request:[],
      person_charge:"",
      message:"",
      tipo_solicitud:"",
      trabajadores:[],
      step: this.stp,
      correct_date: false,
      modal_show: false,
      submitting: false
    }
  },
  validations: {
    tipo_solicitud:{required}, interventor:{required}, contratista:{required},
    start_request_date:{required}, end_request_date:{required},
    total_days:{required}, causal:{required}, responsable: {required}
  },
  watch:{
    interventor:function(val){
      this.personasInterventor = this.interventoresSelect.filter(p => p!=this.contratista && p!=this.responsable)
      this.personasContratista = this.contratistasSelect.filter(p => p!=this.interventor && p!=this.responsable)
      this.personasResponsable = this.responsablesSelect.filter(p => p!=this.interventor && p!=this.contratista)
    },
    contratista:function(val){
      this.personasInterventor = this.interventoresSelect.filter(p => p!=this.contratista && p!=this.responsable)
      this.personasContratista = this.contratistasSelect.filter(p => p!=this.interventor && p!=this.responsable)
      this.personasResponsable = this.responsablesSelect.filter(p => p!=this.interventor && p!=this.contratista)
    },
    responsable:function(val){
      this.personasInterventor = this.interventoresSelect.filter(p => p!=this.contratista && p!=this.responsable)
      this.personasContratista = this.contratistasSelect.filter(p => p!=this.interventor && p!=this.responsable)
      this.personasResponsable = this.responsablesSelect.filter(p => p!=this.interventor && p!=this.contratista)
    },

  },
  methods:{

    async loadDataMultiselects(){
      this.permitODS=await verifyPermits(9,this.permitAll)
      this.permitODC=await verifyPermits(10,this.permitAll)
      this.permitATI=await verifyPermits(11,this.permitAll)

      let causalsData=await requestModulePermit(200,0)
      let clausesData=await requestModulePermit(6,0)
      console.log("asdadsad");
      console.log(this.permitODS[2]);
      console.log(this.permitODC[2]);
      console.log(this.permitATI[2]);

      if (!this.permitODS[2] && !this.permitODC[2] && !this.permitATI[2]) {
        alert("no tiene permiso")
      }
      else{
        if (causalsData !== -1  && causalsData!== 0) {
          this.causals = causalsData
        }
        if (clausesData !== -1 && clausesData !== 0) {
          this.clauses = clausesData
        }
        let types_tmp=await requestModulePermit(205,0)
        for (var k in types_tmp){
          if(types_tmp[k].nombre == "ODS" && this.permitODS[2]){
            this.types_request.push(types_tmp[k])
          }
          else if(types_tmp[k].nombre == "ODC" && this.permitODC[2]){
            this.types_request.push(types_tmp[k])
          }
          else if(types_tmp[k].nombre == "ATI" && this.permitATI[2]){
            this.types_request.push(types_tmp[k])
          }
        }
        let allProfesores = await requestModulePermit(206,0,"profesor")
        let allContratistas = await requestModulePermit(206,0,"contratista")
        let allPlanta = await requestModulePermit(206,0,"planta")
        for (var k in allProfesores){
          var person = {}
          person["_id"] = allProfesores[k]._id;
          person["name"] = allProfesores[k].primer_nombre+" "+allProfesores[k].segundo_nombre+" "+allProfesores[k].primer_apellido+" "+allProfesores[k].segundo_apellido;
          this.interventoresSelect.push(person);
          this.responsablesSelect.push(person);
        }
        for (var k in allContratistas){
          var person = {}
          person["_id"] = allContratistas[k]._id;
          person["name"] = allContratistas[k].primer_nombre+" "+allContratistas[k].segundo_nombre+" "+allContratistas[k].primer_apellido+" "+allContratistas[k].segundo_apellido;
          this.interventoresSelect.push(person);
          this.responsablesSelect.push(person);
          this.contratistasSelect.push(person);
        }
        for (var k in allPlanta){
          var person = {}
          person["_id"] = allPlanta[k]._id;
          person["name"] = allPlanta[k].primer_nombre+" "+allPlanta[k].segundo_nombre+" "+allPlanta[k].primer_apellido+" "+allPlanta[k].segundo_apellido;
          this.interventoresSelect.push(person);
          this.responsablesSelect.push(person);
        }
        this.personasInterventor = this.interventoresSelect
        this.personasContratista = this.contratistasSelect
        this.personasResponsable = this.responsablesSelect
      }
    },

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
        this.submitting = true
        for(var k in this.clausulas){
          this.clausulas_request.push(this.clausulas[k]._id)
        }

        let data = {
          numero_solicitud: "",
          tipo_solicitud:this.tipo_solicitud._id,
          fecha_inicio:this.start_request_date,
          fecha_final: this.end_request_date,
          valor_solicitud:0,
          justificacion:"",
          justificacion_adicional:"",
          causal_seleccion:this.causal._id,
          objetivo_general:"",
          clausulas:this.clausulas_request,
          especificaciones_tecnicas:[],
          obligaciones_especificas:[],
          rubros:[],
          trabajadores:[{persona:this.contratista._id,tipo:"Contratista"},{persona:this.interventor._id,tipo:"Interventor"},{persona:this.responsable._id,tipo:"Responsable"}]
        }

        let res;

        if (this.tipo_solicitud.nombre == "ODS" && this.permitODS[2]) {
          res=await postModulePermit(9,2,data)
        }
        else if (this.tipo_solicitud.nombre == "ODC" && this.permitODC[2]) {
          res=await postModulePermit(10,2,data)
        }
        else if (this.tipo_solicitud.nombre == "ATI" && this.permitATI[2]) {
          res=await postModulePermit(11,2,data)
        }

        if (res != undefined && res != null){
          if (res.res) {console.log(res.res.obj.data);
            this.$swal({
              title: 'Exito!',
              text: 'Se creo la solicitud con exito.',
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
    //     this.submitting = true
    //     for(var k in this.clausulas){
    //       this.clausulas_request.push(this.clausulas[k]._id)
    //     }
    //     axios
    //     .post(API_IP+"/request", {
    //       numero_solicitud: "",
    //       tipo_solicitud:this.tipo_solicitud._id,
    //       fecha_inicio:this.start_request_date,
    //       fecha_final: this.end_request_date,
    //       valor_solicitud:0,
    //       justificacion:"",
    //       justificacion_adicional:"",
    //       causal_seleccion:this.causal._id,
    //       objetivo_general:"",
    //       clausulas:this.clausulas_request,
    //       especificaciones_tecnicas:[],
    //       obligaciones_especificas:[],
    //       rubros:[],
    //       trabajadores:[{persona:this.contratista._id,tipo:"Contratista"},{persona:this.interventor._id,tipo:"Interventor"},{persona:this.person_charge._id,tipo:"Responsable"}]
    //     })
    //     .then(response => {
    //       console.log(response);
    //       this.$swal({
    //         title: 'Exito!',
    //         text: 'Se creo la solicitud con exito.',
    //         type: 'success',
    //         confirmButtonText: 'Aceptar'
    //       }).then((result) => {
    //         if (result.value) {
    //           this.$emit('saveObject',response.data);
    //           this.submitting = false;
    //           this.step++
    //           this.$emit('nextStep', this.step)
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
    // // Modal para la creación de personas
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
  mounted(){
    this.loadDataMultiselects()
  }
}
</script>
