<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/roles">Roles</a></li>
            <li class="breadcrumb-item"><a v-bind:href="rol_url">{{rol_name}}</a></li>
            <li class="breadcrumb-item active" aria-current="page">Editar Rol</li>
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
                <div class="form-group">
                  <label for="rolName">Nombre del rol:</label>
                  <input type="text" class="form-control" id="rolName" aria-describedby="rolName" :placeholder="rol_name" readonly>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.rol_mod.$error }">
                  <label for="rolModules">Modulos del rol:</label>
                  <multiselect v-model.trim="$v.rol_mod.$model" :options="modules" :multiple="true" :close-on-select="true" :clear-on-select="false" :hide-selected="true" :preserve-search="true" placeholder="Seleccione los modulos" label="name" track-by="_id" :preselect-first="false">
                  </multiselect>
                  <div class="alert alert-danger" role="alert" v-if="$v.rol_mod.$dirty && !$v.rol_mod.required">Es requerido minimo un modúlo</div>
                </div>
                <div v-for='(module, index) in rol_mod' :key='index' class="form-group">
                  <label for="rolModules">Permisos de {{module.name}}</label>
                  <multiselect v-model="module.permisos" :options="permit_options[module.modulo]" :multiple="true" :close-on-select="true" :clear-on-select="false" :hide-selected="true" :preserve-search="true" placeholder="Seleccione los permisos del modulo" label="name" track-by="_id" :preselect-first="false">
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
                      <font-awesome-icon icon="save" size="lg"></font-awesome-icon>
                      Guardar
                    </button>
                  </div>
                  <div class="col-4 text-center">
                    <button type="button" @click="cancel()" class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;">
                      <font-awesome-icon icon="times-circle" size="lg"></font-awesome-icon>
                      Cancelar
                    </button>
                  </div>
                </div>
                <div>&nbsp;</div>
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
      permit_options: {},
      rol_auditoria: {},
      modules: [],
      permits: [],
      rol_name: "",
      rol_state: "",
      rol_state_get: "",
      rol_description: '',
      states: [
        { name: "Activo", activo: "true" },
        { name: "Inactivo", activo: "false" }
      ],
      rol_mod: [],
      rol_url: "",
      submitting: false
    }
  },
  validations: {
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
          mod["_id"] = response.data.data[k]._id
          mod["name"] = response.data.data[k].nombre;
          mod["permits"] = [];
          mod["modulo"] = response.data.data[k]._id;
          this.permit_options[response.data.data[k]._id]=[]
          for (var j in response.data.data[k].permisos){
            var per = {}
            if(response.data.data[k].activo == true ){
              per["_id"] = response.data.data[k].permisos[j]._id;
              per["name"] = response.data.data[k].permisos[j].nombre;
              mod["permits"].push(per);
              this.permit_options[response.data.data[k]._id].push(per)
            }
          }
          this.modules.push(mod);
        }
        axios
        .get(API_IP+'/rol/'+this.$route.params.id)
        .then(response => {
          this.rol_auditoria = response.data.data.auditoria;
          this.rol_name = response.data.data.nombre;
          this.rol_state = response.data.data.activo;
          response.data.data.activo? this.rol_state_get="Activo" : this.rol_state_get="Inactivo";
          this.rol_description = response.data.data.descripcion
          this.rol_id = response.data.data._id
          this.rol_url = "/roles/"+response.data.data._id

          for (var k in response.data.data.modulos){
            var mod_info = {}
            mod_info["_id"] = response.data.data.modulos[k]._id
            mod_info["modulo"] = response.data.data.modulos[k].modulo._id
            mod_info["name"] = response.data.data.modulos[k].modulo.nombre
            var mod_per = []
            for (var j in response.data.data.modulos[k].permisos){
                var perms = {}
                perms["_id"] = response.data.data.modulos[k].permisos[j]._id
                perms["name"] = response.data.data.modulos[k].permisos[j].nombre
                mod_per.push(perms)
                this.permit_options[response.data.data.modulos[k].modulo._id].push(perms)
            }
            mod_info["permisos"] = mod_per
            this.rol_mod.push(mod_info)
          }
      });
    })
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
        .put(API_IP+"/rol/"+this.$route.params.id, {
          auditoria: this.rol_auditoria,
          activo: this.rol_state.activo,
          _id: this.rol_id,
          nombre: this.rol_name,
          descripcion: this.rol_description,
          modulos: this.rol_mod
        })
        .then(response => {
          console.log(response);
          this.$swal({
            title: 'Exito!',
            text: 'Se actualizo el rol satisfactoriamente.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.value) {
              this.submitting = false;
              this.$router.push({ name: 'showrol', params: { id: this.rol_id} });
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
              this.$router.push({ name: 'showrol', params: { id: this.rol_id} });
            }
          });
        }
      });
    }
  }
}

</script>
