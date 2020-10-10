Vue.component('menu-item', function (resolve, reject){
	axios.get('./app/shared/menuView.html').then( function (view){
		resolve({
			//props:['title','menuItems'],
			template: view.data
		})
	})
})