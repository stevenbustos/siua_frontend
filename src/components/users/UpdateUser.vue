<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/usuarios">Usuarios</a></li>
            <li class="breadcrumb-item"><a v-bind:href="user_url">{{user_name}}</a></li>
            <li class="breadcrumb-item active" aria-current="page">Actualizar Usuario</li>
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
                <div>
                  <label for="personName">Nombres del funcionario:</label>
                  <div class="row">
                    <div class="col">
                      <div class="form-group" :class="{ 'form-group--error': $v.name_1.$error }">
                        <input v-model.trim="$v.name_1.$model" type="text" class="form-control" id="personName" aria-describedby="personName" placeholder="Primer Nombre">
                        <div class="alert alert-danger" role="alert" v-if="$v.name_1.$dirty && !$v.name_1.required">Es requerido un primer nombre</div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group" :class="{ 'form-group--error': $v.name_2.$error }">
                        <input v-model.trim="$v.name_2.$model" type="text" class="form-control" id="personName" aria-describedby="personName" placeholder="Segundo Nombre">
                        <div class="alert alert-danger" role="alert" v-if="$v.name_2.$dirty && !$v.name_2.required">Es requerido un segundo nombre</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label for="personName">Apellidos del funcionario:</label>
                  <div class="row">
                    <div class="col">
                      <div class="form-group" :class="{ 'form-group--error': $v.lastname_1.$error }">
                        <input v-model.trim="$v.lastname_1.$model" type="text" class="form-control" id="personName" aria-describedby="personName" placeholder="Primer Apellido">
                        <div class="alert alert-danger" role="alert" v-if="$v.lastname_1.$dirty && !$v.lastname_1.required">Es requerido un primer apellido</div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group" :class="{ 'form-group--error': $v.lastname_2.$error }">
                        <input v-model.trim="$v.lastname_2.$model" type="text" class="form-control" id="personName" aria-describedby="personName" placeholder="Segundo Apellido">
                        <div class="alert alert-danger" role="alert" v-if="$v.lastname_2.$dirty && !$v.lastname_2.required">Es requerido un segundo apellido</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.document_type.$error }">
                  <label for="documentType">Tipo de documento:</label>
                  <multiselect v-model.trim="$v.document_type.$model" :options="document_types" track-by="_id" label="name" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Escoja un tipo de documento">
                  </multiselect>
                  <div class="alert alert-danger" role="alert" v-if="$v.document_type.$dirty && !$v.document_type.required">Es requerido un tipo de documento</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.document_number.$error }">
                  <label for="documentType">Numero de documento:</label>
                  <input v-model.trim="$v.document_number.$model" type="number" class="form-control" id="documentNumber" aria-describedby="documentNumber" placeholder="Numero">
                  <div class="alert alert-danger" role="alert" v-if="$v.document_number.$dirty && !$v.document_number.required">Es requerido un numero de documento</div>
                </div>
                <div>
                  <label for="location">Dirección:</label>
                  <div class="row">
                    <div class="col">
                      <div class="form-group" :class="{ 'form-group--error': $v.city.$error }">
                        <multiselect v-model.trim="$v.city.$model" :options="cities" track-by="name" label="name" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Escoja una ciudad">
                        </multiselect>
                        <div class="alert alert-danger" role="alert" v-if="$v.city.$dirty && !$v.city.required">Es requerida una ciudad</div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group" :class="{ 'form-group--error': $v.address.$error }">
                        <input type="text" v-model.trim="$v.address.$model" class="form-control" id="userAddress" aria-describedby="userAddress" placeholder="Dirección">
                        <div class="alert alert-danger" role="alert" v-if="$v.address.$dirty && !$v.address.required">Es requerida una dirección</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label for="contact">Contacto:</label>
                  <div class="row">
                    <div class="col">
                      <div class="form-group" :class="{ 'form-group--error': $v.phone.$error }">
                        <input type="number" v-model.trim="$v.phone.$model" class="form-control" id="userPhone" aria-describedby="userPhone" placeholder="Teléfono">
                        <div class="alert alert-danger" role="alert" v-if="$v.phone.$dirty && !$v.phone.required">Es requerido un numero de teléfono</div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group" :class="{ 'form-group--error': $v.mobil_phone.$error }">
                        <input type="number" v-model.trim="$v.mobil_phone.$model" class="form-control" id="userMobil" aria-describedby="userMobil" placeholder="Celular">
                        <div class="alert alert-danger" role="alert" v-if="$v.mobil_phone.$dirty && !$v.mobil_phone.required">Es requerido un numero de celular</div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group" :class="{ 'form-group--error': $v.extension.$error }">
                        <input type="number" v-model.trim="$v.extension.$model" class="form-control" id="userExtension" aria-describedby="userExtension" placeholder="Extensión">
                        <div class="alert alert-danger" role="alert" v-if="$v.extension.$dirty && !$v.extension.required">Es requerido un numero de extensión</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.user_name.$error }">
                  <label for="username">Usuario:</label>
                  <input type="text" v-model.trim="$v.user_name.$model" class="form-control" id="username" aria-describedby="siaUsername" placeholder="Usuario del funcionario en el sistema">
                  <div class="alert alert-danger" role="alert" v-if="$v.user_name.$dirty && !$v.user_name.required">Es requerido un nombre de usuario</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
                  <label for="userEmail">Correo</label>
                  <input type="email" v-model.trim="$v.email.$model" class="form-control" id="userEmail" aria-describedby="userEmail">
                  <div class="alert alert-danger" role="alert" v-if="$v.email.$dirty && !$v.email.required">Es requerido un correo</div>
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
                    <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
                      <label for="contractEndDate">Fecha culminación contrato:</label>
                      <input type="date" v-model="end_date" class="form-control" id="contractEndDate" aria-describedby="contractEndDate">
                      <div class="alert alert-danger" role="alert" v-if="$v.email.$dirty && !$v.email.required">Es requerida la fecha de finalización de contrato</div>
                    </div>
                  </div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.dependence.$error }">
                  <label for="userDependency">Dependencia:</label>
                  <multiselect v-model.trim="$v.dependence.$model" :options="dependencies" track-by="name" label="name" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Escoja una dependencia">
                  </multiselect>
                  <div class="alert alert-danger" role="alert" v-if="$v.dependence.$dirty && !$v.dependence.required">Es requerido una dependencia</div>
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
                <div class="row justify-content-center">
                  <div class="col-8 text-center">
                    <button class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;">
                      <font-awesome-icon icon="unlock" size="lg"></font-awesome-icon>
                      Reestablecer contraseña
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
      dependencies: [],
      roles: [],
      cities: [],
      document_types : [] ,
      user_auditoria : {},
      user_id : "",
      user_person_auditoria: {},
      user_person_id: "",
      name_1: "", name_2: "",
      lastname_1: "", lastname_2: "",
      document_type: "", document_number: "",
      city: "", address: "",
      phone: "", mobil_phone: "", extension: "",
      user_name: "", email: "", start_date: "", end_date: "",
      dependence: {}, user_roles: [], user_url: "",
      submitting: false
    }
  },
  validations: {
    dependence: { required }, document_number: { required }, document_type: { required },
    name_1: { required }, name_2: { required }, lastname_1: { required },
    lastname_2: { required }, email: { required }, city: { required },
    address: { required }, phone: { required }, mobil_phone: { required },
    extension: { required }, user_roles: { required }, user_name: { required },
    end_date: { required }, start_date: { required }
  },
  mounted () {
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
    axios
    .get(API_IP+'/user/'+this.$route.params.id)
    .then(response => {
      this.user_auditoria = response.data.data.auditoria
      this.user_id = response.data.data._id
      this.user_person_auditoria = response.data.data.persona.auditoria
      this.user_person_id = response.data.data.persona._id
      this.name_1 = response.data.data.persona.primer_nombre
      this.name_2 = response.data.data.persona.segundo_nombre
      this.lastname_1 = response.data.data.persona.primer_apellido
      this.lastname_2 = response.data.data.persona.segundo_apellido
      this.document_type = {
        "name": response.data.data.persona.tipo_documento.nombre,
        "_id": response.data.data.persona.tipo_documento._id
      }
      this.document_number = response.data.data.persona.numero_documento
      this.city = {
        "name" : response.data.data.persona.ciudad.nombre,
        "_id": response.data.data.persona.ciudad._id
      }
      this.address = response.data.data.persona.direccion
      this.phone = response.data.data.persona.telefono
      this.mobil_phone = response.data.data.persona.celular
      this.extension = response.data.data.persona.extension
      this.user_name = response.data.data.nombre_usuario
      this.email = response.data.data.persona.correo_electronico
      this.start_date = response.data.data.fecha_inicio_contrato.substring(0,10)
      this.end_date = response.data.data.fecha_fin_contrato.substring(0,10)
      this.dependence = {
        "name" : response.data.data.persona.dependencia.nombre,
        "_id" : response.data.data.persona.dependencia._id
      }
      this.user_url = "/usuarios/"+response.data.data._id
      for(var k in response.data.data.roles){
        var rol = {}
        rol["_id"] = response.data.data.roles[k]._id
        rol["name"] = response.data.data.roles[k].nombre
        this.user_roles.push(rol)
      }
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
        this.submitting = true
        var person = {
          "auditoria" : this.user_person_auditoria,
          "_id" : this.user_person_id,
          "dependencia" : this.dependence,
          "numero_documento" : this.document_number,
          "tipo_documento" : this.document_type,
          "primer_nombre" : this.name_1,
          "segundo_nombre" : this.name_2,
          "primer_apellido" : this.lastname_1,
          "segundo_apellido" : this.lastname_2,
          "correo_electronico" : this.email,
          "ciudad" : this.city,
          "direccion" : this.address,
          "telefono" : this.phone,
          "extension" : this.mobil_phone,
          "celular" : this.extension
        }
        axios
        .put(API_IP+"/user/"+this.$route.params.id, {
          auditoria: this.user_auditoria,
          roles: this.user_roles ,
          _id: this.user_id,
          nombre_usuario: this.user_name,
          fecha_fin_contrato: this.end_date,
          fecha_inicio_contrato: this.start_date,
          persona: person
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
              this.$router.push({ name: 'showuser', params: { id: this.user_id} });
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
              this.$router.push({ name: 'users' });
            }
          });
        }
      });
    }
  }
}
</script>
