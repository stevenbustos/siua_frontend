<template>
  <div class="container-fluid">
    <div v-if="!permitSolicitudes">
      <p>No tiene permiso</p>
    </div>
    <div v-if="permitSolicitudes[0]" style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Solicitudes</li>
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
            <div class="col-auto">
              <button v-if="permitODS[2] || permitODC[2] || permitATI[2]" type="button" class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" @click="create()">
                <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                Crear
              </button>
            </div>
          </div>
          <div>&nbsp;</div>

          <div v-if="permitODS[0]">
            <div class="row">
              <div class="col-auto mr-auto">
                <h2 style="color:#003e1e">
                  ODS
                </h2>
              </div>
              <!-- TODO Hacer con props-->
              <!-- <div class="col-auto">
                <button type="button" class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" @click="create()">
                  <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                  Crear
                </button>
              </div> -->
            </div>
            <br>
            <div class="row">
              <div class="col">
                <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                  <thead style="background-color: #003e1e; color:white;">
                    <tr>
                      <th v-if="permitODS[1]" scope="col">Acción</th>
                      <th scope="col">Tipo de solicitud</th>
                      <th scope="col">Valor</th>
                      <th scope="col">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="clickable-row" v-for='(ods, index) in odss' :key='index'>
                      <td v-if="permitODS[1]"><a v-bind:href="ods.url"><font-awesome-icon icon="eye" size="lg"></font-awesome-icon></a></td>
                      <td>{{ods.type}}</td>
                      <td>{{ods.value}}</td>
                      <td>{{ods.state}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>&nbsp;</div>
          <div>&nbsp;</div>

          <div v-if="permitODC[0]">
            <div class="row">
              <div class="col-auto mr-auto">
                <h2 style="color:#003e1e">
                  ODC
                </h2>
              </div>
              <!-- <div class="col-auto">
                <button type="button" class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" @click="create()">
                  <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                  Crear
                </button>
              </div> -->
            </div>
            <br>
            <div class="row">
              <div class="col">
                <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                  <thead style="background-color: #003e1e; color:white;">
                    <tr>
                      <th v-if="permitODC[1]" scope="col">Acción</th>
                      <th scope="col">Tipo de solicitud</th>
                      <th scope="col">Valor</th>
                      <th scope="col">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="clickable-row" v-for='(odc, index) in odcs' :key='index'>
                      <td v-if="permitODC[1]"><a v-bind:href="odc.url"><font-awesome-icon icon="eye" size="lg"></font-awesome-icon></a></td>
                      <td>{{odc.type}}</td>
                      <td>{{odc.value}}</td>
                      <td>{{odc.state}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>&nbsp;</div>
          <div>&nbsp;</div>

          <div v-if="permitATI[0]">
            <div class="row">
              <div class="col-auto mr-auto">
                <h2 style="color:#003e1e">
                  ATI
                </h2>
              </div>
              <div class="col-auto">
                <button type="button" class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" @click="create()">
                  <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                  Crear
                </button>
              </div>
            </div>
            <br>
            <div class="row">
              <div class="col">
                <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                  <thead style="background-color: #003e1e; color:white;">
                    <tr>
                      <th scope="col">Acción</th>
                      <th scope="col">Tipo de solicitud</th>
                      <th scope="col">Valor</th>
                      <th scope="col">Estado</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr class="clickable-row" v-for='(ati, index) in atis' :key='index'>
                      <td><a v-bind:href="ati.url"><font-awesome-icon icon="eye" size="lg"></font-awesome-icon></a></td>
                      <td>{{ati.type}}</td>
                      <td>{{ati.value}}</td>
                      <td>{{ati.state}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {axios,verifyPermits,requestModulePermit} from '../../helpers/axios';
var API_IP = process.env.VUE_APP_API_IP

var headersDic = {};
headersDic[process.env.VUE_APP_KEY_HEADER_NAME] = process.env.VUE_APP_KEY_HEADER_CONTENT;
headersDic[process.env.VUE_APP_TOKEN_HEADER_NAME] = "";
headersDic[process.env.VUE_APP_MODULE_HEADER_NAME] = 8;

export default {
  data () {
    return {
      tiposSolicitud:[],
      permitAll:[0,1,2,3,4],
      permitSolicitudes:[],
      permitODS:[],
      permitODC:[],
      permitATI:[],
      odss: [],
      odcs: [],
      atis: []
    }
  },
  mounted () {
    this.verifyAllPermits()
  },
  methods: {
    async loadRequest(id,type){
      let tmp;
      if (type == "ODS") {
        tmp=await requestModulePermit(9,0,{tipo_solicitud:id})
        for(var k in tmp){
            var request = {}
            request["id"] = tmp[k]._id
            request["type"] = tmp[k].tipo_solicitud.nombre
            request["value"] = tmp[k].valor_solicitud
            request["state"] = tmp[k].estado
            request["url"] = "/solicitudes/"+tmp[k].tipo_solicitud.nombre.toLowerCase()+"/"+tmp[k]._id;
            this.odss.push(request);
          }
      }
      else if (type == "ODC") {
        tmp=await requestModulePermit(10,0,{tipo_solicitud:id})
        for(var k in tmp){
            var request = {}
            request["id"] = tmp[k]._id
            request["type"] = tmp[k].tipo_solicitud.nombre
            request["value"] = tmp[k].valor_solicitud
            request["state"] = tmp[k].estado
            request["url"] = "/solicitudes/"+tmp[k].tipo_solicitud.nombre.toLowerCase()+"/"+tmp[k]._id;
            this.odcs.push(request);
          }

      }
      else if (type == "ATI") {
        tmp=await requestModulePermit(11,0,{tipo_solicitud:id})
        for(var k in tmp){
            var request = {}
            request["id"] = tmp[k]._id
            request["type"] = tmp[k].tipo_solicitud.nombre
            request["value"] = tmp[k].valor_solicitud
            request["state"] = tmp[k].estado
            request["url"] = "/solicitudes/"+tmp[k].tipo_solicitud.nombre.toLowerCase()+"/"+tmp[k]._id;
            this.atis.push(request);
          }
      }
    },
    create(){
      this.$router.push({ name: 'createrequest'});
    },
    async verifyAllPermits(){
      this.permitSolicitudes = await verifyPermits(8,this.permitAll)
      this.permitODS=await verifyPermits(9,this.permitAll)
      this.permitODC=await verifyPermits(10,this.permitAll)
      this.permitATI=await verifyPermits(11,this.permitAll)


      if (this.permitSolicitudes.valid == -1) {
        // alert("SESION CADUCO")
      }
      else if(!this.permitSolicitudes[0]) {
        // alert("NO TIENE PERMISO")
      }
      else {
        this.tiposSolicitud=await requestModulePermit(205,0)
        for(var k in this.tiposSolicitud){
          await this.loadRequest(this.tiposSolicitud[k]._id,this.tiposSolicitud[k].nombre)
        }
      }


    }
  }
}
</script>
