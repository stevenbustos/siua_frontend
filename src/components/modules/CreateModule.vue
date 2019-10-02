<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/modulos">Módulos</a></li>
            <li class="breadcrumb-item active" aria-current="page">Crear Módulo</li>
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
                <div class="form-group" :class="{ 'form-group--error': $v.module_name.$error }">
                  <label for="moduleName">Nombre del módulo:</label>
                  <input type="text" v-model.trim="$v.module_name.$model" class="form-control" id="moduleName" aria-describedby="moduleName" placeholder="Nombre">
                  <div class="alert alert-danger" role="alert" v-if="$v.module_name.$dirty && !$v.module_name.required">Es requerido un nombre</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.module_description.$error }">
                  <label for="moduleDescription">Descripción:</label>
                  <textarea v-model.trim="$v.module_description.$model" class="form-control" aria-label="moduleDescription"
                    placeholder="Descripción" :rows="6" :max-rows="10"></textarea>
                    <div class="alert alert-danger" role="alert" v-if="$v.module_description.$dirty && !$v.module_description.required">Es requerida una descripción</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.module_permits.$error }">
                  <label for="modulePermits">Permisos del módulo:</label>
                  <multiselect v-model.trim="$v.module_permits.$model" :options="permits" :multiple="true" :close-on-select="true" :clear-on-select="false" :hide-selected="true" :preserve-search="true" placeholder="Seleccione los permisos del módulo" label="name" track-by="_id" :preselect-first="false">
                  </multiselect>
                  <div class="alert alert-danger" role="alert" v-if="$v.module_permits.$dirty && !$v.module_permits.required">Es requerido mínimo un permiso</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.module_code.$error }">
                  <label for="moduleCode">Código del módulo:</label>
                  <input type="number" v-model.trim="$v.module_code.$model" class="form-control" id="moduleCode" aria-describedby="moduleCode" placeholder="Código">
                  <div class="alert alert-danger" role="alert" v-if="$v.module_code.$dirty && !$v.module_code.required">Es requerido un código</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.module_state.$error }">
                  <label for="moduleState">Estado del módulo:</label>
                  <multiselect v-model.trim="$v.module_state.$model" :options="states" track-by="name" label="name" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Escoja un estado">
                  </multiselect>
                  <div class="alert alert-danger" role="alert" v-if="$v.module_state.$dirty && !$v.module_state.required">Es requerido un estado</div>
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
      module_permits: [],
      mod_permits: [],
      module_state: "",
      module_name: "",
      permits: [],
      states: [
        { name: "Activo", activo: "true" },
        { name: "Inactivo", activo: "false" }
      ],
      module_description: "",
      module_code: "",
      submitting: false
    }
  },
  validations: {
    module_state: {
      required
    },
    module_name: {
      required
    },
    module_description: {
      required
    },
    module_code: {
      required
    },
    module_permits: {
      required
    }
  },
  mounted () {
    axios
    .get(API_IP+"/permit/")
    .then(response => {
      for(var k in response.data.data){
        var per = {}
        if(response.data.data[k].activo == true ){
          per["name"] = response.data.data[k].nombre;
          per["_id"] = response.data.data[k]._id;
          this.permits.push(per);
        }
      }
    });
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
        .post(API_IP+"/module/", {
          activo: this.module_state.activo,
          nombre: this.module_name,
          descripcion: this.module_description,
          codigo: parseInt(this.module_code),
          permisos: this.module_permits
        })
        .then(response => {
          console.log(response);
          this.$swal({
            title: 'Exito!',
            text: 'Se creo el módulo satisfactoriamente.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.value) {
              this.submitting = false;
              this.$router.push({ name: 'modules' });
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
              this.$router.push({ name: 'modules' });
            }
          });
        }
      });
    }
  }
}
</script>
