let componentemesa = Vue.component('mesa-trabajo', function(resolve) {
    axios.get('./app/componentes/mesatrabajo/vistamesa.html').then(function(view) {

        resolve({
            template: view.data
        })
    })
})