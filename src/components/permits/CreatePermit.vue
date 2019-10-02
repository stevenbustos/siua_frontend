<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/permisos">Permisos</a></li>
            <li class="breadcrumb-item active" aria-current="page">Crear nuevo permiso</li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-md-8 offset-md-2" style="margin-bottom:80px;">
          <div class="row">
            <div class="col">
              <button class="btn btn-primary" type="button" @click="cancel()" style="background:#003e1e;border-color:#003e1e;">
                <font-awesome-icon icon="arrow-left" size="lg"></font-awesome-icon>
              </button>
            </div>
          </div>
          <div>&nbsp;</div>
          <div class="row justify-content-center">
            <div class="col-5 align-self-center">
              <form @submit.prevent="submit" novalidate>
                <div class="form-group" :class="{ 'form-group--error': $v.permit_name.$error }">
                  <label for="permitName">Nombre del permiso:</label>
                  <input type="text" v-model.trim="$v.permit_name.$model" class="form-control" id="permitName" aria-describedby="permitName" placeholder="Nombre">
                  <div class="alert alert-danger" role="alert" v-if="$v.permit_name.$dirty && !$v.permit_name.required">Es requerido un nombre</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.permit_description.$error }">
                  <label for="permitDescription">Descripción:</label>
                  <textarea v-model.trim="$v.permit_description.$model" class="form-control" aria-label="permitDescription"
                  placeholder="Descripción" :rows="6" :max-rows="10"></textarea>
                  <div class="alert alert-danger" role="alert" v-if="$v.permit_description.$dirty && !$v.permit_description.required">Es requerido una descripción</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.permit_code.$error }">
                  <label for="permitCode">Código del permiso:</label>
                  <input type="number" v-model.trim="$v.permit_code.$model" class="form-control" id="permitCode" aria-describedby="permitCode" placeholder="Código">
                  <div class="alert alert-danger" role="alert" v-if="$v.permit_code.$dirty && !$v.permit_code.required">Es requerido un código</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.permit_state.$error }">
                  <label for="permitStates">Estado del permiso:</label>
                  <multiselect v-model.trim="$v.permit_state.$model" :options="states" track-by="name" label="name" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Escoja un estado">
                  </multiselect>
                  <div class="alert alert-danger" role="alert" v-if="$v.permit_state.$dirty && !$v.permit_state.required">Es requerido un estado</div>
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
                    <button type="button" @click="cancel()" class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;">
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
</template>

<script>
import Multiselect from 'vue-multiselect'
import {axios} from '../../helpers/axios';
import { required } from 'vuelidate/lib/validators'
var API_IP = process.env.VUE_APP_API_IP

export default {
  components: {
    Multiselect
  },
  data () {
    return {
      permit_state: "",
      permit_description: '',
      permit_name: "",
      states: [
        { name: "Activo", activo: "true" },
        { name: "Inactivo", activo: "false" }
      ],
      permit_code: "",
      submitting: false
    }
  },
  validations: {
    permit_state: {
      required
    },
    permit_description: {
      required
    },
    permit_name: {
      required
    },
    permit_code: {
      required
    }
  },
  methods: {
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
        axios
        .post(API_IP+"/permit/", {
          activo: this.permit_state.activo,
          nombre: this.permit_name,
          descripcion: this.permit_description,
          codigo: parseInt(this.permit_code)
        })
        .then(response => {
          console.log(response);
          this.$swal({
            title: 'Exito!',
            text: 'Se creo el permiso satisfactoriamente.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.value) {
              this.submitting = false;
              this.$router.push({ name: 'permits' });
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
              this.$router.push({ name: 'permits' });
            }
          });
        }
      });
    }
  }
}
</script>
