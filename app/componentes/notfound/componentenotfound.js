const componentenotfound = Vue.component('not-found', function(resolve) {
    axios.get('./app/components/notfound/vistanotfound.html').then(function(view) {
        resolve({
            template: view.data,
            methods: {
                redirect: function() {
                    router.push('/');
                }
            },
            mounted: function() {
                this.redirect();
            }
        })
    })
})