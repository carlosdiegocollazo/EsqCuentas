const notfound = componentenotfound;
const home = componentehome;
const mesa = componentemesa;
const usuario = componenteusuario;
const monedas = componentemoneda;
const seguridad = componenteseguridad;

//const API = "https://server134-school.lexartlabs.com/api-or-dev/";
const API = "http://localhost:3000";

const routes = [
    { path: '*',name:"NotFound", component: notfound },
    { path: '/',name:"Login", component: home },
    { path: '/usuarios',name:"Personas", component: usuario },
    { path: '/monedas',name:"Finanzas", component: monedas },
    { path: '/seguridad',name:"Seguridad", component: seguridad },
    { path: '/mesa',name:"Home", component: mesa,
    },
]

const router = new VueRouter({
    routes
})

let app = new Vue({
    router,
    data: {
        currentRoute: window.location.pathname
    }
}).$mount('#app')