<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/roles">Roles</a></li>
            <li class="breadcrumb-item active" aria-current="page">Crear Rol</li>
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
                <div class="form-group" :class="{ 'form-group--error': $v.rol_name.$error }">
                  <label for="rolName">Nombre del rol:</label>
                  <input v-model.trim="$v.rol_name.$model" type="text" class="form-control" id="rolName" aria-describedby="rolName" placeholder="Nombre">
                  <div class="alert alert-danger" role="alert" v-if="$v.rol_name.$dirty && !$v.rol_name.required">Es requerido un nombre</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.rol_mod.$error }">
                  <label for="rolModules">Modulos del rol:</label>
                  <multiselect v-model.trim="$v.rol_mod.$model" :options="modules" :multiple="true" :close-on-select="true" :clear-on-select="false" :hide-selected="true" :preserve-search="true" placeholder="Seleccione los modulos" label="name" track-by="_id" :preselect-first="false">
                  </multiselect>
                  <div class="alert alert-danger" role="alert" v-if="$v.rol_mod.$dirty && !$v.rol_mod.required">Es requerido minimo un modúlo</div>
                </div>
                <div v-for='(module, index) in rol_mod' :key='index' class="form-group">
                  <label for="rolModules">Permisos de {{module.name}}</label>
                  <multiselect v-model="module.permisos" :options="module.permits" :multiple="true" :close-on-select="true" :clear-on-select="false" :hide-selected="true" :preserve-search="true" placeholder="Seleccione los permisos del modulo" label="name" track-by="_id" :preselect-first="false">
                  </multiselect>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.rol_state.$error }">
                  <label for="rolStates">Estado del rol:</label>
                  <multiselect v-model.trim="$v.rol_state.$model" :options="states" track-by="name" label="name" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Escoja un estado">
                  </multiselect>
                  <div class="alert alert-danger" role="alert" v-if="$v.rol_state.$dirty && !$v.rol_state.required">Es requerido un estado</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.rol_description.$error }">
                  <label for="rolDescription">Descripción:</label>
                  <textarea v-model.trim="$v.rol_description.$model" class="form-control" aria-label="rolDescription"
                  placeholder="Descripción" :rows="6" :max-rows="10"></textarea>
                  <div class="alert alert-danger" role="alert" v-if="$v.rol_description.$dirty && !$v.rol_description.required">Es requerida una descripción</div>
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
      modules: [],
      permits: [],
      rol_name: "",
      rol_state: "",
      states: [
        { name: "Activo", activo: "true" },
        { name: "Inactivo", activo: "false" }
      ],
      rol_description: '',
      rol_mod: [],
      submitting: false
    }
  },
  validations: {
    rol_name: {
      required
    },
    rol_state: {
      required
    },
    rol_description: {
      required
    },
    rol_mod: {
      required
    }
  },
  mounted () {
    axios
    .get(API_IP+"/module/")
    .then(response => {
      for(var k in response.data.data){
        var mod = {}
        if(response.data.data[k].activo == true ){
          mod["_id"] = response.data.data[k]._id;
          mod["name"] = response.data.data[k].nombre;
          mod["permits"] = [];
          for (var j in response.data.data[k].permisos){
            var per = {}
            if(response.data.data[k].activo == true ){
              per["_id"] = response.data.data[k].permisos[j]._id;
              per["name"] = response.data.data[k].permisos[j].nombre;
              mod["permits"].push(per);
            }
          }
          this.modules.push(mod);
        }
      }
    });
  },
  methods: {
    submit(){
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
        .post(API_IP+"/rol/", {
          activo: this.rol_state.activo,
          nombre: this.rol_name,
          descripcion: this.rol_description,
          modulos: this.rol_mod
        })
        .then(response => {
          console.log(response);
          this.$swal({
            title: 'Exito!',
            text: 'Se creo el rol satisfactoriamente.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.value) {
              this.submitting = false;
              this.$router.push({ name: 'roles' });
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
              this.$router.push({ name: 'roles' });
            }
          });
        }
      });
    }
  }
}
</script>
