let backofficeComponent = Vue.component('backoffice-component', function(resolve) {
    axios.get('./app/components/backoffice/backofficeView.html').then(function (view){

        resolve ({
            template: view.data
        })
    })
})