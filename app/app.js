const notfound	 = notfoundComponent;
const home		 = componentehome;
const usuario    = perfilComponent;
const registro   = registroComponent;
const backoffice = backofficeComponent;
const articulos  = articulosComponent;
const perfil  = perfilComponent;
const selected = artselected;
const busqueda = busquedaComponent;

//const API = "https://server134-school.lexartlabs.com/api-or-dev/";
const API = "/api/";

const routes = [
  { path: '*', component: notfound},
  { path: '/', component: home},
  { path: '/usuario/:id', component: perfilComponent },
]

const router = new VueRouter({
	routes
})

let app = new Vue({
  router,
  data: {
		arrMenu: [
			{
				name:"home",
				link:"/"
			},
			{
				name:"Registro",
				link:"/Registrarse"
			}
		],
		currentRoute: window.location.pathname
	}
}).$mount('#app')

