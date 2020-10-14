const notfound = componentenotfound;
const home = componentehome;
const mesa = componentemesa;
const usuario = componenteusuario;
const monedas = componentemoneda;

//const API = "https://server134-school.lexartlabs.com/api-or-dev/";
const API = "http://localhost:3000";

const routes = [
    { path: '*', component: notfound },
    { path: '/', component: home },
    { path: '/usuarios', component: usuario },
    { path: '/monedas', component: monedas },
    {
        path: '/mesa',
        component: mesa,
        children: [
            { path: '/mesa/usuarios', component: usuario },

        ]
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