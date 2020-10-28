
const notfound = componentenotfound;
const home = componentehome;
const mesa = componentemesa;
const usuario = componenteusuario;
const monedas = componentemoneda;
const cheques = componentecheque;
const seguridad = componenteseguridad;
const documento = componentedocumento;
const banco = componentebanco;
const proveedores = componenteproveedores;
const movimientos = componentemovimientos;
const cotizacion = componentecotizacion;

//const API = "https://server134-school.lexartlabs.com/api-or-dev/";
const API = "http://localhost:3000";

const routes = [
    { path: '*',name:"NotFound", component: notfound },
    { path: '/',name:"Login", component: home },
    { path: '/usuarios',name:"Personas", component: usuario },
    { path: '/proveedores',name:"Proveedores", component: proveedores },
    { path: '/monedas',name:"Finanzas", component: monedas },
    { path: '/cheques',name:"Cheques", component: cheques },
    { path: '/seguridad',name:"Seguridad", component: seguridad },
    { path: '/mesa',name:"Home", component: mesa,},
    { path: '/documentos',name:"Documentos", component: documento,},
    { path: '/bancos',name:"Banco", component: banco,},
    { path: '/movimientos',name:"Movimientos", component: movimientos,},
    { path: '/cotizaciones',name:"Cotizacion", component: cotizacion,},
]

const router = new VueRouter({
    routes
})

let app = new Vue({
    router,
    data: {
      //  currentRoute: window.location.pathname
    }
}).$mount('#app')
