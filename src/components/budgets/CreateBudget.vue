<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/presupuestos">Presupuestos</a></li>
            <li class="breadcrumb-item active" aria-current="page">Crear Presupuesto</li>
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
                <div class="form-group" :class="{ 'form-group--error': $v.budget_name.$error }">
                  <label for="budgetName">Nombre del presupuesto:</label>
                  <input v-model.trim="$v.budget_name.$model" type="text" class="form-control" id="budgetName" aria-describedby="budgetName" placeholder="Nombre">
                  <div class="alert alert-danger" role="alert" v-if="$v.budget_name.$dirty && !$v.budget_name.required">Es requerido un nombre</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.budget_dependence.$error }">
                  <label for="budgetDependency">Dependencia:</label>
                  <multiselect v-model.trim="$v.budget_dependence.$model" :options="dependencies" :multiple="false" :preserve-search="true" placeholder="Seleccione la dependencia" label="name" track-by="_id" :preselect-first="false">
                  </multiselect>
                  <div class="alert alert-danger" role="alert" v-if="$v.budget_dependence.$dirty && !$v.budget_dependence.required">Es requerida una dependencia</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.budget_value.$error }">
                  <label for="budgetValue">Valor:</label>
                  <input v-model.trim="$v.budget_value.$model" type="number" class="form-control" id="budgetValue" aria-describedby="budgetValue" placeholder="Valor">
                  <div class="alert alert-danger" role="alert" v-if="$v.budget_value.$dirty && !$v.budget_value.required">Es requerido un valor</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.budget_year.$error }">
                  <label for="budgetYear">Año:</label>
                  <input v-model.trim="$v.budget_year.$model" type="number" class="form-control" id="budgetYear" aria-describedby="budgetYear" placeholder="Año">
                  <div class="alert alert-danger" role="alert" v-if="$v.budget_year.$dirty && !$v.budget_year.required">Es requerido un año</div>
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
                      <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                      Crear nuevo
                    </button>
                  </div>
                  <div class="col-4 text-center">
                    <button type="button" @click="cancel()" class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;">
                      <font-awesome-icon icon="times-circle" size="lg"></font-awesome-icon>
                      Cancelar
                    </button>
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
      budget_dependence: "",
      budget_value: "",
      budget_year: "",
      budget_entries: [],
      submitting: false
    }
  },
  validations: {
    budget_name: {
      required
    },
    budget_dependence: {
      required
    },
    budget_value: {
      required
    },
    budget_year: {
      required
    },
    budget_entries: {
      required
    }
  },
  mounted () {
    axios
    .get(API_IP+"/dependence/")
    .then(response => {
      for (var k in response.data.data){
        var dependency = {}
        dependency["_id"] = response.data.data[k]._id;
        dependency["name"] = response.data.data[k].nombre;
        this.dependencies.push(dependency);
      }
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
    });
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
        .post(API_IP+"/budget/", {
          dependencia: this.budget_dependence._id,
          valor: parseInt(this.budget_value),
          año: parseInt(this.budget_year),
          nombre: this.budget_name,
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
              this.$router.push({ name: 'budgets' });
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
              this.$router.push({ name: 'budgets' });
            }
          });
        }
      });
    }
  }
}
</script>
