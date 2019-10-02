<template>
  <div class="container-fluid">
    <div style="margin:40px;background-color:rgba(255, 255, 255, 0.7);">
      <div class="row">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Personas</li>
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
          <div class="row">
            <div class="col-auto mr-auto">
              <a class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;" href="/personas/crear">
                <font-awesome-icon icon="pencil-alt" size="lg"></font-awesome-icon>
                Nueva Persona
              </a>
            </div>
            <!-- TODO -->
            <!-- <div class="col-auto">
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Buscar usuario" aria-label="Buscar usuario" aria-describedby="Buscar usuario">
                <div class="input-group-append">
                  <button type="button" class="btn btn-primary" style="background:#003e1e;border-color:#003e1e;">
                    <font-awesome-icon icon="search" size="lg"></font-awesome-icon>
                    Buscar
                  </button>
                </div>
              </div>
            </div> -->
          </div>
          <div>&nbsp;</div>
          <div class="row">
            <div class="col">
              <table class="table table-striped" style="text-align:center;background-color:#dddddd;">
                <thead style="background-color: #003e1e; color:white;">
                  <tr>
                    <th scope="col">Nombres</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">Celular</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="clickable-row" v-for='(person, index) in persons' :key='index'>
                    <td><a v-bind:href="person.url">{{person.name}}</a></td>
                    <td>{{person.email}}</td>
                    <td>{{person.phone}}</td>
                    <td>{{person.mobil_phone}}</td>
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
      persons : []
    }
  },
  mounted () {
    axios
    .get(API_IP+'/person')
    .then(response => {
      for(var k in response.data.data) {
        var person = {}
        person["name"] = response.data.data[k].primer_nombre+" "+response.data.data[k].segundo_nombre+" "+response.data.data[k].primer_apellido+" "+response.data.data[k].segundo_apellido;
        person["email"] = response.data.data[k].correo_electronico;
        person["phone"] = response.data.data[k].telefono;
        person["mobil_phone"] = response.data.data[k].celular;
        person["id"] = response.data.data[k]._id;
        person["url"] = "/personas/"+response.data.data[k]._id;
        this.persons.push(person);
      }
    })
  }
}
</script>
