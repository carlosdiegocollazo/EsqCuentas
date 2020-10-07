const notfoundComponent = Vue.component('not-found', function (resolve) {
    axios.get('./app/components/notfound/notfoundView.html').then(function (view){
        resolve({
            template: view.data,
            methods: {
             redirect: function () {
                router.push('/');
             }
            },
            mounted: function () {
                this.redirect();
			}
        })
    })
})