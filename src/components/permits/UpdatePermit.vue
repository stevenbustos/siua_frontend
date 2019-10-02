<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/permisos">Permisos</a></li>
            <li class="breadcrumb-item"><a v-bind:href="permit_url">{{permit_name}}</a></li>
            <li class="breadcrumb-item active" aria-current="page">Actualizar Permiso</li>
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
                  <label for="permitName">Nombre del permiso:</label>
                  <input type="text" class="form-control" id="permitName" aria-describedby="permitName" :placeholder="permit_name" readonly>
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
                  <multiselect v-model.trim="$v.permit_state.$model" :options="states" track-by="activo" label="name" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Estado">
                  </multiselect>
                  <div class="alert alert-danger" role="alert" v-if="$v.permit_state.$dirty && !$v.permit_state.required">Es requerido un estado</div>
                </div>
                <div>&nbsp;</div>
                <div class="row justify-content-center">
                  <div class="col-4 text-center">
                    <button class="btn btn-primary" type="submit" :disabled="submitting" style="background:#003e1e;border-color:#003e1e;">
                      <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                      Actualizar
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


var headersDic = {};
headersDic[process.env.VUE_APP_KEY_HEADER_NAME] = process.env.VUE_APP_KEY_HEADER_CONTENT;
headersDic[process.env.VUE_APP_TOKEN_HEADER_NAME] = "";
headersDic[process.env.VUE_APP_MODULE_HEADER_NAME] = 0;
headersDic[process.env.VUE_APP_PERMIT_HEADER_NAME] = 1;


export default {
  components: {
    Multiselect
  },
  data () {
    return {
      permit_id: "",
      permit_auditoria: {},
      permit_name: "",
      permit_description: "",
      permit_code: "",
      permit_state: {},
      permit_url: "",
      states: [
        { name: "Activo", activo: "true" },
        { name: "Inactivo", activo: "false" }
      ],
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
    permit_code: {
      required
    }
  },
  mounted(){
    if (localStorage.getItem(process.env.VUE_APP_TOKEN_HEADER_NAME)) {
      headersDic[process.env.VUE_APP_TOKEN_HEADER_NAME] = localStorage.getItem(process.env.VUE_APP_TOKEN_HEADER_NAME);
      axios
      .get(API_IP+'/'+this.$route.params.id,{headers:headersDic})
      .then(response => {
        console.log(response);
        this.permit_auditoria = response.data.data.auditoria;
        this.permit_id = response.data.data._id;
        this.permit_name = response.data.data.nombre;
        this.permit_description = response.data.data.descripcion;
        this.permit_code = response.data.data.codigo;
        this.permit_state = response.data.data.activo;
        response.data.data.activo? this.permit_state_get="Activo" : this.permit_state_get="Inactivo";
        this.permit_url = "/permisos/"+response.data.data._id
      })
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
        headersDic[process.env.VUE_APP_PERMIT_HEADER_NAME]=3
        axios
        .put(API_IP+"/"+this.$route.params.id,
        {
          auditoria: this.permit_auditoria,
          _id: this.permit_id,
          activo: this.permit_state.activo,
          nombre: this.permit_name,
          descripcion: this.permit_description,
          codigo: parseInt(this.permit_code)
        },{headers: headersDic})
        .then(response => {
          console.log(response);
          this.$swal({
            title: 'Exito!',
            text: 'Se actualizo el permiso satisfactoriamente.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.value) {
              this.submitting = false;
              this.$router.push({ name: 'showpermit', params: { id: this.permit_id } });
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
              this.$router.push({ name: 'showpermit', params: { id: this.permit_id} });
            }
          });
        }
      });
    }
  }
}
</script>
