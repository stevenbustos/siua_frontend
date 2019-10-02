<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/roles">Roles</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{rol_name}}</li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-md-8 offset-md-2" style="margin-bottom:80px;">
          <div class="row">
            <div class="col">
              <a class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" href="/roles">
                <font-awesome-icon icon="arrow-left" size="lg"></font-awesome-icon>
              </a>
            </div>
          </div>
          <div>&nbsp;</div>
          <div class="row justify-content-center">
            <div class="col-5 align-self-center">
              <form>
                <div class="form-group">
                  <label for="rolName">Nombre del rol:</label>
                  <input type="text" class="form-control" id="rolName" aria-describedby="rolName" :placeholder="rol_name" readonly>
                </div>
                <div class="row">
                  <div class="col">
                    <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                      <thead style="background-color: #003e1e; color:white;">
                        <tr>
                          <th scope="col">Modulos</th>
                          <th scope="col" :colspan="table_length">Permisos</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for='(mod, index) in rol_modules' :key="index">
                          <td>{{mod.name}}</td>
                          <td v-for='(per, index) in mod.permisos' :key="index">{{per.name}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="form-group">
                  <label for="rolStates">Estado del rol:</label>
                  <input type="text" class="form-control" id="rolStates" aria-describedby="rolStates" :placeholder="rol_state" readonly>
                </div>
                <div class="form-group">
                  <label for="permitDescription">Descripción:</label>
                  <textarea class="form-control" aria-label="permitDescription"
                  :placeholder="rol_description" :rows="6" :max-rows="10" readonly></textarea>
                </div>
                <div>&nbsp;</div>
                <div class="row justify-content-center">
                  <div class="col-8 text-center">
                    <a class="btn btn-primary" v-bind:href="rol_update_url" style="background:#003e1e;border-color:#003e1e;">
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
      rol_name: "",
      rol_modules: [],
      rol_id: "",
      rol_state:"",
      rol_description: "",
      rol_update_url: "",
      table_length: 0
    }
  },
  mounted () {
    axios
    .get(API_IP+'/rol/'+this.$route.params.id)
    .then(response => {
      this.rol_name = response.data.data.nombre
      if (response.data.data.activo) {this.rol_state = "Activo"} else {this.rol_state ="Inactivo"}
      this.rol_description = response.data.data.descripcion
      this.rol_id = response.data.data._id
      for (var k in response.data.data.modulos){
        var mod = {}
        mod["name"] = response.data.data.modulos[k].modulo.nombre
        mod["permisos"] = []
        for (var j in response.data.data.modulos[k].permisos){
          var per = {}
          per["name"] = response.data.data.modulos[k].permisos[j].nombre
          mod["permisos"].push(per)
        }
        if (this.table_length < mod.permisos.length){
          this.table_length = mod.permisos.length
        }
        this.rol_modules.push(mod)
      }
      this.rol_update_url = "/roles/"+response.data.data._id+"/actualizar"
    })
  }
}

</script>
