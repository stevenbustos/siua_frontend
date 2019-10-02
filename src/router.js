import store from './store.js'
import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/template/Home.vue'
import Login from './components/login/Login.vue'
// // Paquete 0
// Usuarios
import Users from './components/users/Users.vue'
import ShowUser from './components/users/ShowUser.vue'
import CreateUser from './components/users/CreateUser.vue'
import UpdateUser from './components/users/UpdateUser.vue'
// Roles
import Roles from './components/roles/Roles.vue'
import ShowRol from './components/roles/ShowRol.vue'
import CreateRol from './components/roles/CreateRol.vue'
import UpdateRol from './components/roles/UpdateRol.vue'
// Permisos
import Permits from './components/permits/Permits.vue'
import ShowPermit from './components/permits/ShowPermit.vue'
import CreatePermit from './components/permits/CreatePermit.vue'
import UpdatePermit from './components/permits/UpdatePermit.vue'
// Dependencias
import Dependencies from './components/dependencies/Dependencies.vue'
import ShowDependency from './components/dependencies/ShowDependency.vue'
import CreateDependency from './components/dependencies/CreateDependency.vue'
import UpdateDependency from './components/dependencies/UpdateDependency.vue'
// Modulos
import Modules from './components/modules/Modules.vue'
import ShowModule from './components/modules/ShowModule.vue'
import CreateModule from './components/modules/CreateModule.vue'
import UpdateModule from './components/modules/UpdateModule.vue'
// // Paquete 1
// Presupuestos
import Budgets from './components/budgets/Budgets.vue'
import ShowBudget from './components/budgets/ShowBudget.vue'
import CreateBudget from './components/budgets/CreateBudget.vue'
import UpdateBudget from './components/budgets/UpdateBudget.vue'
// // Paquete 2
// Solicitudes
import Requests from './components/requests/Requests.vue'
import ShowRequest from './components/requests/ShowRequest.vue'

import Ods from './components/requests/Ods.vue'
import Odc from './components/requests/Odc.vue'
import Ati from './components/requests/Ati.vue'
import CreateRequest from './components/requests/create/CreateRequest.vue'
import UpdateRequest from './components/requests/update/UpdateRequest.vue'

// Personas
import Persons from './components/persons/Persons.vue'
import ShowPerson from './components/persons/ShowPerson.vue'
import CreatePerson from './components/persons/CreatePerson.vue'
import UpdatePerson from './components/persons/UpdatePerson.vue'
// Clausulas
import Clauses from './components/clauses/Clauses.vue'
import ShowClause from './components/clauses/ShowClause.vue'
import CreateClause from './components/clauses/CreateClause.vue'
import UpdateClause from './components/clauses/UpdateClause.vue'

