<template>
  <header id="unalTop">
    <div class="logo">
      <a href="http://unal.edu.co">
        <svg width="93%" height="93%">
          <image xlink:href="/assets/images/escudoUnal.svg" width="100%" height="100%" class="hidden-print"/>
        </svg>
        <img src="/assets/images/escudoUnal_black.png" class="visible-print" />
      </a>
    </div>
    <div class="seal">
      <img class="hidden-print" alt="Escudo de la República de Colombia" src="/assets/images/sealColombia.png" width="66" height="66" />

      <img class="visible-print" alt="Escudo de la República de Colombia" src="/assets/images/sealColombia_black.png" width="66" height="66" />
    </div>
    <div class="firstMenu">
      <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#bs-navbar" aria-controls="bs-navbar" aria-expanded="false">
        <span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
      </button>
      <div class="btn-group languageMenu hidden-xs">
        <div class="btn btn-default dropdown-toggle" data-toggle="dropdown">es<span class="caret"></span></div>
        <ul class="dropdown-menu">
          <li><a href="index.html#">es</a></li>
          <li><a href="index.html#">en</a></li>
        </ul>
      </div>
      <ul class="socialLinks hidden-xs">
        <li>
          <a href="https://www.facebook.com/UNColombia" target="_blank" class="facebook" title="Página oficial en Facebook"></a>
        </li>
        <li>
          <a href="https://twitter.com/UNColombia" target="_blank" class="twitter" title="Cuenta oficial en Twitter"></a>
        </li>
        <li>
          <a href="https://www.youtube.com/channel/UCnE6Zj2llVxcvL5I38B0Ceg" target="_blank" class="youtube" title="Canal oficial de Youtube"></a>
        </li>
        <li>
          <a href="http://agenciadenoticias.unal.edu.co/nc/sus/type/rss2.html" target="_blank" class="rss" title="Suscripción a canales de información RSS"></a>
        </li>
      </ul>
      <div class="navbar-default">
        <nav id="profiles">
          <ul class="nav navbar-nav dropdown-menu">
            <li class="item_Aspirantes #>"><a href="index.html#">Aspirantes</a></li>
            <li class="item_Estudiantes #>"><a href="index.html#">Estudiantes</a></li>
            <li class="item_Egresados #>"><a href="index.html#">Egresados</a></li>
            <li class="item_Docentes #>"><a href="index.html#">Docentes</a></li>
            <li class="item_Administrativos #>"><a href="index.html#">Administrativos</a></li>
          </ul>
        </nav>
      </div>
    </div>
    <div id="bs-navbar" class="navbar-collapse collapse navigation">
      <div class="site-url">
        <a href="https://ingenieria.bogota.unal.edu.co">ingenieria.bogota.unal.edu.co</a>
      </div>
      <div class="buscador">
        <div class="gcse-searchbox-only" data-resultsUrl="http://unal.edu.co/resultados-de-la-busqueda/" data-newWindow="true"></div>
      </div>
      <div class="mainMenu">
        {{updateMenu}}
        <div v-if="this.$store.getters.isLoggedIn">
          <div class="btn-group">
            <div v-if="menu['0'] || menu['1'] || menu['2'] || menu['3'] || menu['4'] || menu['5'] || menu['6']" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
              Administración
            </div>
            <span class="caret-right"></span>
            <ul class="dropdown-menu dropItem-16">
              <li v-if="menu['0']"><a href="/permisos">Permisos</a><span class="caret-right"></span></li>
              <li v-if="menu['1']"><a href="/modulos">Modulos</a><span class="caret-right"></span></li>
              <li v-if="menu['2']"><a href="/roles">Roles</a><span class="caret-right"></span></li>
              <li v-if="menu['3']"><a href="/usuarios">Usuarios</a><span class="caret-right"></span></li>
              <li v-if="menu['4']"><a href="/dependencias">Dependencias</a><span class="caret-right"></span></li>
              <li v-if="menu['5']"><a href="/personas">Personas</a><span class="caret-right"></span></li>
              <li v-if="menu['6']"><a href="/clausulas">Clausulas</a><span class="caret-right"></span></li>
            </ul>
          </div>
          <div v-if="menu['7']" class="btn-group">
            <a href="/presupuestos" class="btn btn-default">Presupuestos</a>
            <span class="caret-right"></span>
          </div>
          <div class="btn-group">
            <div v-if="menu['8'] || menu['9'] || menu['10'] || menu['11']" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
              Solicitudes
            </div>
            <span class="caret-right"></span>
            <ul class="dropdown-menu dropItem-16">
              <li v-if="menu['8']"><a href="/solicitudes/">Solicitudes</a><span class="caret-right"></span></li>
              <li v-if="menu['9']"><a href="/solicitudes/ods">ODS</a><span class="caret-right"></span></li>
              <li v-if="menu['10']"><a href="/solicitudes/odc">ODC</a><span class="caret-right"></span></li>
              <li v-if="menu['11']"><a href="/solicitudes/ati">ATI</a><span class="caret-right"></span></li>
            </ul>
          </div>
          <div class="btn-group">
            <div v-if="menu['12']" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
              Pagos
            </div>
            <span class="caret-right"></span>
            <ul class="dropdown-menu dropItem-16">
              <li v-if="menu['13']"><a href="/pagos/">Cumplidos</a><span class="caret-right"></span></li>
              <li v-if="menu['14']"><a href="/pagos/">Liquidaciones</a><span class="caret-right"></span></li>
            </ul>
          </div>

          <div class="btn-group">
            <button type="button" v-on:click="logout()" class="btn btn-default">SALIR</button>
          </div>
          <div class="btn-group">
            <div class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span>Sedes</span></div>
            <ul class="dropdown-menu dropItem-16">
              <li><a href="http://amazonia.unal.edu.co" target="_blank">Amazonia</a><span class="caret-right"></span></li>
              <li><a href="http://bogota.unal.edu.co" target="_blank">Bogotá</a><span class="caret-right"></span></li>
              <li><a href="http://caribe.unal.edu.co" target="_blank">Caribe</a><span class="caret-right"></span></li>
              <li><a href="http://delapaz.unal.edu.co" target="_blank">De La Paz</a><span class="caret-right"></span></li>
              <li><a href="http://www.manizales.unal.edu.co" target="_blank">Manizales</a><span class="caret-right"></span></li>
              <li><a href="http://medellin.unal.edu.co" target="_blank">Medellín</a><span class="caret-right"></span></li>
              <li><a href="http://orinoquia.unal.edu.co" target="_blank">Orinoquia</a><span class="caret-right"></span></li>
              <li><a href="http://www.palmira.unal.edu.co" target="_blank">Palmira</a><span class="caret-right"></span></li>
              <li><a href="http://tumaco-pacifico.unal.edu.co" target="_blank">Tumaco</a><span class="caret-right"></span></li>
            </ul>
          </div>
        </div>
        <div v-else>
          <div class="btn-group">
            <div class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span>Sedes</span></div>
            <ul class="dropdown-menu dropItem-16">
              <li><a href="http://amazonia.unal.edu.co" target="_blank">Amazonia</a><span class="caret-right"></span></li>
              <li><a href="http://bogota.unal.edu.co" target="_blank">Bogotá</a><span class="caret-right"></span></li>
              <li><a href="http://caribe.unal.edu.co" target="_blank">Caribe</a><span class="caret-right"></span></li>
              <li><a href="http://delapaz.unal.edu.co" target="_blank">De La Paz</a><span class="caret-right"></span></li>
              <li><a href="http://www.manizales.unal.edu.co" target="_blank">Manizales</a><span class="caret-right"></span></li>
              <li><a href="http://medellin.unal.edu.co" target="_blank">Medellín</a><span class="caret-right"></span></li>
              <li><a href="http://orinoquia.unal.edu.co" target="_blank">Orinoquia</a><span class="caret-right"></span></li>
              <li><a href="http://www.palmira.unal.edu.co" target="_blank">Palmira</a><span class="caret-right"></span></li>
              <li><a href="http://tumaco-pacifico.unal.edu.co" target="_blank">Tumaco</a><span class="caret-right"></span></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="btn-group hidden-sm hidden-md hidden-lg hidden-print">
        <div class="btn btn-default dropdown-toggle" data-toggle="dropdown" id="unalOpenMenuServicios" data-target="#services">Servicios<span class="caret"> </span>
        </div>
      </div>
      <div class="btn-group hidden-sm hidden-md hidden-lg hidden-print">
        <div class="btn btn-default dropdown-toggle" data-toggle="dropdown" id="unalOpenMenuPerfiles" data-target="#profiles">Perfiles<span class="caret"> </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
var headersDicMenu = {};
headersDicMenu[process.env.VUE_APP_KEY_HEADER_NAME] = process.env.VUE_APP_KEY_HEADER_CONTENT;
headersDicMenu[process.env.VUE_APP_TOKEN_HEADER_NAME] = localStorage.getItem(process.env.VUE_APP_TOKEN_HEADER_NAME);
headersDicMenu[process.env.VUE_APP_MODULE_HEADER_NAME] = 100;

export default{
  data(){
    return{
      params:[100,101,102,103,104,105,106,107,108,109,110,111,112,113,114],
      auth:false,
      menu : this.$store.getters.menuPermits||"",
      menuPermits :[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    }
  },
  mounted(){
  },
  created(){
    this.loadMenu()
  },
  computed:{
    updateMenu(){
      this.menu = this.$store.getters.menuPermits
      console.log(this.menu);
    }
  },
  methods:{
    loadMenu:function(){
      if (localStorage.getItem(process.env.VUE_APP_TOKEN_HEADER_NAME)) {
        this.auth=true
        this.$store.dispatch('showMenu');
      }else {
        this.auth=false
      }
    },
    logout:function(){
      this.$store.dispatch('logout')
      this.$router.push('/')
      location.reload();
    }
  }
}


</script>
