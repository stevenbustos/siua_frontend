<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/dependencias">Dependencias</a></li>
            <li class="breadcrumb-item"><a v-bind:href="dependence_url">{{dependence_name}}</a></li>
            <li class="breadcrumb-item active" aria-current="page">Actualizar Dependencia</li>
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
          <modal name="create-person" :adaptive="true" :scrollable="true" width="50%" height="auto">
            <create-person
            :hide_modal="modal_show"
            @modalShow="closeModalCreatePerson"
            ></create-person>
          </modal>
          <div>&nbsp;</div>
          <div class="row justify-content-center">
            <div class="col-5 align-self-center">
              <form @submit.prevent="submit" novalidate>
                <div class="form-group">
                  <label for="dependencyName">Nombre de la dependencia:</label>
                  <input type="text" class="form-control" id="dependencyName" aria-describedby="dependencyName" :placeholder="dependence_name" readonly>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.dependence_director.$error }">
                  <label for="dependencyDirector">Director de la dependencia:</label>
                  <div class="row">
                    <div class="col">
                      <multiselect v-model.trim="$v.dependence_director.$model" :options="directors" :multiple="false" :preserve-search="true" placeholder="Seleccione el director" :show-labels="true" label="name" track-by="_id" :preselect-first="false">
                      </multiselect>
                      <div class="alert alert-danger" role="alert" v-if="$v.dependence_director.$dirty && !$v.dependence_director.required">Es requerido un director</div>
                    </div>
                    <div class="col-auto">
                      <button class="btn btn-primary" type="button" @click="showModalCreatePerson()" style="background:#003e1e;border-color:#003e1e;">
                        <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                        Crear Nuevo
                      </button>
                    </div>
                  </div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.director_type.$error }">
                  <label for="directorType">Tipo de director:</label>
                  <multiselect v-model.trim="$v.director_type.$model" :options="director_types" :multiple="false" :preserve-search="true" placeholder="Seleccione el tipo del director" :preselect-first="false">
                  </multiselect>
                  <div class="alert alert-danger" role="alert" v-if="$v.director_type.$dirty && !$v.director_type.required">Es requerido especificar el tipo de director</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.resolution_number.$error }">
                  <label for="resolutionNumber">Numero de la resolución:</label>
                  <input v-model.trim="$v.resolution_number.$model" type="text" class="form-control" id="resolutionNumber" aria-describedby="resolutionNumber" placeholder="Resolución">
                  <div class="alert alert-danger" role="alert" v-if="$v.resolution_number.$dirty && !$v.resolution_number.required">Es requerido un numero de resolución</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.resolution_date.$error }">
                  <label for="resolutionDate">Fecha de la resolución:</label>
                  <input v-model.trim="$v.resolution_date.$model" type="date" class="form-control" id="resolutionDate" aria-describedby="resolutionDate">
                  <div class="alert alert-danger" role="alert" v-if="$v.resolution_date.$dirty && !$v.resolution_date.required">Es requerida una fecha</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.quipu.$error }">
                  <label for="quipuCode">Código de Quipu:</label>
                  <input v-model.trim="$v.quipu.$model" type="text" class="form-control" id="quipuCode" aria-describedby="quipuCode">
                  <div class="alert alert-danger" role="alert" v-if="$v.quipu.$dirty && !$v.quipu.required">Es requerido un código</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.description.$error }">
                  <label for="dependenceDescription">Descripción:</label>
                  <textarea v-model.trim="$v.description.$model" class="form-control" aria-label="dependenceDescription"
                  placeholder="Descripción" :rows="6" :max-rows="10"></textarea>
                  <div class="alert alert-danger" role="alert" v-if="$v.description.$dirty && !$v.description.required">Es requerida una descripción</div>
                </div>
                <div>&nbsp;</div>
                <div class="row justify-content-center">
                  <div class="col-4 text-center">
                    <button class="btn btn-primary" type="submit" :disabled="submitting" style="background:#003e1e;border-color:#003e1e;">
                      <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
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
import CreatePerson from '../persons/CreatePersonModal.vue'
var API_IP = process.env.VUE_APP_API_IP

export default {
  components: {
    Multiselect,
    'create-person': CreatePerson

  },
  data () {
    return {
      directors: [],
      director_types: ["Electo", "Encargado"],
      dependence_name:"",
      resolution_number:"",
      resolution_date:"",
      quipu: "",
      description: "",
      director_type:"",
      dependence_director:{},
      dependence_director_get: "",
      dependency_id:"",
      dependence_url: "",
      dependence_auditoria: {},
      submitting: false,
      modal_show: false
    }
  },
  validations: {
    resolution_number: {
      required
    },
    resolution_date: {
      required
    },
    quipu: {
      required
    },
    description: {
      required
    },
    director_type: {
      required
    },
    dependence_director: {
      required
    }
  },
  mounted () {
    axios
    .get(API_IP+"/person/")
    .then(response => {
      for (var k in response.data.data){
        var user_info = {}
        user_info["_id"] = response.data.data[k]._id;
        user_info["name"] = response.data.data[k].primer_nombre+" "+response.data.data[k].segundo_nombre+" "+response.data.data[k].primer_apellido+" "+response.data.data[k].segundo_apellido;
        this.directors.push(user_info);
      }
      axios
      .get(API_IP+'/dependence/'+this.$route.params.id)
      .then(response => {
        this.dependence_auditoria = response.data.data.auditoria;
        this.dependency_id = response.data.data._id
        this.dependence_name = response.data.data.nombre

        if ( response.data.data.director !== undefined &&  response.data.data.director !== null) {
          this.dependence_director["_id"] = response.data.data.director._id,
          this.dependence_director["name"] = response.data.data.director.primer_nombre+" "+response.data.data.director.segundo_nombre+" "+response.data.data.director.primer_apellido+" "+response.data.data.director.segundo_apellido,
          this.dependence_director_get = response.data.data.director.primer_nombre+" "+response.data.data.director.segundo_nombre+" "+response.data.data.director.primer_apellido+" "+response.data.data.director.segundo_apellido
          this.director_email = response.data.data.director.correo_electronico

        }
        this.resolution_number = response.data.data.resolucion_numero
        this.director_type = response.data.data.director_tipo
        this.resolution_date = response.data.data.resolucion_fecha.substring(0,10)
        this.quipu = response.data.data.quipu_codigo
        this.description = response.data.data.descripcion
        this.dependence_url = "/dependencias/"+response.data.data._id
      })
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
        .put(API_IP+"/dependence/"+this.$route.params.id, {
          auditoria: this.dependence_auditoria,
          _id: this.dependency_id,
          nombre: this.dependence_name,
          resolucion_numero: this.resolution_number,
          resolucion_fecha: this.resolution_date,
          quipu_codigo: this.quipu,
          descripcion: this.description,
          director_tipo: this.director_type,
          director: this.dependence_director._id
        })
        .then(response => {
          console.log(response);
          this.$swal({
            title: 'Exito!',
            text: 'Se actualizo la dependencia satisfactoriamente.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.value) {
              this.submitting = false;
              this.$router.push({ name: 'showdependency', params: { id: this.dependency_id } });
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
              this.$router.push({ name: 'showdependency', params: { id: this.dependency_id } });
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
