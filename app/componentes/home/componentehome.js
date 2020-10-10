let componentehome = Vue.component('home-component', function (resolve){
	axios.get('./app/componentes/home/vistahome.html').then( function (view){
				resolve({
					template: view.data,
					data: function () {
						return {
							nombre: "Diego Collazo",
							password: "",
							nombrepassword: "",
							ruteoRegistro: "/"
						}
					},
					methods: {
						login: function () {
							this.nombrepassword = this.nombre + this.password
						}
					},
					mounted: function () {
		
					/*	let token = localStorage.setItem('token', res.data.token)
						let token = localStorage.getItem('token')
					*/	
					}
				})
			})
		})