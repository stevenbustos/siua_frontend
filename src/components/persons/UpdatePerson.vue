<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/personas">Personas</a></li>
            <li class="breadcrumb-item"><a v-bind:href="person_url">{{person_name}}</a></li>
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
                  <label for="personName">Nombres:</label>
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
                  <label for="personName">Apellidos:</label>
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
                <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
                  <label for="userEmail">Correo</label>
                  <input type="email" v-model.trim="$v.email.$model" class="form-control" id="userEmail" aria-describedby="userEmail">
                  <div class="alert alert-danger" role="alert" v-if="$v.email.$dirty && !$v.email.required">Es requerido un correo</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.dependence.$error }">
                  <label for="userDependency">Dependencia:</label>
                  <multiselect v-model.trim="$v.dependence.$model" :options="dependencies" track-by="name" label="name" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Escoja una dependencia">
                  </multiselect>
                  <div class="alert alert-danger" role="alert" v-if="$v.dependence.$dirty && !$v.dependence.required">Es requerido una dependencia</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.person_type.$error }">
                  <label for="personType">Tipo de persona:</label>
                  <multiselect v-model.trim="$v.person_type.$model" :options="person_types" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Escoja un tipo de persona">
                  </multiselect>
                  <div class="alert alert-danger" role="alert" v-if="$v.person_type.$dirty && !$v.person_type.required">Es necesario escoger un tipo de persona</div>
                </div>
                <div v-if=" person_type === 'Profesor' ">
                  {{student_program = "" }}
                  <div class="form-group" :class="{ 'form-group--error': $v.teacher_type.$error }">
                    <label for="teacherType">Tipo de profesor:</label>
                    <input type="text" v-model.trim="$v.teacher_type.$model" class="form-control" id="teacherType" aria-describedby="teacherType">
                    <div class="alert alert-danger" role="alert" v-if="$v.teacher_type.$dirty && !$v.teacher_type.required">Es necesario escoger el tipo de profesor</div>
                  </div>
                  <div class="form-group" :class="{ 'form-group--error': $v.teacher_ocupation.$error }">
                    <label for="teacherOcupation">Dedicación:</label>
                    <input type="text" v-model.trim="$v.teacher_ocupation.$model" class="form-control" id="teacherOcupation" aria-describedby="teacherOcupation">
                    <div class="alert alert-danger" role="alert" v-if="$v.teacher_ocupation.$dirty && !$v.teacher_ocupation.required">Es necesario escoger la dedicación</div>
                  </div>
                </div>
                <div v-else-if=" person_type === 'Estudiante' ">
                  <div class="form-group" :class="{ 'form-group--error': $v.student_program.$error }">
                    <label for="studentProgram">Programa:</label>
                    <multiselect v-model.trim="$v.student_program.$model" :options="programs" track-by="_id" label="name" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Escoja una programa">
                    </multiselect>
                    <div class="alert alert-danger" role="alert" v-if="$v.student_program.$dirty && !$v.student_program.required">Es necesario escoger un programa</div>
                  </div>
                </div>
                <div v-else-if=" person_type === 'Planta' ">
                  <div class="form-group" :class="{ 'form-group--error': $v.plant_appoiment.$error }">
                    <label for="plantAppoiment">Cargo:</label>
                    <input type="text" v-model.trim="$v.plant_appoiment.$model" class="form-control" id="plantAppoiment" aria-describedby="plantAppoiment">
                    <div class="alert alert-danger" role="alert" v-if="$v.plant_appoiment.$dirty && !$v.plant_appoiment.required">Es necesario colocar cargo</div>
                  </div>
                </div>
                <div v-else-if=" person_type === 'Contratista' ">
                  <div class="form-group">
                    <label for="odsNumber">Numero de ODS:</label>
                    <input type="text" v-model="ods_number" class="form-control" id="odsNumber" aria-describedby="odsNumber">
                  </div>
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
                    <a class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" v-bind:href="person_url">
                      <font-awesome-icon icon="times-circle" size="lg"></font-awesome-icon>
                      Cancelar
                    </a>
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
import { required, requiredIf } from 'vuelidate/lib/validators'
var API_IP = process.env.VUE_APP_API_IP

