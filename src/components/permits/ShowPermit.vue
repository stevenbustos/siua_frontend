<template>
  <div class="container-fluid">
    <!-- Vista si no tiene permisos -->
    <div v-if="renderPermit == false" style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-md-8 offset-md-2" style="margin-bottom:80px;">
          <div class="row justify-content-md-center" style="margin-top:10px; margin-bottom: 10px;">
            <img src="@/assets/images/denied-access.png" style="width:20%; height:50%;" alt="AccesoDenegado">
          </div>
          <div class="card text-center" style="background-color: rgba(255, 255, 255, 0.4);">
            <div class="card-body">
              <h1 class="card-title">Acceso denegado.</h1>
              <p class="card-text">
                No tiene permiso para ver esta información.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Vista si tiene permisos -->
    <div v-if="renderPermit == true" style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/permisos">Permisos</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{permit_name}}</li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-md-8 offset-md-2" style="margin-bottom:80px;">
          <div class="row">
            <div class="col">
              <a class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" href="/permisos">
                <font-awesome-icon icon="arrow-left" size="lg"></font-awesome-icon>
              </a>
            </div>
          </div>
          <div>&nbsp;</div>
          <div class="row justify-content-center">
            <div class="col-5 align-self-center">
              <form>
                <div class="form-group">
                  <label for="permitName">Nombre del permiso:</label>
                  <input type="text" class="form-control" id="permitName" aria-describedby="permitName" :placeholder="permit_name" readonly>
                </div>
                <div class="form-group">
                  <label for="permitDescription">Descripción:</label>
                  <textarea class="form-control" aria-label="permitDescription"
                  :placeholder="description" :rows="6" :max-rows="10" readonly></textarea>
                </div>
                <div class="form-group">
                  <label for="permitName">Código del permiso:</label>
                  <input type="number" class="form-control" id="permitCode" aria-describedby="permitCode" :placeholder="code" readonly>
                </div>
                <div class="form-group">
                  <label for="permitName">Estado del permiso:</label>
                  <input type="text" class="form-control" id="permitState" aria-describedby="permitState" :placeholder="permit_state" readonly>
                </div>
                <div v-if="permitPermits[3]" class="row justify-content-center">
                  <div class="col-8 text-center">
                    <a class="btn btn-primary" v-bind:href="permit_update_url" style="background:#003e1e;border-color:#003e1e;">
                      <font-awesome-icon icon="save" size="lg"></font-awesome-icon>
                      Editar
                    </a>
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
import {verifyPermits, viewIdPermits} from '../../helpers/axios';

export default {
  data () {
    return {
      permit_id: "",
      permit_name: "",
      description: "",
      code: "",
      permit_state: "",
      permit_update_url: "",
      permitPermits: [],
      renderPermit: false
    }
  },
  mounted(){
    this.itemRender();
    this.verifyPermits();
  },
  methods: {
    async itemRender() {
      this.viewIdPermit = await viewIdPermits(0, 1, this.$route.params.id);
      if (this.viewIdPermit.data == 0){
        this.renderPermit = false
        this.$swal({
          title: 'Error',
          html: 'Usted no tiene permiso para ver esto',
          type: 'error',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.value) {
            this.$swal({
              title: 'Redireccionando al inicio',
              type: 'success'
            }).then((result) => {
              if (result.value) {
                this.$router.push({ name: 'home' });
              }
            });
          }
        });
      } else {
        this.renderPermit = true
        this.permit_id = this.viewIdPermit.data._id;
        this.permit_name = this.viewIdPermit.data.nombre;
        this.description = this.viewIdPermit.data.descripcion;
        this.code = this.viewIdPermit.data.codigo;
        this.viewIdPermit.data.activo? this.permit_state="Activo" : this.permit_state="Inactivo";
        this.permit_update_url = "/permisos/"+this.viewIdPermit.data._id+"/actualizar"
      }
    },
    async verifyPermits(){
      var permitAll = [0,1,2,3,4];
      this.permitPermits = await verifyPermits(0, permitAll);
    }
  }
}
</script>
