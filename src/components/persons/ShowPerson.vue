<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/personas">Personas</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{person_name}}</li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-md-8 offset-md-2" style="margin-bottom:80px;">
          <div class="row">
            <div class="col">
              <a class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" href="/personas">
                <font-awesome-icon icon="arrow-left" size="lg"></font-awesome-icon>
              </a>
            </div>
          </div>
          <div>&nbsp;</div>
          <div class="row justify-content-center">
            <div class="col-5 align-self-center">
              <form>
                <div class="form-group">
                  <label for="personName">Nombres:</label>
                  <div class="row">
                    <div class="col">
                      <input type="text" class="form-control" id="personName" aria-describedby="personName" :placeholder="name_1" readonly>
                    </div>
                    <div class="col">
                      <input type="text" class="form-control" id="personName" aria-describedby="personName" :placeholder="name_2" readonly>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="personName">Apellidos:</label>
                  <div class="row">
                    <div class="col">
                      <input type="text" class="form-control" id="personName" aria-describedby="personName" :placeholder="lastname_1" readonly>
                    </div>
                    <div class="col">
                      <input type="text" class="form-control" id="personName" aria-describedby="personName" :placeholder="lastname_2" readonly>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="documentType">Documento:</label>
                  <div class="row">
                    <div class="col">
                      <input type="text" class="form-control" id="documentType" aria-describedby="documentType" :placeholder="document_type" readonly>
                    </div>
                    <div class="col">
                      <input type="number" class="form-control" id="documentNumber" aria-describedby="documentNumber" :placeholder="document_number" readonly>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="location">Dirección:</label>
                  <div class="row">
                    <div class="col">
                      <input type="number" class="form-control" id="userCity" aria-describedby="userCity" :placeholder="city" readonly>
                    </div>
                    <div class="col">
                      <input type="number" class="form-control" id="userAddress" aria-describedby="userAddress" :placeholder="address" readonly>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="contact">Contacto:</label>
                  <div class="row">
                    <div class="col">
                      <input type="number" class="form-control" id="userPhone" aria-describedby="userPhone" :placeholder="phone" readonly>
                    </div>
                    <div class="col">
                      <input type="number" class="form-control" id="userMobil" aria-describedby="userMobil" :placeholder="mobil_phone" readonly>
                    </div>
                    <div class="col">
                      <input type="number" class="form-control" id="userExtension" aria-describedby="userExtension" :placeholder="extension" readonly>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="userEmail">Correo</label>
                  <input type="email" class="form-control" id="userEmail" aria-describedby="userEmail" :placeholder="email" readonly>
                </div>
                <div class="form-group">
                  <label for="userDependency">Dependencia:</label>
                  <input type="text" class="form-control" id="userDependency" aria-describedby="userDependency" :placeholder="dependence" readonly>
                </div>
                <div v-if=" planta !== ''">
                  <div class="form-group">
                    <label for="cargoPlanta">Cargo:</label>
                    <input type="text" class="form-control" id="cargoPlanta" aria-describedby="cargoPlanta" :placeholder="planta" readonly>
                  </div>
                </div>
                <div v-else-if=" teacher_type !== '' && teacher_ocupation !=='' ">
                  <div class="form-group">
                    <label for="teacherType">Tipo de profesor:</label>
                    <input type="text" class="form-control" id="teacherType" aria-describedby="teacherType" :placeholder="teacher_type" readonly>
                  </div>
                  <div class="form-group">
                    <label for="teacherOcupation">Dedicación:</label>
                    <input type="text" class="form-control" id="teacherOcupation" aria-describedby="teacherOcupation" :placeholder="teacher_ocupation" readonly>
                  </div>
                </div>
                <div v-else-if=" student_program !== ''">
                  <div class="form-group">
                    <label for="studentProgram">Programa:</label>
                    <input class="form-control" id="studentProgram" aria-describedby="studentProgram" :placeholder="student_program" readonly>
                  </div>
                </div>
                <div v-else-if=" ods !== ''">
                  <div class="form-group">
                    <label for="odsContratista">ODS:</label>
                    <input class="form-control" id="odsContratista" aria-describedby="odsContratista" :placeholder="ods" readonly>
                  </div>
                </div>
                <div>&nbsp;</div>
                <div class="row justify-content-center">
                  <div class="col-8 text-center">
                    <a class="btn btn-primary" v-bind:href="person_update_url" style="background:#003e1e;border-color:#003e1e;">
                      <font-awesome-icon icon="save" size="lg"></font-awesome-icon>
                      Editar
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
import {axios} from '../../helpers/axios';
var API_IP = process.env.VUE_APP_API_IP

export default {
  data () {
    return {
      name_1: "", name_2: "",
      lastname_1: "", lastname_2: "",
      document_type: "", document_number: "",
      city: "", address: "",
      phone: "", mobil_phone: "", extension: "",
      person_name: "", email: "", dependence: "", person_update_url: "",
      student_program: "", planta: "", ods: "",
      teacher_type: "", teacher_ocupation: ""
    }
  },
  mounted () {
    axios
    .get(API_IP+'/person/'+this.$route.params.id)
    .then(response => {
      this.name_1 = response.data.data.primer_nombre
      this.name_2 = response.data.data.segundo_nombre
      this.lastname_1 = response.data.data.primer_apellido
      this.lastname_2 = response.data.data.segundo_apellido
      this.document_type = response.data.data.tipo_documento.nombre
      this.document_number = response.data.data.numero_documento
      this.city = response.data.data.ciudad.nombre
      this.address = response.data.data.direccion
      this.phone = response.data.data.telefono
      this.mobil_phone = response.data.data.celular
      this.extension = response.data.data.extension
      this.person_name = this.name_1+" "+this.lastname_1
      this.email = response.data.data.correo_electronico
      if (response.data.data.dependencia !== undefined && response.data.data.dependencia !== null){
        this.dependence = response.data.data.dependencia.nombre
      } else {
        this.dependence = "No tiene"
      }
      if (response.data.data.estudiante !== undefined && response.data.data.estudiante !== null) {
        this.planta = ""
        this.teacher_type = ""
        this.teacher_ocupation = ""
        this.ods = ""
        this.student_program = response.data.data.estudiante.programa.nombre
      } else if (response.data.data.planta !== undefined && response.data.data.planta !== null) {
        this.student_program = ""
        this.teacher_type = ""
        this.teacher_ocupation = ""
        this.ods = ""
        this.planta = response.data.data.planta.cargo
      } else if (response.data.data.profesor !== undefined && response.data.data.profesor !== null) {
        this.planta = ""
        this.student_program = ""
        this.ods = ""
        this.teacher_type = response.data.data.profesor.tipo
        this.teacher_ocupation = response.data.data.profesor.dedicacion
      } else if (response.data.data.contratista !== undefined && response.data.data.contratista !== null) {
        this.planta = ""
        this.student_program = ""
        this.teacher_type = ""
        this.teacher_ocupation = ""
        this.ods = response.data.data.contratista.ODS
      }
      this.person_update_url = "/personas/"+response.data.data._id+"/actualizar"
    })
  }
}
</script>
