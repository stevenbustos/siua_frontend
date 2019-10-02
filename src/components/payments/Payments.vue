<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Pagos</li>
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
            <div class="col-10 align-self-center">
              <div class="form-group">
                <div class="row">
                  <div class="col">
                    <label for="type_payment">Seleccione tipo de pago:</label>
                  </div>
                  <div class="col">
                    <input type="radio" id="fijo" value="Fijo" v-model="tipo_pago">
                    <label for="fijo">Fijo</label>
                    <br>
                    <input type="radio" id="variable" value="Variable" v-model="tipo_pago">
                    <label for="variable">Variable</label>
                    <br>

                    <input type="radio" id="todos" value="Todos" v-model="tipo_pago">
                    <label for="tdos">Todos</label>
                    <br>

                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col">
                    <label for="interventors">Seleccione tipo de solicitud:</label>
                  </div>
                  <div class="col-6">
                    <multiselect id="box1" v-model="tipo_solicitud" :options="types_request" track-by="_id" label="nombre" :searchable="false" :close-on-select="true" :show-labels="true" placeholder="Escoja un tipo de solicitud">
                    </multiselect>
                  </div>
                </div>
              </div>

            </div>
          </div>


          <br>
          <div class="row justify-content-center">
            <div class="col-10">
              <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                <thead style="background-color: #003e1e; color:white;">
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Resolución</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="clickable-row" v-for='(solicitud, index) in filterSolicitudes' :key='index'>
                    <td><a v-bind:href="solicitud.url"> {{solicitud.contratista_nombre}} </a> </td>
                    <td>{{solicitud.numero_solicitud}}</td>
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
import {axios} from '../../helpers/axios';
var API_IP = process.env.VUE_APP_API_IP

export default {
  data () {
    return {
      types_request:[],
      tipo_solicitud:"",
      tipo_pago:"Todos",
      solicitudes:[]
    }
  },
  computed:{
    filterSolicitudes(){
      var solicitudesFilter= this.solicitudes;

      if (this.tipo_pago != "Todos" && this.tipo_pago!=null && this.tipo_pago!="") {
        solicitudesFilter = solicitudesFilter.filter( solicitud =>{
          return solicitud.tipo_pago == this.tipo_pago
        })
      }

      if (this.tipo_solicitud != null && this.tipo_solicitud !="" && this.tipo_solicitud != "Todos") {
        solicitudesFilter = solicitudesFilter.filter( solicitud =>{
          if(this.tipo_solicitud.nombre != undefined){
            return solicitud.tipo == this.tipo_solicitud.nombre
          }
        })
      }

      return solicitudesFilter
    }
  },
  methods:{
    filterTrabajadores(trabajadores){
      var person=trabajadores.filter(trabajador =>{
        return trabajador.tipo == "Contratista"
      })
      var contratista={}
      contratista["nombre_completo"] = person[0].persona.primer_nombre+" "+person[0].persona.primer_apellido
      return contratista
    }
  },
  mounted () {
    axios
    .get(API_IP+"/requesttype/").then(response => {
      for (var k in response.data.data){
        var type= {}
        type["_id"] = response.data.data[k]._id;
        type["nombre"] = response.data.data[k].nombre;
        this.types_request.push(type);
      }
      axios
      .get(API_IP+'/request',{params:'Numerado'})
      .then(response => {
        console.log(response.data.data);
        for(var k in response.data.data){
          var request = {}
          var contratista=response.data.data[k].trabajadores.filter(trabajador =>{
            return trabajador.tipo == "Contratista"
          })
          console.log(contratista);
          request["id"] = response.data.data[k]._id
          request["tipo"] = response.data.data[k].tipo_solicitud.nombre
          request["valor"] = response.data.data[k].valor_solicitud
          request["estado"] = response.data.data[k].estado
          request["url"] = "/pagos/"+response.data.data[k].tipo_pago.toLowerCase()+"s/"+response.data.data[k]._id;
          request["trabajadores"] = response.data.data[k].trabajadores
          request["contratista_nombre"]  = contratista[0].persona.primer_nombre+" "+contratista[0].persona.primer_apellido
          request["numero_solicitud"] = response.data.data[k].numero_solicitud
          request["tipo_pago"] = response.data.data[k].tipo_pago
          this.solicitudes.push(request);
        }
        console.log(this.solicitudes);
      })

    })

  }
}
</script>
