<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/modulos">Módulos</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{module_name}}</li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-md-8 offset-md-2" style="margin-bottom:80px;">
          <div class="row">
            <div class="col">
              <a class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" href="/modulos">
                <font-awesome-icon icon="arrow-left" size="lg"></font-awesome-icon>
              </a>
            </div>
          </div>
          <div>&nbsp;</div>
          <div class="row justify-content-center">
            <div class="col-5 align-self-center">
              <form>
                <div class="form-group">
                  <label for="moduleName">Nombre del módulo:</label>
                  <input type="text" class="form-control" id="moduleName" aria-describedby="moduleName" :placeholder="module_name" readonly>
                </div>
                <div class="form-group">
                  <label for="moduleDescription">Descripción:</label>
                  <textarea class="form-control" aria-label="moduleDescription"
                  :placeholder="module_description" :rows="6" :max-rows="10" readonly></textarea>
                </div>
                <div class="form-group">
                  <label for="modulePermits">Código del módulo:</label>
                  <input type="text" class="form-control" id="moduleCode" aria-describedby="moduleCode" :placeholder="module_code" readonly>
                </div>
                <div class="form-group">
                  <label for="modulePermits">Estado del módulo:</label>
                  <input type="text" class="form-control" id="moduleState" aria-describedby="moduleState" :placeholder="module_state" readonly>
                </div>
                <div class="row">
                  <div class="col">
                    <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                      <thead style="background-color: #003e1e; color:white;">
                        <tr>
                          <th scope="col">Permiso</th>
                          <th scope="col">Descripción</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for='(per, index) in module_permits' :key="index">
                          <td>{{per.name}}</td>
                          <td>{{per.description}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>&nbsp;</div>
                <div class="row justify-content-center">
                  <div class="col-8 text-center">
                    <a class="btn btn-primary" v-bind:href="module_update_url" style="background:#003e1e;border-color:#003e1e;">
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
import Multiselect from 'vue-multiselect'
import {axios} from '../../helpers/axios';
var API_IP = process.env.VUE_APP_API_IP

export default {
  components: {
    Multiselect
  },
  data () {
    return {
      module_name: "",
      module_permits: [],
      module_id: "",
      module_state: "",
      module_description: "",
      module_code: "",
      module_update_url: ""
    }
  },
  mounted () {
    axios
    .get(API_IP+'/module/'+this.$route.params.id)
    .then(response => {
      this.module_name = response.data.data.nombre
      for (var k in response.data.data.permisos){
        var permit = {
          "name" : response.data.data.permisos[k].nombre,
          "description" : response.data.data.permisos[k].descripcion
        }
        this.module_permits.push(permit)
      }
      response.data.data.activo? this.module_state="Activo" : this.module_state="Inactivo";
      this.module_description = response.data.data.descripcion
      this.module_code = response.data.data.codigo
      this.module_id = response.data.data._id
      this.module_update_url = "/modulos/"+response.data.data._id+"/actualizar"
    })
  }
}
</script>