//Pagos
import Payments from './components/payments/Payments.vue'
import ShowPaymentsRequest from './components/payments/ShowPaymentsRequest.vue'
import CreatePaymentsVariables from './components/payments/CreatePaymentsVariables.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        guest: true
      }
    },
    // Rutas para usuarios
    {
      path: '/usuarios',
      name: 'users',
      component: Users,
    },
    {
      path: '/usuarios/crear',
      name: 'createuser',
      component: CreateUser
    },
    {
      path: '/usuarios/:id',
      name: 'showuser',
      component: ShowUser
    },
    {
      path: '/usuarios/:id/actualizar',
      name: 'updateuser',
      component: UpdateUser
    },
    // Rutas para roles
    {
      path: '/roles',
      name: 'roles',
      component: Roles
    },
    {
      path: '/roles/crear',
      name: 'createrol',
      component: CreateRol
    },
    {
      path: '/roles/:id',
      name: 'showrol',
      component: ShowRol
    },
    {
      path: '/roles/:id/actualizar',
      name: 'updaterol',
      component: UpdateRol
    },
    // Rutas para permisos
    {
      path: '/permisos',
      name: 'permits',
      component: Permits
    },
    {
      path: '/permisos/crear',
      name: 'createpermit',
      component: CreatePermit
    },
    {
      path: '/permisos/:id',
      name: 'showpermit',
      component: ShowPermit
    },
    {
      path: '/permisos/:id/actualizar',
      name: 'updatepermit',
      component: UpdatePermit
    },
    // Rutas para dependencias
    {
      path: '/dependencias',
      name: 'dependencies',
      component: Dependencies
    },
    {
      path: '/dependencias/crear',
      name: 'createdependency',
      component: CreateDependency
    },
    {
      path: '/dependencias/:id',
      name: 'showdependency',
      component: ShowDependency
    },
    {
      path: '/dependencias/:id/actualizar',
      name: 'updatedependency',
      component: UpdateDependency
    },
    // Rutas para modulos
    {
      path: '/modulos',
      name: 'modules',
      component: Modules
    },
    {
      path: '/modulos/crear',
      name: 'createmodule',
      component: CreateModule
    },
    {
      path: '/modulos/:id',
      name: 'showmodule',
      component: ShowModule
    },
    {
      path: '/modulos/:id/actualizar',
      name: 'updatemodule',
      component: UpdateModule
    },
    // Rutas para presupuestos
    {
      path: '/presupuestos',
      name: 'budgets',
      component: Budgets
    },
    {
      path: '/presupuestos/crear',
      name: 'createbudget',
      component: CreateBudget
    },
    {
      path: '/presupuestos/:id',
      name: 'showbudget',
      component: ShowBudget
    },
    {
      path: '/presupuestos/:id/actualizar',
      name: 'updatebudget',
      component: UpdateBudget
    },
    // Rutas para solicitudes
    {
      path: '/solicitudes',
      name: 'requests',
      component: Requests,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/solicitudes/ods',
      name: 'ods',
      component: Ods
    },
    {
      path: '/solicitudes/odc',
      name: 'odc',
      component: Odc
    },
    {
      path: '/solicitudes/ati',
      name: 'ati',
      component: Ati
    },
    {
      path: '/solicitudes/crear',
      name: 'createrequest',
      component: CreateRequest,
      props: true
    },
    {
      path: '/solicitudes/:type/:id/actualizar',
      name: 'updaterequest',
      component: UpdateRequest,
      props: true
    },
    {
      path: '/solicitudes/:type/:id',
      name: 'showrequest',
      component: ShowRequest
    },
    // Rutas para Pagos
    {
      path:'/pagos',
      name:'payments',
      component: Payments
    },
    {
      path:'/pagos/fijos/:id',
      name:'paymentsrequest',
      component: ShowPaymentsRequest
    },
    {
      path:'/pagos/variables/:id',
      name:'createpaymentsvariables',
      component: CreatePaymentsVariables
    },
    // Rutas para personas
    {
      path: '/personas',
      name: 'persons',
      component: Persons,
    },
    {
      path: '/personas/crear',
      name: 'createperson',
      component: CreatePerson
    },
    {
      path: '/personas/:id',
      name: 'showperson',
      component: ShowPerson
    },
    {
      path: '/personas/:id/actualizar',
      name: 'updateperson',
      component: UpdatePerson
    },
    // Rutas para clausulas
    {
      path: '/clausulas',
      name: 'clauses',
      component: Clauses,
    },
    {
      path: '/clausulas/crear',
      name: 'createclause',
      component: CreateClause
    },
    {
      path: '/clausulas/:id',
      name: 'showclause',
      component: ShowClause
    },
    {
      path: '/clausulas/:id/actualizar',
      name: 'updateclause',
      component: UpdateClause
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//     if (store.getters.isLoggedIn) {
//       next()
//       return
//     }
//     next("/")
//     // else {
//     //   store.dispatch('logout')
//     //   next('/')
//     //   alert("Inicia sesion para continuar")
//     //   return
//     // }
//   } else if(to.matched.some(record => record.meta.guest)) {
//     if (store.getters.isLoggedIn) {
//       next('/home')
//       return
//     }else{
//       // store.dispatch('logout')
//       next()
//     }
//   }else {
//     next()
//   }
// })

export default router
