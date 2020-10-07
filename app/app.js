const notfound	 = notfoundComponent;
const home		 = homeComponent;
const usuario    = perfilComponent;
const registro   = registroComponent;
const backoffice = backofficeComponent;
const articulos  = articulosComponent;
const perfil  = perfilComponent;
const selected = artselected;
const busqueda = busquedaComponent;

const API = "https://server134-school.lexartlabs.com/api-or-dev/";

const routes = [
  { path: '*', component: notfound},
  { path: '/', component: home},
  { path: '/usuario/:id', component: perfilComponent },
  { path: '/registrarse', component: registro },
  { path: '/backoffice', component: backoffice,
	children: [
		{path:'/backoffice/articulos', component: articulos},
		{path:'/backoffice/selected/:id', component: selected, props: true},
		{path:'/backoffice/articulos/:busqueda', component: busqueda, props: true},
		{path:'/backoffice/perfil', component: perfil}
	]
  }
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

