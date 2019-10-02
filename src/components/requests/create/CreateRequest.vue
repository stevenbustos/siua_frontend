<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/solicitudes">Solicitudes</a></li>
            <li class="breadcrumb-item active" aria-current="page">Nueva solicitud</li>
          </ol>
        </nav>
      </div>
      <form>
        <div v-if="step === 1">
          <create-request-a
          :stp="step"
          @saveObject="object =  $event"
          @msgChanged="message  = $event"
          @changeInter="interventor = $event"
          @changeContra="contratista = $event"
          @changeStartRequestD="fecha_inicio_contrato = $event"
          @changeEndRequestD="fecha_fin_contrato = $event"
          @changeTotalD="dias_totales = $event"
          @changeCausal="causal = $event"
          @changeClausulas="clausulas = $event"
          @changePerson="persona_cargo = $event"
          @changeRequestT="tipo_solicitud_select = $event"
          @nextStep="changeStep"
          ></create-request-a>
        </div>

        <div v-if="step === 2">
          <create-request-b
          :stp="step"
          :object="object.res.obj.data"
          @saveObject="object =  $event"
          @changeJustif="justificacion = $event"
          @changeAditionalJustif="justificacion_adicional = $event"
          @changeGeneralObj="objetivo_general = $event"
          @changePlac="ciudad = $event"
          @nextStep="changeStep"
          @prevStep="changeStep"
          ></create-request-b>
        </div>

        <div v-if="step === 3">
          <create-request-c
          :stp="step"
          :object="object.res.obj.data"
          @saveObject="object =  $event"
          @nextStep="changeStep"
          @prevStep="changeStep"
          ></create-request-c>
        </div>


        <div v-if="step === 4">
          <create-request-d
          :stp="step"
          :object="object.res.obj.data"
          @saveObject="object =  $event"
          @changeObliga="obligaciones = $event"
          @nextStep="changeStep"
          @prevStep="changeStep"
          ></create-request-d>
        </div>

        <div v-if="step === 5">
          <create-request-e
          :stp="step"
          :object="object.res.obj.data"
          @saveObject="object =  $event"
          @nextStep="changeStep"
          @prevStep="changeStep"
          @changeRequestVal = "valor_solicitud = $event"
          @changeBudRequest = "budget_request = $event"
          ></create-request-e>
        </div>

        <div v-if="step === 6">
          <create-request-f
          :stp="step"
          :object="object.res.obj.data"
          @prevStep="changeStep"
          ></create-request-f>
        </div>
      </form>
      <br/><br/>
    </div>
  </div>
</template>

<script>
import CreateRequestA from './CreateRequestA.vue'
import CreateRequestB from './CreateRequestB.vue'
import CreateRequestC from './CreateRequestC.vue'
import CreateRequestD from './CreateRequestD.vue'
import CreateRequestE from './CreateRequestE.vue'
import CreateRequestF from './CreateRequestF.vue'

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
      justificacion:"",
      justificacion_adicional:"",
      objetivo_general:"",
      request_value: "",
      budget_request: [],
      ciudad:"",
      especificaciones:[],
      obligaciones:[],
      valor_solicitud:"",
      tipo_solicitud_select:{}
    }
  },
  components: {
    'create-request-a': CreateRequestA,
    'create-request-b': CreateRequestB,
    'create-request-c': CreateRequestC,
    'create-request-d': CreateRequestD,
    'create-request-e': CreateRequestE,
    'create-request-f': CreateRequestF
  },
  methods:{
    changeStep(value){
      this.step = value;
    },
    prev() {
      this.step--;
    },
    next() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        alert("Error en el formulario")
      } else {
        this.step++;
      }
    },
    submit: function() {
      this.especificaciones.map(obj =>{
        var rObj = obj;
        rObj["descripcion"] = parseInt(obj.descripcion);
        rObj["numero"] = parseInt(obj.numero);
        rObj["cantidad"] = parseInt(obj.cantidad);
        return rObj
      })
      this.obligaciones.map(obj =>{
        var rObj = obj;
        rObj["numero"] = parseInt(obj.number);
        rObj["descripcion"] = obj.descripcion;
        return rObj
      })
    }
  }
}
</script>
