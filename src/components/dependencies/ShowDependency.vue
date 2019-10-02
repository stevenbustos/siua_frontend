<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/dependencias">Dependencias</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{dependence_name}}</li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-md-8 offset-md-2" style="margin-bottom:80px;">
          <div class="row">
            <div class="col">
              <a class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" href="/dependencias">
                <font-awesome-icon icon="arrow-left" size="lg"></font-awesome-icon>
              </a>
            </div>
          </div>
          <div>&nbsp;</div>
          <div class="row justify-content-center">
            <div class="col-5 align-self-center">
              <form>
                <div class="form-group">
                  <label for="dependencyName">Nombre de la dependencia:</label>
                  <input type="text" class="form-control" id="dependencyName" aria-describedby="dependencyName" :placeholder="dependence_name" readonly>
                </div>
                <div class="form-group">
                  <label for="dependencyDirector">Director de la dependencia:</label>
                  <input type="text" class="form-control" aria-describedby="dependencyDirector" id="dependencyDirector" :placeholder="name_director" readonly>
                </div>
                <div class="form-group">
                  <label for="directorType">Correo del director:</label>
                  <input  type="text" id="directorEmail" class="form-control" aria-describedby="directorEmail" :placeholder="director_email" readonly>
                </div>
                <div class="form-group">
                  <label for="directorType">Tipo de director:</label>
                  <input  type="text" id="directorType" class="form-control" aria-describedby="directorType" :placeholder="director_type" readonly>
                </div>
                <div class="form-group">
                  <label for="resolutionNumber">Número de la resolución:</label>
                  <input type="text" class="form-control" id="resolutionNumber" aria-describedby="resolutionNumber" :placeholder="resolution_number" readonly>
                </div>
                <div class="form-group">
                  <label for="resolutionDate">Fecha de la resolución:</label>
                  <input type="text" class="form-control" id="resolutionDate" aria-describedby="resolutionDate" :placeholder="resolution_date" readonly>
                </div>
                <div class="form-group">
                  <label for="quipu">Número QUIPU:</label>
                  <input type="text" class="form-control" id="quipu" aria-describedby="quipu" :placeholder="quipu" readonly>
                </div>
                <div class="form-group">
                  <label for="dependenceDescription">Descripción:</label>
                  <textarea class="form-control" aria-label="dependenceDescription"
                  :placeholder="description" :rows="6" :max-rows="10" readonly></textarea>
                </div>
                <div>&nbsp;</div>
                <div class="row justify-content-center">
                  <div class="col-8 text-center">
                    <a class="btn btn-primary" v-bind:href="dependence_update_url" style="background:#003e1e;border-color:#003e1e;">
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
      dependence_name:"",
      name_director:"",
      resolution_number:"",
      director_email: "",
      director_type:"",
      resolution_date:"",
      dependency_id:"",
      quipu: "",
      description: "",
      dependence_update_url: ""
    }
  },
  mounted () {
    axios
    .get(API_IP+'/dependence/'+this.$route.params.id)
    .then(response => {
      this.dependency_id = response.data.data._id
      this.dependence_name = response.data.data.nombre

      if (response.data.data.director!== undefined && response.data.data.director !== null) {
        this.name_director = response.data.data.director.primer_nombre+" "+response.data.data.director.segundo_nombre+" "+response.data.data.director.primer_apellido+" "+response.data.data.director.segundo_apellido
        this.director_email = response.data.data.director.correo_electronico
      }else {
        this.name_director = "Sin asignar"
        this.director_email = "Sin asignar"
      }

      this.resolution_number = response.data.data.resolucion_numero
      this.director_type =(response.data.data.director_tipo !== undefined &&  response.data.data.director_tipo !== null)?  response.data.data.director_tipo : "Sin asignar"
      console.log(response.data.data.director_tipo);
      this.resolution_date = response.data.data.resolucion_fecha.substring(0,10)
      this.quipu = response.data.data.quipu_codigo
      this.description = response.data.data.descripcion
      this.dependence_update_url = "/dependencias/"+response.data.data._id+"/actualizar"
    })
  }
}
</script>
