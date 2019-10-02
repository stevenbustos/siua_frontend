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
            <li class="breadcrumb-item active" aria-current="page">Permisos</li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-md-8 offset-md-2" style="margin-bottom:80px;">
          <div class="row">
            <div class="col">
              <a class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" href="/">
                <font-awesome-icon icon="arrow-left" size="lg"></font-awesome-icon>
              </a>
            </div>
          </div>
          <div>&nbsp;</div>
          <div v-if="permitPermits[2]" class="row">
            <div class="col-auto mr-auto">
              <a class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" href="/permisos/crear">
                <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                Nuevo permiso
              </a>
            </div>
          </div>
          <div>&nbsp;</div>
          <div class="row">
            <div class="col">
              <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                <thead style="background-color: #003e1e; color:white;">
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Código</th>
                    <th scope="col">Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for='(permit, index) in permits' :key='index'>
                    <td v-if="permitPermits[1]"><a v-bind:href="permit.url">{{permit.name}}</a></td>
                    <td v-if="!permitPermits[1]">{{permit.name}}</td>
                    <td>{{permit.codigo}}</td>
                    <td>{{permit.description}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {singlePermits, verifyPermits} from '../../helpers/axios';

export default {
  data () {
    return {
      permits: [],
      permitPermits: [],
      renderPermit: false
    }
  },
  mounted () {
    this.gridRender();
    this.verifyPermits();
  },
  methods: {
    async gridRender(){
      this.permitPermit = await singlePermits(0, 0);
      if (this.permitPermit.data == 0) {
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
        for(var k in this.permitPermit.data) {
          var permit = {}
          permit["name"] = this.permitPermit.data[k].nombre;
          permit["codigo"] = this.permitPermit.data[k].codigo;
          permit["description"] = this.permitPermit.data[k].descripcion;
          permit["url"] = "/permisos/"+this.permitPermit.data[k]._id;
          this.permits.push(permit);
        }
      }
    },
    async verifyPermits(){
      var permitAll = [0,1,2,3,4];
      this.permitPermits = await verifyPermits(0, permitAll);
    }
  }
}
</script>
