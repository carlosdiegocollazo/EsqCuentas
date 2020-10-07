let homeComponent = Vue.component('home-component', function (resolve){
	axios.get('./app/components/home/homeView.html').then( function (view){
		resolve({
			template: view.data,
			data: function () {
				return {
					busqueda: "",
					nombreUsuario: "login",
					ruteoRegistro: "/registrarse"
				}
			},
			methods: {
				buscar: function () {
					console.log("entre", this.busqueda)
					router.push('/backoffice/articulos/'+this.busqueda)                       
					setTimeout(() => {
						this.$router.go(0)
						
					},100)
				}
			},
			mounted: function () {
				
				let userLogVerify = localStorage.getItem('user-name');
				console.log(userLogVerify)
			
				if(userLogVerify != undefined || "") {
					this.nombreUsuario = localStorage.getItem('user-name');
					this.ruteoRegistro = "/backoffice/perfil"
				}else {
					null
				}

				console.log("this.nombreUsuario en el HOME:::", this.nombreUsuario)
			}
		})
	})
})