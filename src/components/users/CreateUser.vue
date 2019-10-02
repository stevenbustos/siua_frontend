<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/usuarios">Usuarios</a></li>
            <li class="breadcrumb-item active" aria-current="page">Crear Usuario</li>
          </ol>
        </nav>
      </div>
      <modal name="create-person" :adaptive="true" :scrollable="true" width="50%" height="auto">
        <create-person
        :hide_modal="modal_show"
        @modalShow="closeModalCreatePerson"
        ></create-person>
      </modal>
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
            <div class="col-6 align-self-center">
              <form @submit.prevent="submit" novalidate>
                <div class="row">
                  <div class="col">
                    <multiselect v-model.trim="$v.personSelect.$model" :options="people" :multiple="false"  placeholder="Seleccione la persona" :show-labels="true" label="name" track-by="_id" :searchable="true" :close-on-select="true">
                    </multiselect>
                    <div class="alert alert-danger" role="alert" v-if="$v.personSelect.$dirty && !$v.personSelect.required">Es requerida una persona</div>
                  </div>
                  <div class="col-auto">
                    <button class="btn btn-primary" type="button" @click="showModalCreatePerson()" style="background:#003e1e;border-color:#003e1e;">
                      <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                      Crear Nuevo
                    </button>
                  </div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.user_name.$error }">
                  <label for="username">Usuario:</label>
                  <input type="text" v-model.trim="$v.user_name.$model" class="form-control" id="username" aria-describedby="siaUsername" placeholder="Usuario del funcionario en el sistema">
                  <div class="alert alert-danger" role="alert" v-if="$v.user_name.$dirty && !$v.user_name.required">Es requerido un nombre de usuario</div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="form-group" :class="{ 'form-group--error': $v.start_date.$error }">
                      <label for="contractStartDate">Fecha inicio contrato:</label>
                      <input type="date" v-model.trim="$v.start_date.$model" class="form-control" id="contractStartDate" aria-describedby="contractStartDate">
                      <div class="alert alert-danger" role="alert" v-if="$v.start_date.$dirty && !$v.start_date.required">Es requerida la fecha de inicio de contrato</div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group" :class="{ 'form-group--error': $v.end_date.$error }">
                      <label for="contractEndDate">Fecha culminación contrato:</label>
                      <input type="date" v-model="end_date" class="form-control" id="contractEndDate" aria-describedby="contractEndDate">
                      <div class="alert alert-danger" role="alert" v-if="$v.end_date.$dirty && !$v.end_date.required">Es requerida la fecha de finalización de contrato</div>
                    </div>
                  </div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.user_roles.$error }">
                  <label for="userRol">Rol:</label>
                  <multiselect v-model.trim="$v.user_roles.$model" :options="roles" :multiple="true" :close-on-select="true" :clear-on-select="false" :hide-selected="true" :preserve-search="true" placeholder="Seleccione los roles del usuario" label="name" track-by="_id" :preselect-first="false">
                  </multiselect>
                  <div class="alert alert-danger" role="alert" v-if="$v.user_roles.$dirty && !$v.user_roles.required">Es requerido minímo un rol</div>
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
import CreatePerson from '../persons/CreatePersonModal.vue'
var API_IP = process.env.VUE_APP_API_IP

export default {
  components: {
    Multiselect,
    'create-person': CreatePerson
  },
  data () {
    return {
      personSelect:"",
      dependencies: [],
      people:[],
      roles: [],
      cities: [],
      document_types : [] ,
      user_name: "",
      start_date: "",
      end_date: "",
      user_roles: [],
      submitting: false,
      modal_show: false
    }
  },
  validations: {
    personSelect:{ required },
    user_roles: { required }, user_name: { required },
    end_date: { required }, start_date: { required }
  },
  mounted () {
    axios
    .get(API_IP+"/person/")
    .then(response => {
      for (var k in response.data.data){
        var user_info = {}
        console.log(response.data.data[k]);
        user_info["_id"] = response.data.data[k]._id;
        user_info["name"] = response.data.data[k].primer_nombre+" "+response.data.data[k].segundo_nombre+" "+response.data.data[k].primer_apellido+" "+response.data.data[k].segundo_apellido;
        user_info["correo_electronico"] = response.data.data[k].correo_electronico;

        this.people.push(user_info);
      }
      axios
      .get(API_IP+'/documentType')
      .then(response => {
        for (var k in response.data.data){
          var doc = {}
          doc["_id"] = response.data.data[k]._id;
          doc["name"] = response.data.data[k].nombre;
          this.document_types.push(doc);
        }
        axios
        .get(API_IP+'/city')
        .then(response => {
          for (var k in response.data.data){
            var city = {}
            city["_id"] = response.data.data[k]._id;
            city["name"] = response.data.data[k].nombre;
            this.cities.push(city);
          }
          axios
          .get(API_IP+'/dependence')
          .then(response => {
            for (var k in response.data.data){
              var dependence = {}
              dependence["_id"] = response.data.data[k]._id;
              dependence["name"] = response.data.data[k].nombre;
              this.dependencies.push(dependence);
            }
            axios
            .get(API_IP+'/rol')
            .then(response => {
              for (var k in response.data.data){
                var rol = {}
                if(response.data.data[k].activo == true ){
                  rol["_id"] = response.data.data[k]._id;
                  rol["name"] = response.data.data[k].nombre;

                  this.roles.push(rol);
                }
              }
            });
          });
        });
      });
    });
  },
  methods : {
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
        this.submitting = true
        var roles_usuario = []
        for (var k in this.user_roles){
          var rol = {}
          rol["_id"] = this.user_roles[k]._id;
          roles_usuario.push(rol);
        }

        axios
        .post(API_IP+"/user/", {
          roles: roles_usuario,
          nombre_usuario: this.user_name,
          fecha_fin_contrato: this.end_date,
          fecha_inicio_contrato: this.start_date,
          persona: this.personSelect
        })
        .then(response => {
          console.log(response);
          this.$swal({
            title: 'Exito!',
            text: 'Se creo el usuario satisfactoriamente.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.value) {
              this.submitting = false;
              this.$router.push({ name: 'users' });
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
              this.$router.push({ name: 'users' });
            }
          });
        }
      });
    },
    // Modal para la creación de personas
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
    }
  }
}
</script>
