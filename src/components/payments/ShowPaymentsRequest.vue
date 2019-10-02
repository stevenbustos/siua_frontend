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
        <div class="col-md-10 offset-md-1" style="margin-bottom:80px;">
          <div class="row">
            <div class="col">
              <button onclick="window.history.back();" class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;">
                <font-awesome-icon icon="arrow-left" size="lg"></font-awesome-icon>
              </button>
            </div>
          </div>
          <div>&nbsp;</div>
          <modal name="update-pay-variable" :adaptive="true" :scrollable="true" width="50%" height="auto">
            <update-pay-variable
            :hide_modal="modal_show"
            @modalShow="closeModalUpdatePayVaribale"
            :id_pay="id_pay"
            ></update-pay-variable>
          </modal>
          <br>
          <div class="row justify-content-center">
            <div class="col-12">
              <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                <thead style="background-color: #003e1e; color:white;">
                  <tr>
                    <th scope="col">Numero</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">No. Planilla</th>
                    <th scope="col">Fecha de pago de planilla</th>
                    <th scope="col">ORPA</th>
                    <th scope="col">Estado</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="clickable-row" v-for='(pay, index) in payments_get.concat(payments)' :key='index'>
                    <td>
                      {{pay.numero=index+1}}
                    </td>
                    <td>
                      {{pay.valor}}
                    </td>
                    <td>
                      {{pay.fecha}}
                    </td>
                    <td>
                      {{pay.planillas[0].planilla_numero}}
                    </td>
                    <td>
                      {{pay.planillas[0].planilla_fecha}}
                    </td>
                    <td>
                      {{pay.numero_ORPA}}
                    </td>
                    <td>
                      {{pay.estado}}
                    </td>
                    <td>
                      <button v-if="pay.estado !== 'Pagado'" type="button" class="btn btn-primary" v-on:click="showModalUpdatePayVaribale(pay._id)" style="background:#003e1e;border-color:#003e1e;">
                        <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                      </button>
                    </td>
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
import UpdatePaymentModal from '../payments/UpdatePaymentModal.vue'

var API_IP = process.env.VUE_APP_API_IP

export default {
  components: {
    'update-pay-variable': UpdatePaymentModal
  },
  data () {
    return {
      types_request:[],
      tipo_solicitud:"",
      payments_get:[],
      payments:[],
      modal_show:false,
      id_pay:"",
      pay:{
        numero:"",
        valor:"",
        fecha:"",
        planillas:[
          {
            planilla_numero:"",
            planilla_fecha:""
          }
        ],
        numero_ORPA:"",
        solicitud:this.$route.params.id
      }
    }
  },
  mounted () {
    axios
    .get(API_IP+'/payment/', {params: this.$route.params.id })
    .then(response => {
      console.log(response);
      for (var k in response.data.data){
        var pay={}
        pay['_id']=response.data.data[k]._id
        pay['estado']=response.data.data[k].estado
        pay['numero']=response.data.data[k].numero
        pay['fecha']=response.data.data[k].fecha
        pay['valor']=response.data.data[k].valor
        pay['solicitud']=response.data.data[k].solicitud
        pay['planillas'] = (response.data.data[k].planillas.length != 0)? response.data.data[k].planillas : [{planilla_fecha:"",planilla_numero:""}]
        pay['numero_ORPA'] = response.data.data[k].numero_ORPA
        pay['auditoria'] =response.data.data[k].auditoria
        this.payments_get.push(pay)
      }
    })
  },
  computed:{

  },
  methods:{
    showModalUpdatePayVaribale(id_pay) {
      this.id_pay=id_pay;
      this.modal_show = false;
      this.$modal.show('update-pay-variable');
    },
    closeModalUpdatePayVaribale (value) {
      this.modal_show = value;
      if(this.modal_show === true){
        this.$modal.hide('update-pay-variable');
        location.reload();
      }
    },
    addPay(){
      this.payments.push(this.pay)
      this.pay ={
        numero:"",
        valor:"",
        fecha:"",
        planillas:[
          {
            planilla_numero:"",
            planilla_fecha:""
          }
        ],
        numero_ORPA:"",
        solicitud:this.$route.params.id
      }
    }
  }
}
</script>