export default {
  components: {
    Multiselect
  },
  data () {
    return {
      dependencies: [],
      cities: [],
      document_types : [],
      programs : [],
      person_types: ['Estudiante', 'Profesor', 'Planta', 'Contratista'],
      person_auditoria : {},
      person_id : "",
      name_1: "", name_2: "",
      lastname_1: "", lastname_2: "",
      document_type: "", document_number: "",
      city: "", address: "",
      phone: "", mobil_phone: "", extension: "",
      person_name: "", email: "", start_date: "", end_date: "",
      dependence: {}, person_url: "",
      person_type: "",
      student_program: "",
      teacher_type: "", teacher_ocupation: "",
      submitting: false,
      plant_appoiment:"",
      ods_number:""
    }
  },
  validations: {
    dependence: { required }, document_number: { required }, document_type: { required },
    name_1: { required }, name_2: { required }, lastname_1: { required },
    lastname_2: { required }, email: { required }, city: { required },
    address: { required }, phone: { required }, mobil_phone: { required },
    extension: { required }, person_type: { required },
    teacher_type: {
      requiredIf: requiredIf(function (){
        return this.person_type === 'Profesor'
      })
    },
    teacher_ocupation: {
      required: requiredIf(function (){
        return this.person_type === 'Profesor'
      })
    },
    student_program: {
      required: requiredIf(function (){
        return this.person_type === 'Estudiante'
      })
    },
    plant_appoiment: {
      required: requiredIf(function (){
        return this.person_type === 'Planta'
      })
    }
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
          .get(API_IP+'/program')
          .then(response => {
            for (var k in response.data.data){
              var program = {}
              program["_id"] = response.data.data[k]._id;
              program["name"] = response.data.data[k].nombre;
              this.programs.push(program);
            }
          });
        });
      });
    });

    axios
    .get(API_IP+'/person/'+this.$route.params.id)
    .then(response => {
      this.person_auditoria = response.data.data.auditoria
      this.person_id = response.data.data._id
      this.name_1 = response.data.data.primer_nombre
      this.name_2 = response.data.data.segundo_nombre
      this.lastname_1 = response.data.data.primer_apellido
      this.lastname_2 = response.data.data.segundo_apellido
      this.document_type = {
        "name": response.data.data.tipo_documento.nombre,
        "_id": response.data.data.tipo_documento._id
      }
      this.document_number = response.data.data.numero_documento
      this.city = {
        "name" : response.data.data.ciudad.nombre,
        "_id": response.data.data.ciudad._id
      }
      this.address = response.data.data.direccion
      this.phone = response.data.data.telefono
      this.mobil_phone = response.data.data.celular
      this.extension = response.data.data.extension
      this.person_name = response.data.data.primer_nombre+" "+response.data.data.primer_apellido
      this.email = response.data.data.correo_electronico
      if (response.data.data.dependencia !== undefined && response.data.data.dependencia !== null){
        this.dependence = {
          "name" : response.data.data.dependencia.nombre,
          "_id" : response.data.data.dependencia._id
        }
      } else {
        this.dependence = ""
      }
      if (response.data.data.estudiante !== undefined && response.data.data.estudiante !== null) {
        this.person_type = "Estudiante"
        this.student_program = {
          "name" : response.data.data.estudiante.programa.nombre,
          "_id" : response.data.data.estudiante.programa._id
        }
        this.teacher_type = ""
        this.teacher_ocupation = ""
        this.ods_number = ""
        this.plant_appoiment = ""
      } else if (response.data.data.profesor !== undefined && response.data.data.profesor !== null) {
        this.person_type = "Profesor"
        this.teacher_type = response.data.data.profesor.tipo
        this.teacher_ocupation = response.data.data.profesor.dedicacion
        this.student_program = ""
        this.ods_number = ""
        this.plant_appoiment = ""
      } else if (response.data.data.planta !== undefined && response.data.data.planta !== null) {
        this.person_type = "Planta"
        this.plant_appoiment = response.data.data.planta.cargo
        this.student_program = ""
        this.teacher_type = ""
        this.teacher_ocupation = ""
        this.ods_number = ""
      } else if (response.data.data.contratista !== undefined && response.data.data.contratista !== null) {
        this.person_type = "Contratista"
        this.ods_number = response.data.data.contratista.ODS
        this.student_program = ""
        this.teacher_type = ""
        this.teacher_ocupation = ""
        this.plant_appoiment = ""
      }
      this.person_url = "/personas/"+response.data.data._id
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
        axios
        .put(API_IP+"/person/"+this.$route.params.id, {
          auditoria : this.person_auditoria,
          _id : this.person_id,
          dependencia : this.dependence,
          numero_documento : this.document_number,
          tipo_documento : this.document_type,
          primer_nombre : this.name_1,
          segundo_nombre : this.name_2,
          primer_apellido : this.lastname_1,
          segundo_apellido : this.lastname_2,
          correo_electronico : this.email,
          ciudad : this.city,
          direccion : this.address,
          telefono : this.phone,
          extension : this.mobil_phone,
          celular : this.extension,
          profesor: {
            tipo: this.teacher_type,
            dedicacion: this.teacher_ocupation
          },
          estudiante: {
            programa: this.student_program._id
          }
        })
        .then(response => {
          console.log(response);
          this.$swal({
            title: 'Exito!',
            text: 'Se creo la persona satisfactoriamente.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.value) {
              this.submitting = false;
              this.$router.push({ name: 'showperson', params: { id: this.person_id} });
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
              this.$router.push({ name: 'showperson', params: { id: this.person_id} });
            }
          });
        }
      });
    }
  }
}
</script>
