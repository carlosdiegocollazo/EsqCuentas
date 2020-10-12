const notfound = componentenotfound;
const home = componentehome;
const mesa = mesatrabajo;

//const API = "https://server134-school.lexartlabs.com/api-or-dev/";
const API = "http://localhost:3000/";

const routes = [
    { path: '*', component: notfound },
    { path: '/', component: home },
    { path: '/mesa', component: mesa },
    /*
        children: [{
            path: '/mesa/usuarios',
            component: usuario,
            path: '/mesa/proveedores',
            component: proveedores,
            path: '/mesa/monedas',
            component: monedas,
        }]
    },*/
]

const router = new VueRouter({
    routes
})

let app = new Vue({
    router,
    data: {
        arrMenu: [{
                name: "home",
                link: "/"
            },
            {
                name: "Registro",
                link: "/Registrarse"
            }
        ],
        currentRoute: window.location.pathname
    }
}).$mount('#app')