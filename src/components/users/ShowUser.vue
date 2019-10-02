<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/usuarios">Usuarios</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{user_name}}</li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-md-8 offset-md-2" style="margin-bottom:80px;">
          <div class="row">
            <div class="col">
              <a class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" href="/usuarios">
                <font-awesome-icon icon="arrow-left" size="lg"></font-awesome-icon>
              </a>
            </div>
          </div>
          <div>&nbsp;</div>
          <div class="row justify-content-center">
            <div class="col-5 align-self-center">
              <form>
                <div class="form-group">
                  <label for="functionaryName">Nombres del funcionario:</label>
                  <div class="row">
                    <div class="col">
                      <input type="text" class="form-control" id="functionaryName" aria-describedby="functionaryName" :placeholder="name_1" readonly>
                    </div>
                    <div class="col">
                      <input type="text" class="form-control" id="functionaryName" aria-describedby="functionaryName" :placeholder="name_2" readonly>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="functionaryName">Apellidos del funcionario:</label>
                  <div class="row">
                    <div class="col">
                      <input type="text" class="form-control" id="functionaryName" aria-describedby="functionaryName" :placeholder="lastname_1" readonly>
                    </div>
                    <div class="col">
                      <input type="text" class="form-control" id="functionaryName" aria-describedby="functionaryName" :placeholder="lastname_2" readonly>
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
                  <label for="username">Usuario:</label>
                  <input type="text" class="form-control" id="username" aria-describedby="siaUsername" :placeholder="user_name" readonly>
                </div>
                <div class="form-group">
                  <label for="userEmail">Correo</label>
                  <input type="email" class="form-control" id="userEmail" aria-describedby="userEmail" :placeholder="email" readonly>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <label for="contractStartDate">Fecha inicio contrato:</label>
                      <input type="text" class="form-control" id="contractStartDate" aria-describedby="contractStartDate" :placeholder="start_date" readonly>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label for="contractEndDate">Fecha fin contrato:</label>
                      <input type="text" class="form-control" id="contractEndDate" aria-describedby="contractEndDate" :placeholder="end_date" readonly>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="userDependency">Dependencia:</label>
                  <input type="text" class="form-control" id="userDependency" aria-describedby="userDependency" :placeholder="dependence" readonly>
                </div>

                <div class="row">
                  <div class="col">
                    <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                      <thead style="background-color: #003e1e; color:white;">
                        <tr>
                          <th scope="col">Rol</th>
                          <th scope="col">Descripción</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for='(rol, index) in roles' :key="index">
                          <td>{{rol.name}}</td>
                          <td>{{rol.description}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>&nbsp;</div>
                <div class="row justify-content-center">
                  <div class="col-8 text-center">
                    <a class="btn btn-primary" v-bind:href="user_update_url" style="background:#003e1e;border-color:#003e1e;">
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
      user_name: "", email: "", start_date: "", end_date: "",
      dependence: "", roles: [], user_update_url: ""
    }
  },
  mounted () {
    axios
    .get(API_IP+'/user/'+this.$route.params.id)
    .then(response => {
      this.name_1 = response.data.data.persona.primer_nombre
      this.name_2 = response.data.data.persona.segundo_nombre
      this.lastname_1 = response.data.data.persona.primer_apellido
      this.lastname_2 = response.data.data.persona.segundo_apellido
      this.document_type = response.data.data.persona.tipo_documento.nombre
      this.document_number = response.data.data.persona.numero_documento
      this.city = response.data.data.persona.ciudad.nombre
      this.address = response.data.data.persona.direccion
      this.phone = response.data.data.persona.telefono
      this.mobil_phone = response.data.data.persona.celular
      this.extension = response.data.data.persona.extension
      this.user_name = response.data.data.nombre_usuario
      this.email = response.data.data.persona.correo_electronico
      this.start_date = response.data.data.fecha_inicio_contrato.substring(0,10)
      this.end_date = response.data.data.fecha_fin_contrato.substring(0,10)
      this.dependence = response.data.data.persona.dependencia.nombre
      this.user_update_url = "/usuarios/"+response.data.data._id+"/actualizar"

      for(var k in response.data.data.roles){
        var rol = {
          "name" : response.data.data.roles[k].nombre,
          "description" : response.data.data.roles[k].descripcion
        }
        this.roles.push(rol)
      }
    })
  }
}
</script>
