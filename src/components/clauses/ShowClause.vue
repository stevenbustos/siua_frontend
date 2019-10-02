<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/clausulas">Clausulas</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{name}}</li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-md-8 offset-md-2" style="margin-bottom:80px;">
          <div class="row">
            <div class="col">
              <button onclick="window.history.back();" class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;">
                <font-awesome-icon icon="arrow-left" size="lg"></font-awesome-icon>
              </button>
            </div>
          </div>
          <div>&nbsp;</div>
          <div class="row justify-content-center">
            <div class="col-5 align-self-center">
              <form>
                <div class="form-group">
                  <label for="clauseName">Nombre:</label>
                  <input type="text" class="form-control" id="clauseName" aria-describedby="clauseName" :placeholder="name" readonly>
                </div>
                <div class="form-group">
                  <label for="clauseDescription">Descripción</label>
                  <textarea class="form-control" aria-label="clauseDescription"
                  :placeholder="description" :rows="6" :max-rows="10" readonly></textarea>
                </div>
                <div>&nbsp;</div>
                <div class="row justify-content-center">
                  <div class="col-8 text-center">
                    <a class="btn btn-primary" v-bind:href="clause_update_url" style="background:#003e1e;border-color:#003e1e;">
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
      name: "", description: "",
      clause_update_url: ""
    }
  },
  mounted () {
    axios
    .get(API_IP+'/clause/'+this.$route.params.id)
    .then(response => {
      this.name = response.data.data.nombre
      this.description = response.data.data.descripcion
      this.clause_update_url = "/clausulas/"+response.data.data._id+"/actualizar"
    })
  }
}
</script>
