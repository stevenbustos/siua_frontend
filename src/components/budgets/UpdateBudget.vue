<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/presupuestos">Presupuesto</a></li>
            <li class="breadcrumb-item"><a v-bind:href="budget_url">{{budget_name}}</a></li>
            <li class="breadcrumb-item active" aria-current="page">Editar Presupuesto</li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-md-8 offset-md-2" style="margin-bottom:80px;">
          <div class="row">
            <div class="col">
              <button class="btn btn-primary" type="button" @click="cancel()" style="background:#003e1e;border-color:#003e1e;">
                <font-awesome-icon icon="arrow-left" size="lg"></font-awesome-icon>
              </button>
            </div>
          </div>
          <div>&nbsp;</div>
          <div class="row justify-content-center">
            <div class="col-5 align-self-center">
              <form @submit.prevent="submit" novalidate>
                <div class="form-group">
                  <label for="budgetName">Nombre del presupuesto:</label>
                  <input type="text" class="form-control" id="budgetName" aria-describedby="budgetName" :placeholder="budget_name" readonly>
                </div>
                <div class="form-group">
                  <label for="budgetDependency">Dependencia:</label>
                  <input type="text" class="form-control" id="budgetDependency" aria-describedby="budgetDependency" :placeholder="budget_dependence.name" readonly>
                </div>
                <div class="form-group">
                  <label for="budgetYear">Año:</label>
                  <input type="number" class="form-control" id="budgetYear" aria-describedby="budgetYear" :placeholder="budget_year" readonly>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.budget_value.$error }">
                  <label for="budgetValue">Valor:</label>
                  <input v-model.trim="$v.budget_value.$model" type="number" class="form-control" id="budgetValue" aria-describedby="budgetValue" placeholder="Valor">
                  <div class="alert alert-danger" role="alert" v-if="$v.budget_value.$dirty && !$v.budget_value.required">Es requerido un valor</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.budget_entries.$error }">
                  <label for="budgetEntries">Rubros:</label>
                  <multiselect v-model.trim="$v.budget_entries.$model" :options="entries" :multiple="true" :close-on-select="true" :clear-on-select="false" :hide-selected="true" :preserve-search="true" placeholder="Seleccione los rubros" label="name" track-by="rubro" :preselect-first="false">
                  </multiselect>
                  <div class="alert alert-danger" role="alert" v-if="$v.budget_entries.$dirty && !$v.budget_entries.required">Es requerido minimo un rubro</div>
                </div>
                <div v-for='(entrie, index) in budget_entries' :key='index' class="form-group">
                  <label for="entryValue">Asignar valor a {{entrie.name}}</label>
                  <input v-model="entrie.valor" type="number" class="form-control" id="entryValue" aria-describedby="entryValue" placeholder="Valor del rubro">
                </div>
                <div>&nbsp;</div>
                <div class="row justify-content-center">
                  <div class="col-4 text-center">
                    <button class="btn btn-primary" type="submit" :disabled="submitting" style="background:#003e1e;border-color:#003e1e;">
                      <font-awesome-icon icon="save" size="lg"></font-awesome-icon>
                      Guardar
                    </button>
                  </div>
                  <div class="col-4 text-center">
                    <button type="button" @click="cancel()" class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;">
                      <font-awesome-icon icon="times-circle" size="lg"></font-awesome-icon>
                      Cancelar
                    </button>
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
import Multiselect from 'vue-multiselect'
import {axios} from '../../helpers/axios';
import { required } from 'vuelidate/lib/validators'
var API_IP = process.env.VUE_APP_API_IP

export default {
  components: {
    Multiselect
  },
  data () {
    return {
      dependencies: [],
      entries: [],
      budget_name: "",
      budget_dependence: {},
      budget_value: "",
      budget_year: "",
      budget_entries: [],
      budget_entries_value: [],
      budget_url: "",
      submitting: false
    }
  },
  validations: {
    budget_value: {
      required
    },
    budget_entries: {
      required
    }
  },
  mounted () {
    axios
    .get(API_IP+'/budget/'+this.$route.params.id)
    .then(response => {
      this.budget_auditoria = response.data.data.auditoria
      this.budget_id = response.data.data._id
      this.budget_name = response.data.data.nombre
      this.budget_dependence["_id"] = response.data.data.dependencia._id
      this.budget_dependence["name"] = response.data.data.dependencia.nombre
      this.budget_year = response.data.data.año
      this.budget_value = response.data.data.valor
      this.budget_url = "/presupuestos/"+response.data.data._id

      var entriesTmp = []
      for (var j in response.data.data.rubros){
        var entryTmp = {}
        entryTmp["_id"] = response.data.data.rubros[j]._id
        entryTmp["rubro"] = response.data.data.rubros[j].rubro._id
        entryTmp["name"] = response.data.data.rubros[j].rubro.nombre
        entryTmp["valor"] = parseInt(response.data.data.rubros[j].valor)
        entriesTmp.push(entryTmp)
      }
      this.budget_entries = entriesTmp

      axios
      .get(API_IP+"/entry/")
      .then(response => {
        for (var k in response.data.data){
          var entry = {}
          entry["rubro"] = response.data.data[k]._id;
          entry["name"] = response.data.data[k].nombre;
          this.entries.push(entry);
        }
      });
    })
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$swal({
          title: 'Error!',
          text: 'Debe llenar campos necesarios en el formulario',
          type: 'error',
          confirmButtonText: 'Cerrar'
        });
      } else {
        this.submitting = true
        this.budget_entries.map(obj =>{
          var rObj = obj;
          rObj["valor"] = parseInt(obj.valor);
          return rObj
        })
        axios
        .put(API_IP+"/budget/"+this.$route.params.id, {
          auditoria: this.budget_auditoria,
          _id: this.budget_id,
          valor: parseInt(this.budget_value),
          rubros: this.budget_entries
        })
        .then(response => {
          console.log(response);
          this.$swal({
            title: 'Exito!',
            text: 'Se creo el presupuesto satisfactoriamente.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.value) {
              this.submitting = false;
              this.$router.push({ name: 'showbudget', params: { id: this.budget_id} });
            }
          });
        })
        .catch(error => {
          console.log(error);
          this.$swal({
            title: 'Error!',
            text: error.response.data.error.msg,
            type: 'error',
            confirmButtonText: 'Cerrar'
          });
          this.submitting = false;
        });
      }
    },
    cancel(){
      this.$v.$reset()
      this.$swal({
        title: 'Espere',
        text: '¿Esta seguro que quiere cancelar la operación?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.value) {
          this.$swal({
            title: 'Cancelado',
            type: 'success'
          }).then((result) => {
            if (result.value) {
              this.$router.push({ name: 'showbudget', params: { id: this.budget_id} });
            }
          });
        }
      });
    }
  }
}
</script>
