<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/solicitudes">Solicitudes</a></li>
            <li class="breadcrumb-item"><a v-bind:href="request_type_url">{{request_type}}</a></li>
            <li class="breadcrumb-item"><a v-bind:href="request_url">{{request_id}}</a></li>
            <li class="breadcrumb-item active" aria-current="page">Actualizar Solicitud</li>
          </ol>
        </nav>
      </div>
      <form>

        <div v-if="step === 1">
          <update-request-a
          :stp="step"
          @request_id="request_id = $event"
          @request_url="request_url = $event"
          @request_type="request_type = $event"
          @request_type_url="request_type_url = $event"
          @request_value="request_value = $event"
          @nextStep="changeStep"
          ></update-request-a>
        </div>

        <div v-if="step === 2">
          <update-request-b
          :stp="step"
          @nextStep="changeStep"
          @prevStep="changeStep"
          ></update-request-b>
        </div>

        <div v-if="step === 3">
          <update-request-c
          :stp="step"
          @nextStep="changeStep"
          @prevStep="changeStep"
          ></update-request-c>
        </div>


        <div v-if="step === 4">
          <update-request-d
          :stp="step"
          @nextStep="changeStep"
          @prevStep="changeStep"
          ></update-request-d>
        </div>

        <div v-if="step === 5">
          <update-request-e
          :stp="step"
          @nextStep="changeStep"
          @prevStep="changeStep"
          ></update-request-e>
        </div>

        <div v-if="step === 6">
          <update-request-f
          :stp="step"
          :value="request_value"
          @prevStep="changeStep"
          ></update-request-f>
        </div>
      </form>
      <br/><br/>
    </div>
  </div>
</template>

<script>
import UpdateRequestA from './UpdateRequestA.vue'
import UpdateRequestB from './UpdateRequestB.vue'
import UpdateRequestC from './UpdateRequestC.vue'
import UpdateRequestD from './UpdateRequestD.vue'
import UpdateRequestE from './UpdateRequestE.vue'
import UpdateRequestF from './UpdateRequestF.vue'

export default {
  data() {
    return {
      object:"",
      step:1,
      interventor:"",
      contratista:"",
      fecha_inicio_contrato:"",
      fecha_fin_contrato:"",
      dias_totales:"",
      causal:"",
      persona_cargo:"",
      clausulas:[],
      message:"hola",
      justificacion:"",
      justificacion_adicional:"",
      objetivo_general:"",
      budget_request: [],
      ciudad:"",
      especificaciones:[],
      obligaciones:[],
      valor_solicitud:"",
      tipo_solicitud_select:{},

      request:"",
      request_url:"",
      request_type_url:"",
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
  components: {
    'update-request-a': UpdateRequestA,
    'update-request-b': UpdateRequestB,
    'update-request-c': UpdateRequestC,
    'update-request-d': UpdateRequestD,
    'update-request-e': UpdateRequestE,
    'update-request-f': UpdateRequestF
  },
  methods:{
    changeStep(value){
      this.step = value;
    }
  }
}
</script>
