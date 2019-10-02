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
        <div class="card text-center" style="background-color: rgba(255, 255, 255, 0.4);">
          <div class="card-body">
            <h1 class="card-title">Obligaciones específicas del contratista.</h1>
            <p class="card-text">NOTA: Deben ser puntuales y estar directamente relacionadas con el objeto general a ejecutar.</p>
          </div>
        </div>
        <div>&nbsp;</div>
        <form v-on:submit.prevent="saveContinue" novalidate>
          <div v-for="(ob, index) in $v.obligations.$each.$iter" :key="index" class="row">
            <div class="col">
              <div class="form-group" :class="{ 'form-group--error': $v.$error }">
                <label for="description">Descripción:</label>
                <textarea v-model="ob.descripcion.$model" class="form-control" aria-label="description"
                placeholder="Descripción" :rows="6" :max-rows="10" @input="changeObligations"></textarea>
                <div class="alert alert-danger" role="alert" v-if="ob.descripcion.$dirty && !ob.descripcion.required">Es requerida una fecha de inicio</div>
              </div>
            </div>
            <div class="col">
              <div class="form-group" :class="{ 'form-group--error': $v.$error }">
                <label for="number">Número:</label>
                <input :value="ob.numero.$model = parseInt(index)+1" type="number" class="form-control" id="number" aria-describedby="number" placeholder="Número" @input="changeObligations" disabled>
                <div class="alert alert-danger" role="alert" v-if="ob.numero.$dirty && !ob.numero.required">Es requerida una fecha de inicio</div>
              </div>
              <button type="button" v-if="obligations.length > 1" class="btn btn-primary" v-on:click="delForm(index)" style="background:#003e1e;border-color:#003e1e;">
                Quitar obligación especifica
              </button>
            </div>
          </div>
          <button type="button" class="btn btn-primary" v-on:click="addForm" style="background:#003e1e;border-color:#003e1e;">
            Añadir obligación especifica
          </button>
          <div>&nbsp;</div>
          <div class="row">
            <div class="col-md-8 offset-md-2">
              <div class="card" style="background-color: rgba(0, 0, 255, 0.2;">
                <div class="card-body">
                  <h1 class="card-title text-center">Nota:</h1>
                  <p class="card-text">
                    <ul>
                      <li>
                        La solicitud debe tener mínimo una obligación especifica.
                      </li>
                      <li>
                        En el reporte se mantendra las primeras 5  obligaciones, las demás se presentaran en una hoja como anexo.
                      </li>
                    </ul>
                  </p>
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
</template>

<script>
import {axios,verifyPermits,putModulePermit} from '../../../helpers/axios';
import { required } from 'vuelidate/lib/validators'
var API_IP = process.env.VUE_APP_API_IP

export default {
  props: ['stp', 'object'],
  data () {
    return {
      numMod:"",
      permitAll:[0,1,2,3,4],
      permitsRequest:[],
      obligations: [{
        descripcion: '',
        numero: ''
      }],
      step: this.stp,
      obj:this.object,
      submitting: false
    }
  },
  validations: {
    obligations: {
      required,
      $each: {
        descripcion: { required },
        numero: { required }
      }
    }
  },
  mounted(){
    this.loadData()
  },
  methods: {
    async loadData(){
      let tipo = this.obj.tipo_solicitud
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
    },
    addForm() {
      let newObject = {
        descripcion: '',
        numero: ''
      }
      this.obligations.push(newObject)
    },
    delForm(index) {
      this.obligations.splice(index,1)
    },
    changeObligations(){
      this.$emit('changeObliga', this.obligations);
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
          let data = {
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
