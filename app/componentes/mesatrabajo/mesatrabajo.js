let mesatrabajo = Vue.component('mesa-trabajo', function(resolve) {
    axios.get('./app/components/mesatrabajo/vistamesa.html').then(function(view) {

        resolve({
            template: view.data
        })
    })
})