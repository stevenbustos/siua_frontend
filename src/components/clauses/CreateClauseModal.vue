<template>
  <div id="modal">
    <div class="container-fluid">
      <v-dialog/>
      <div style="margin:10px;background-color:rgba(255, 255, 255, 0.7);">
        <div class="row justify-content-center">
          <div class="col-5 align-self-center" style="margin:10px">
            <form @submit.prevent="submit">
              <div class="form-group" :class="{ 'form-group--error': $v.clause_name.$error }">
                <label for="clauseName">Nombre:</label>
                <input v-model.trim="$v.clause_name.$model" type="text" class="form-control" id="clauseName" aria-describedby="clauseName" placeholder="Nombre">
                <div class="alert alert-danger" role="alert" v-if="$v.clause_name.$dirty && !$v.clause_name.required">Es requerido el nombre de la clausula</div>
              </div>
              <div class="form-group" :class="{ 'form-group--error': $v.clause_description.$error }">
                <label for="clauseDescription">Descripción:</label>
                <textarea v-model.trim="$v.clause_description.$model" class="form-control" aria-label="clauseDescription"
                placeholder="Descripción" :rows="6" :max-rows="10"></textarea>
                <div class="alert alert-danger" role="alert" v-if="$v.clause_description.$dirty && !$v.clause_description.required">Es requerida la descripción de la clausula</div>
              </div>
              <div>&nbsp;</div>
              <div class="row justify-content-center">
                <div class="col-4 text-center">
                  <button class="btn btn-primary" type="submit" style="background:#003e1e;border-color:#003e1e;">
                    <font-awesome-icon icon="save" size="lg"></font-awesome-icon>
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
</template>

<script>
import Multiselect from 'vue-multiselect'
import {axios} from '../../helpers/axios';
import { required } from 'vuelidate/lib/validators'
var API_IP = process.env.VUE_APP_API_IP

export default {
  props: ['hide_modal'],
  components: {
    Multiselect
  },
  data () {
    return {
      clause_name: "",
      clause_description: "",
      submitting: false,
      hide: this.hide_modal
    }
  },
  validations: {
    clause_name: {
      required
    },
    clause_description: {
      required
    }
  },
  methods : {
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
        this.submitting = true
        axios
        .post(API_IP+"/clause", {
          nombre: this.clause_name,
          descripcion: this.clause_description
        })
        .then(response => {
          console.log(response);
          this.$swal({
            title: 'Exito!',
            text: "Se creo la clausula correctamente",
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
