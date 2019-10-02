<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/solicitudes">Solicitudes</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{request_id}}</li>
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
                  <label for="requestName">Número de la solicitud:</label>
                  <input type="text" class="form-control" id="requestName" aria-describedby="requestName" :placeholder="request_number" readonly>
                </div>
                <div class="form-group">
                  <label for="requestType">Tipo de solicitud:</label>
                  <input type="text" class="form-control" id="requestType" aria-describedby="requestType" :placeholder="request_type" readonly>
                </div>
                <div class="form-group">
                  <label for="requestValue">Valor de la solicitud:</label>
                  <input type="text" class="form-control" id="requestValue" aria-describedby="requestValue" :placeholder="request_value" readonly>
                </div>
                <div class="form-group">
                  <label for="requestState">Estado de la solicitud:</label>
                  <input type="text" class="form-control" id="requestState" aria-describedby="requestState" :placeholder="request_state" readonly>
                </div>
                <div class="form-group">
                  <label for="requestInterventor">Interventor de la solicitud:</label>
                  <input type="text" class="form-control" id="requestInterventor" aria-describedby="requestInterventor" :placeholder="request_interventor" readonly>
                </div>
                <div class="form-group">
                  <label for="requestContratista">Contratista de la solicitud:</label>
                  <input type="text" class="form-control" id="requestContratista" aria-describedby="requestContratista" :placeholder="request_contratista" readonly>
                </div>
                <div class="form-group">
                  <label for="requestInterventor">Persona a cargo de la solicitud:</label>
                  <input type="text" class="form-control" id="requestInterventor" aria-describedby="request_personacargo" :placeholder="request_personacargo" readonly>
                </div>
                <div class="form-group">
                  <label for="requestStartDate">Fecha de inicio de la solicitud:</label>
                  <input type="text" class="form-control" id="requestStartDate" aria-describedby="request_personacargo" :placeholder="request_startdate" readonly>
                </div>
                <div class="form-group">
                  <label for="requestEndDate">fecha de fin de la solicitud:</label>
                  <input type="text" class="form-control" id="requestEndDate" aria-describedby="request_enddate" :placeholder="request_enddate" readonly>
                </div>
                <div class="form-group">
                  <label for="requestCausal">Causal de selección:</label>
                  <input type="text" class="form-control" id="requestCausal" aria-describedby="request_causal" :placeholder="request_causal" readonly>
                </div>
                <div class="form-group">
                  <label for="requestJustificacion">Justificación:</label>
                  <input type="text" class="form-control" id="requestJustificacion" aria-describedby="request_justification" :placeholder="request_justification" readonly>
                </div>
                <div class="form-group">
                  <label for="requestJustificacionAdi">Justificación adicional:</label>
                  <input type="text" class="form-control" id="requestJustificacionAdi" aria-describedby="request_aditional_justification " :placeholder="request_aditional_justification" readonly>
                </div>
                <div class="form-group">
                  <label for="requestObjetivo">Objetivo general de la contratación requerida:</label>
                  <input type="text" class="form-control" id="requestObjetivo" aria-describedby="request_objetivo " :placeholder="request_objetivo" readonly>
                </div>
                <div class="form-group">
                  <label for="requestCity">Objetivo general de la contratación requerida:</label>
                  <input type="text" class="form-control" id="requestCity" aria-describedby="request_city" :placeholder="request_city" readonly>
                </div>
                <div class="row">
                  <div class="col">
                    <label for="">Especificaciones técnicas</label>
                    <br>
                    <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                      <thead style="background-color: #003e1e; color:white;">
                        <tr>
                          <th scope="col">Descripción</th>
                          <th scope="col">Numero</th>
                          <th scope="col">Cantidad</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for='(request, index) in request_especifications' :key='index'>
                          <td>{{request.descripcion}}</td>
                          <td>{{request.numero}}</td>
                          <td>{{request.cantidad}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label for="">Obligaciones especificas del contratista</label>
                    <br>
                    <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                      <thead style="background-color: #003e1e; color:white;">
                        <tr>
                          <th scope="col">Descripción</th>
                          <th scope="col">Numero</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for='(request, index) in request_obligations' :key='index'>
                          <td>{{request.descripcion}}</td>
                          <td>{{request.numero}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="form-group">
                  <label for="requestValue">Valor de la solicitud:</label>
                  <input type="text" class="form-control" id="requestValue" aria-describedby="request_value" :placeholder="request_value" readonly>
                </div>
                <div class="row">
                  <div class="col">
                    <label for="">Rubros</label>
                    <br>
                    <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                      <thead style="background-color: #003e1e; color:white;">
                        <tr>
                          <th scope="col">Presupuesto</th>
                          <th scope="col">Rubro</th>
                          <th scope="col">Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for='(budget, index) in request_budget' :key='index'>
                          <td>{{budget.presupuesto.nombre}}</td>
                          <td>{{budget.rubro.nombre}}</td>
                          <td>{{budget.valor}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>&nbsp;</div>
                <div v-if="request_state !== 'Numerado' " class="row justify-content-center">
                  <div class="col-8 text-center">
                    <a class="btn btn-primary" v-bind:href="request_update_url" style="background:#003e1e;border-color:#003e1e;">
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
      request:"",
      request_id: "",
      request_number:  "",
      request_type: "",
      request_value: "",
      request_state: "",
      request_update_url: "",
      request_interventor:"",
      request_contratista:"",
      request_personacargo:"",
      request_startdate:"",
      request_enddate:"",
      request_causal:"",
      request_justification: "",
      request_aditional_justification: "",
      request_objetivo:"",
      request_city:"",
      request_especifications:[],
      request_obligations:[],
      request_budget:[]
    }
  },
  mounted () {
    axios
    .get(API_IP+'/request/'+this.$route.params.id)
    .then(response => {
      this.request=response.data.data
      this.request_update_url = "/solicitudes/"+response.data.data.tipo_solicitud.nombre.toLowerCase()+"/"+response.data.data._id+"/"+"actualizar"
      this.request_id = response.data.data._id
      this.request_number = response.data.data.numero_solicitud
      this.request_type = response.data.data.tipo_solicitud.nombre
      this.request_value = response.data.data.valor_solicitud
      this.request_state = response.data.data.estado
      this.request_startdate= response.data.data.fecha_inicio.substring(0,10)
      this.request_enddate = response.data.data.fecha_final.substring(0,10)
      this.request_causal= response.data.data.causal_seleccion.nombre
      this.request_justification = response.data.data.justificacion
      this.request_aditional_justification = response.data.data.justificacion_adicional
      this.request_objetivo = response.data.data.objetivo_general
      this.request_city = (response.data.data.ciudad != null)? response.data.data.ciudad.nombre : ""  ;
      this.request_especifications = response.data.data.especificaciones_tecnicas
      this.request_obligations = response.data.data.obligaciones_especificas
      this.request_budget = response.data.data.rubros
      for(var k in response.data.data.trabajadores){
        if(response.data.data.trabajadores[k].tipo =="Contratista"){
          this.request_contratista=response.data.data.trabajadores[k].persona.primer_nombre+" "+response.data.data.trabajadores[k].persona.primer_apellido
        }
        else if (response.data.data.trabajadores[k].tipo == "Interventor") {
          this.request_interventor=response.data.data.trabajadores[k].persona.primer_nombre+" "+response.data.data.trabajadores[k].persona.primer_apellido
        }
        else {
          this.request_personacargo=response.data.data.trabajadores[k].persona.primer_nombre+" "+response.data.data.trabajadores[k].persona.primer_apellido
        }
      }
    })
  }
}
</script>
